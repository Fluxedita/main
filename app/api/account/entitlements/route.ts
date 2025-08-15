import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "../../../../lib/supabase/server"
import { getSupabaseAdminClient } from "../../../../lib/supabase/admin"

export const runtime = "nodejs"

export async function GET() {
  const supabase = getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  // Use admin client to avoid any RLS edge-cases; scope strictly to this user
  const admin = getSupabaseAdminClient()
  const { data: ents, error: entErr } = await admin
    .from("entitlements")
    .select("package_id, type, status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (entErr) return NextResponse.json({ error: entErr.message }, { status: 500 })

  const list = (ents || []).filter((r) => String(r.status) === "active")
  if (list.length === 0) return NextResponse.json({ entitlements: [] })

  // 2) Map package_id -> slug via separate query
  const pkgIds = Array.from(new Set(list.map((r) => r.package_id)))
  const { data: pkgs, error: pkgErr } = await admin
    .from("packages")
    .select("id, slug")
    .in("id", pkgIds)

  if (pkgErr) return NextResponse.json({ error: pkgErr.message }, { status: 500 })
  const slugById = new Map((pkgs || []).map((p: any) => [p.id, p.slug]))

  const rows = list.map((r) => ({
    package_id: r.package_id,
    slug: slugById.get(r.package_id) || "",
    type: r.type as string,
    status: r.status as string,
    created_at: r.created_at as string,
  }))

  return NextResponse.json({
    userId: user.id,
    totalEntitlementsFetched: ents?.length || 0,
    activeEntitlements: rows.length,
    entitlements: rows,
  })
}
