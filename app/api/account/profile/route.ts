import { NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "../../../../lib/supabase/server"

export const runtime = "nodejs"

export async function GET() {
  const supabase = getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, full_name, role, stripe_customer_id, timezone, marketing_opt_in, avatar_url, company, sector, position, website_url, bio, other_info")
    .eq("id", user.id)
    .maybeSingle()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ profile: data })
}

export async function PATCH(req: NextRequest) {
  const supabase = getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json().catch(() => ({}))
  const update: Record<string, any> = {}

  if (typeof body.full_name === "string") update.full_name = body.full_name
  if (typeof body.username === "string") update.username = body.username
  if (typeof body.timezone === "string") update.timezone = body.timezone
  if (typeof body.marketing_opt_in === "boolean") update.marketing_opt_in = body.marketing_opt_in
  if (typeof body.avatar_url === "string") update.avatar_url = body.avatar_url
  if (typeof body.company === "string") update.company = body.company
  if (typeof body.sector === "string") update.sector = body.sector
  if (typeof body.position === "string") update.position = body.position
  if (typeof body.website_url === "string") update.website_url = body.website_url
  if (typeof body.bio === "string") update.bio = body.bio
  if (typeof body.other_info === "string") update.other_info = body.other_info

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "No valid fields" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("profiles")
    .update(update)
    .eq("id", user.id)
    .select("id, username, full_name, role, stripe_customer_id, timezone, marketing_opt_in, avatar_url, company, sector, position, website_url, bio, other_info")
    .maybeSingle()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ profile: data })
}
