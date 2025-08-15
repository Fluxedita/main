import { NextResponse } from "next/server";
export const runtime = "nodejs";
import { z } from "zod";
import { getSupabaseServerClient } from "../../../lib/supabase/server";
import { getSupabaseAdminClient } from "../../../lib/supabase/admin";
import { getBucketForSlug } from "../../../lib/storage/buckets";

const BodySchema = z.object({
  packageSlug: z.string().min(1),
  version: z.string().min(1), // e.g., "1.0.0"
  expiresIn: z.number().int().positive().max(60 * 60).optional(), // seconds, default 60s, max 1h
});

export async function POST(request: Request) {
  try {
    const json = await request.json().catch(() => ({}));
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { packageSlug, version, expiresIn } = parsed.data;

    const supabase = getSupabaseServerClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate entitlement implicitly via RLS on package_versions.
    // If user is not entitled (directly or via parent include), SELECT will return 0 rows due to policies.
    const { data: rows, error: selErr } = await supabase
      .from("package_versions")
      .select(
        `id, version, storage_key, package:packages!inner ( id, slug )`
      )
      .eq("version", version)
      .eq("packages.slug", packageSlug)
      .limit(1);

    if (selErr) {
      return NextResponse.json({ error: selErr.message }, { status: 500 });
    }

    const row = rows?.[0] as any;
    if (!row || !row.package) {
      // Could be not found or not entitled
      return NextResponse.json({ error: "Forbidden or not found" }, { status: 403 });
    }

    // Supabase types may return nested relation as an object or an array; normalize to object
    const pkg = Array.isArray(row.package) ? row.package[0] : row.package;
    const bucket = getBucketForSlug(pkg.slug);
    if (!bucket) {
      return NextResponse.json({ error: "Bucket not configured for package" }, { status: 500 });
    }

    const admin = getSupabaseAdminClient();

    const expiry = typeof expiresIn === "number" ? expiresIn : 60; // 60s default
    const { data: signed, error: signErr } = await admin.storage
      .from(bucket)
      .createSignedUrl(row.storage_key as string, expiry);

    if (signErr || !signed?.signedUrl) {
      return NextResponse.json({ error: signErr?.message || "Failed to sign URL" }, { status: 500 });
    }

    // Best-effort audit log
    try {
      const hdrs = request.headers;
      const ua = hdrs.get("user-agent") || undefined;
      const xff = hdrs.get("x-forwarded-for");
      const ip = (xff ? xff.split(",")[0] : undefined) as any; // inet

      await admin.from("download_audit").insert({
        user_id: user.id,
        package_id: pkg.id,
        version_id: row.id,
        user_agent: ua,
        ip,
      });
    } catch (e) {
      // swallow audit errors
      console.error("download_audit insert error", e);
    }

    return NextResponse.json({ url: signed.signedUrl, expiresIn: expiry });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
