import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export const runtime = "nodejs"

export async function GET() {
  const supabase = getSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { count, error } = await supabase
    .from("support_tickets")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .or(`user_last_read_at.is.null,updated_at.gt.${new Date(0).toISOString()}`) // placeholder to enable .or

  // The above .or is a placeholder because supabase-js doesn't allow composite OR easily with head:true.
  // Fallback: do a normal select and filter in JS if the head:true .or isn't supported in your version.
  if (error) {
    // Fallback approach
    const { data } = await supabase
      .from("support_tickets")
      .select("id, updated_at, user_last_read_at")
      .eq("user_id", user.id)
    const n = (data || []).filter((t: any) => !t.user_last_read_at || (t.updated_at && new Date(t.updated_at) > new Date(t.user_last_read_at))).length
    return NextResponse.json({ count: n })
  }

  // If count query above succeeded (some environments may ignore the .or); recompute via JS as well to be safe
  const { data } = await supabase
    .from("support_tickets")
    .select("id, updated_at, user_last_read_at")
    .eq("user_id", user.id)
  const n = (data || []).filter((t: any) => !t.user_last_read_at || (t.updated_at && new Date(t.updated_at) > new Date(t.user_last_read_at))).length
  return NextResponse.json({ count: n })
}
