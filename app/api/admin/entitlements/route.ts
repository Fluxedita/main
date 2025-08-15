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

export async function GET(req: NextRequest) {
  const gate = await requireAdmin()
  if (!gate.ok) return gate.res!

  const { searchParams } = new URL(req.url)
  const user_id = searchParams.get("user_id")
  if (!user_id) return NextResponse.json({ error: "user_id is required" }, { status: 400 })

  const admin = getSupabaseAdminClient()
  const { data, error } = await admin
    .from("entitlements")
    .select("id, user_id, type, status, created_at, packages:package_id ( slug )")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const rows = (data || []).map((r: any) => ({
    id: r.id,
    user_id: r.user_id,
    type: r.type,
    status: r.status,
    created_at: r.created_at,
    slug: r.packages?.slug ?? "",
  }))
  return NextResponse.json({ rows })
}

export async function POST(req: NextRequest) {
  const gate = await requireAdmin()
  if (!gate.ok) return gate.res!

  const body = await req.json().catch(() => ({}))
  const { user_id, slug, type = "one_time", status = "active" } = body || {}
  if (!user_id || !slug) {
    return NextResponse.json({ error: "Missing user_id or slug" }, { status: 400 })
  }

  const admin = getSupabaseAdminClient()
  const { data: pkg, error: pkgErr } = await admin.from("packages").select("id, slug").eq("slug", slug).maybeSingle()
  if (pkgErr) return NextResponse.json({ error: pkgErr.message }, { status: 500 })
  if (!pkg) return NextResponse.json({ error: "Package not found" }, { status: 404 })

  // Upsert with unique index on (user_id, package_id)
  const { data, error } = await admin
    .from("entitlements")
    .upsert(
      { user_id, package_id: pkg.id, type, status },
      { onConflict: "user_id,package_id" }
    )
    .select("id, user_id, type, status")
    .maybeSingle()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ row: data })
}

export async function DELETE(req: NextRequest) {
  const gate = await requireAdmin()
  if (!gate.ok) return gate.res!

  const body = await req.json().catch(() => ({}))
  const { user_id, slug } = body || {}
  if (!user_id || !slug) {
    return NextResponse.json({ error: "Missing user_id or slug" }, { status: 400 })
  }

  const admin = getSupabaseAdminClient()
  const { data: pkg, error: pkgErr } = await admin.from("packages").select("id, slug").eq("slug", slug).maybeSingle()
  if (pkgErr) return NextResponse.json({ error: pkgErr.message }, { status: 500 })
  if (!pkg) return NextResponse.json({ error: "Package not found" }, { status: 404 })

  const { error } = await admin
    .from("entitlements")
    .delete()
    .eq("user_id", user_id)
    .eq("package_id", pkg.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
