import { redirect } from "next/navigation"
import Link from "next/link"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

async function ensureAdmin() {
  const supabase = getSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/signin?next=/admin/messages")
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle()
  if (!profile || profile.role !== "admin") redirect("/unauthorized")
  return { supabase, user, profile }
}

async function fetchTickets(supabase: ReturnType<typeof getSupabaseServerClient>) {
  const { data: tickets } = await supabase
    .from("support_tickets")
    .select("id, subject, status, created_at, updated_at, user_email, user_id, admin_last_read_at")
    .order("created_at", { ascending: false })
  if (!tickets || tickets.length === 0) return [] as any[]
  // Fetch latest messages for these tickets (to compute flags)
  const ids = tickets.map((t) => t.id)
  const { data: msgs } = await supabase
    .from("support_messages")
    .select("ticket_id, is_admin, created_at")
    .in("ticket_id", ids)
    .order("created_at", { ascending: false })
  const latestByTicket = new Map<string, { is_admin: boolean; created_at: string }>()
  for (const m of msgs || []) {
    if (!latestByTicket.has(m.ticket_id)) latestByTicket.set(m.ticket_id, { is_admin: Boolean(m.is_admin), created_at: m.created_at as any })
  }
  return tickets.map((t) => ({ ...t, __latest: latestByTicket.get(t.id) || null }))
}

export default async function AdminMessagesPage() {
  const { supabase } = await ensureAdmin()
  const tickets = await fetchTickets(supabase)

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Support Tickets</h1>
        <Link href="/admin" className="text-sm text-blue-600 hover:underline">← Back to Admin</Link>
      </div>

      <div className="grid gap-3">
        {tickets.length === 0 && (
          <div className="text-sm text-gray-500">No tickets yet.</div>
        )}
        {tickets.map((t: any) => {
          const status = (t as any).status || "open"
          const badgeClass =
            status === "closed"
              ? "bg-red-50 border-red-200 text-red-700"
              : status === "ready"
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-gray-50 border-gray-200 text-gray-700"
          const hasUnread = t.updated_at && (!t.admin_last_read_at || new Date(t.updated_at) > new Date(t.admin_last_read_at))
          // Message flags
          let msgFlag: null | { label: string; cls: string } = null
          if (!t.__latest) {
            msgFlag = { label: "New", cls: "bg-blue-50 border-blue-200 text-blue-700" }
          } else if (t.__latest && t.__latest.is_admin === false) {
            msgFlag = { label: "Follow-up", cls: "bg-amber-50 border-amber-200 text-amber-800" }
          } else if (t.__latest && t.__latest.is_admin === true) {
            msgFlag = { label: "Replied", cls: "bg-gray-50 border-gray-200 text-gray-700" }
          }
          return (
            <div key={t.id} className="border rounded-md p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <Link href={`/admin/messages/${t.id}`} className="font-semibold hover:underline block truncate">
                    {t.subject || `Ticket #${t.id}`}
                  </Link>
                  <div className="text-xs text-gray-500">Created {new Date(t.created_at).toLocaleString()}</div>
                  <div className="text-xs text-gray-500 truncate">User: {(t as any).user_email || "—"} · {(t as any).user_id}</div>
                </div>
                <div className="flex items-center gap-2">
                  {hasUnread && <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded bg-amber-100 border border-amber-200 text-amber-800">Unread</span>}
                  {msgFlag && <span className={`text-[10px] uppercase tracking-wide px-2 py-0.5 rounded border ${msgFlag.cls}`}>{msgFlag.label}</span>}
                  <div className={`text-xs px-2 py-1 rounded border ${badgeClass}`}>{status}</div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Link href={`/admin/messages/${t.id}`} className="px-3 py-1.5 rounded border text-sm hover:bg-gray-50">Open Thread</Link>
                <form action={`/api/admin/tickets/${t.id}`} method="post" className="inline-flex gap-2">
                  <button name="action" value="mark_ready" className="px-3 py-1.5 rounded border text-sm" type="submit">Mark Ready</button>
                  {status !== "closed" ? (
                    <button name="action" value="close" className="px-3 py-1.5 rounded border text-sm" type="submit">Close</button>
                  ) : (
                    <button name="action" value="reopen" className="px-3 py-1.5 rounded border text-sm" type="submit">Reopen</button>
                  )}
                </form>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
