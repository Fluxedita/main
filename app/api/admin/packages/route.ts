import { NextResponse } from "next/server"
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
  const { data, error } = await admin.from("packages").select("id, slug").order("slug")
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ packages: data || [] })
}
