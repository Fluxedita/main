import { redirect } from "next/navigation"
import Link from "next/link"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

async function ensureUser() {
  const supabase = getSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/signin?next=/account/messages")
  return { supabase, user }
}

async function fetchMyTickets(supabase: ReturnType<typeof getSupabaseServerClient>, userId: string) {
  const { data } = await supabase
    .from("support_tickets")
    .select("id, subject, status, created_at, updated_at, user_last_read_at")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
  if (!data || data.length === 0) return [] as any[]
  const ids = data.map((t) => t.id)
  const { data: msgs } = await supabase
    .from("support_messages")
    .select("ticket_id, is_admin, created_at")
    .in("ticket_id", ids)
    .order("created_at", { ascending: false })
  const latestByTicket = new Map<string, { is_admin: boolean; created_at: string }>()
  for (const m of msgs || []) {
    if (!latestByTicket.has(m.ticket_id)) latestByTicket.set(m.ticket_id, { is_admin: Boolean(m.is_admin), created_at: m.created_at as any })
  }
  return data.map((t) => ({ ...t, __latest: latestByTicket.get(t.id) || null }))
}

export default async function AccountMessagesPage() {
  const { supabase, user } = await ensureUser()
  const tickets = await fetchMyTickets(supabase, user.id)

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Support Messages</h1>
      <div className="grid gap-3">
        {tickets.length === 0 && (
          <div className="text-sm text-gray-500">You have no support tickets yet.</div>
        )}
        {tickets.map((t: any) => {
          const hasUnread = t.updated_at && (!t.user_last_read_at || new Date(t.updated_at) > new Date(t.user_last_read_at))
          let msgFlag: null | { label: string; cls: string } = null
          if (!t.__latest) {
            msgFlag = { label: "New", cls: "bg-blue-50 border-blue-200 text-blue-700" }
          } else if (t.__latest && t.__latest.is_admin === true) {
            msgFlag = { label: "New reply", cls: "bg-green-50 border-green-200 text-green-700" }
          } else if (t.__latest && t.__latest.is_admin === false) {
            msgFlag = { label: "Awaiting reply", cls: "bg-gray-50 border-gray-200 text-gray-700" }
          }
          return (
            <Link key={t.id} href={`/account/messages/${t.id}`} className="border rounded-md p-4 hover:bg-gray-50 transition">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold truncate">{t.subject || `Ticket #${t.id}`}</div>
                  <div className="text-xs text-gray-500">Updated {t.updated_at ? new Date(t.updated_at).toLocaleString() : new Date(t.created_at).toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-2">
                  {hasUnread && <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded bg-amber-100 border border-amber-200 text-amber-800">Unread</span>}
                  {msgFlag && <span className={`text-[10px] uppercase tracking-wide px-2 py-0.5 rounded border ${msgFlag.cls}`}>{msgFlag.label}</span>}
                  <div className="text-xs px-2 py-1 rounded bg-gray-100 border">{t.status || "open"}</div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
