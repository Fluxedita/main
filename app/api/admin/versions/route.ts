import { NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { getSupabaseAdminClient } from "@/lib/supabase/admin"

export const runtime = "nodejs"

async function requireAdmin() {
  const supabase = getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, res: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle()
  if (!profile || profile.role !== "admin") {
    return { ok: false, res: NextResponse.json({ error: "Forbidden" }, { status: 403 }) }
  }
  return { ok: true }
}

export async function GET() {
  const gate = await requireAdmin()
  if (!gate.ok) return gate.res!

  const admin = getSupabaseAdminClient()
  const { data, error } = await admin
    .from("package_versions")
    .select("id, version, storage_key, created_at, packages:package_id ( slug )")
    .order("created_at", { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const rows = (data || []).map((r: any) => ({
    id: r.id,
    version: r.version,
    storage_key: r.storage_key,
    created_at: r.created_at,
    slug: r.packages?.slug ?? "",
  }))
  return NextResponse.json({ rows })
}

export async function POST(req: NextRequest) {
  const gate = await requireAdmin()
  if (!gate.ok) return gate.res!

  const body = await req.json().catch(() => ({}))
  const { slug, version, storage_key } = body || {}
  if (!slug || !version || !storage_key) {
    return NextResponse.json({ error: "Missing slug, version or storage_key" }, { status: 400 })
  }

  const admin = getSupabaseAdminClient()

  // find package
  const { data: pkg, error: pkgErr } = await admin
    .from("packages")
    .select("id, slug")
    .eq("slug", slug)
    .maybeSingle()
  if (pkgErr) return NextResponse.json({ error: pkgErr.message }, { status: 500 })
  if (!pkg) return NextResponse.json({ error: "Package not found" }, { status: 404 })

  // Try upsert on (package_id, version). If a unique constraint exists, this will work.
  let upsert = await admin
    .from("package_versions")
    .upsert({ package_id: pkg.id, version, storage_key }, { onConflict: "package_id,version" })
    .select("id, version, storage_key, created_at")
    .maybeSingle()

  if (upsert.error && upsert.error.code === "PGRST200" /* onConflict needs constraint */) {
    // Fallback: try update-if-exists else insert
    const existing = await admin
      .from("package_versions")
      .select("id")
      .eq("package_id", pkg.id)
      .eq("version", version)
      .maybeSingle()

    if (existing.data?.id) {
      const upd = await admin
        .from("package_versions")
        .update({ storage_key })
        .eq("id", existing.data.id)
        .select("id, version, storage_key, created_at")
        .maybeSingle()
      if (upd.error) return NextResponse.json({ error: upd.error.message }, { status: 500 })
      return NextResponse.json({ row: upd.data })
    } else {
      const ins = await admin
        .from("package_versions")
        .insert({ package_id: pkg.id, version, storage_key })
        .select("id, version, storage_key, created_at")
        .maybeSingle()
      if (ins.error) return NextResponse.json({ error: ins.error.message }, { status: 500 })
      return NextResponse.json({ row: ins.data })
    }
  }

  if (upsert.error) return NextResponse.json({ error: upsert.error.message }, { status: 500 })
  return NextResponse.json({ row: upsert.data })
}
