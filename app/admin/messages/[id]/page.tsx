import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import Link from "next/link"

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

async function fetchTicket(supabase: ReturnType<typeof getSupabaseServerClient>, id: string) {
  try {
    const { data } = await supabase.from("support_tickets").select("*").eq("id", id).maybeSingle()
    return data || null
  } catch {
    return null
  }
}

async function fetchMessages(supabase: ReturnType<typeof getSupabaseServerClient>, id: string) {
  try {
    const { data } = await supabase
      .from("support_messages")
      .select("*")
      .eq("ticket_id", id)
      .order("created_at", { ascending: true })
    return data || []
  } catch {
    return []
  }
}

export default async function AdminTicketThread({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { supabase } = await ensureAdmin()
  const ticket = await fetchTicket(supabase, id)
  const messages = await fetchMessages(supabase, id)

  if (!ticket) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-4"><Link href="/admin/messages" className="text-blue-600">← Back to tickets</Link></div>
        <div className="text-sm text-red-600">Ticket not found.</div>
      </main>
    )
  }

  const status = (ticket as any).status || "open"
  // Mark as read for admin (best-effort)
  try {
    await supabase
      .from("support_tickets")
      .update({ admin_last_read_at: new Date().toISOString() })
      .eq("id", id)
  } catch {}
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-4"><Link href="/admin/messages" className="text-blue-600">← Back to tickets</Link></div>
      <h1 className="text-2xl font-bold mb-1">{ticket.subject || `Ticket #${ticket.id}`}</h1>
      <div className="text-xs text-gray-500 mb-1">Status: {status} · Created {ticket.created_at ? new Date(ticket.created_at).toLocaleString() : ""}</div>
      <div className="text-xs text-gray-500 mb-6">User: {(ticket as any).user_email || "—"} · {(ticket as any).user_id}</div>

      <div className="border rounded-md divide-y">
        {/* Original ticket body as first message */}
        {ticket.message && (
          <div className="p-4">
            <div className="text-xs text-gray-500 mb-1">
              User · {ticket.created_at ? new Date(ticket.created_at).toLocaleString() : ""}
            </div>
            <div className="whitespace-pre-wrap text-sm">{ticket.message}</div>
          </div>
        )}
        {/* Subsequent replies from support_messages */}
        {messages.map((m: any) => (
          <div key={m.id} className="p-4">
            <div className="text-xs text-gray-500 mb-1">
              {m.is_admin ? "Admin" : "User"} · {m.created_at ? new Date(m.created_at).toLocaleString() : ""}
            </div>
            <div className="whitespace-pre-wrap text-sm">{m.body}</div>
          </div>
        ))}
        {!ticket.message && messages.length === 0 && (
          <div className="p-4 text-sm text-gray-500">No messages yet.</div>
        )}
      </div>

      <form action={`/api/admin/tickets/${ticket.id}/messages`} method="post" className="mt-6 grid gap-2">
        <textarea name="body" required placeholder="Write a reply..." className="w-full border rounded-md p-3 min-h-[120px]" />
        <div className="flex items-center gap-2">
          <button type="submit" className="px-3 py-2 rounded bg-blue-600 text-white text-sm">Send Reply</button>
          <button formAction={`/api/admin/tickets/${ticket.id}`} formMethod="post" name="action" value="mark_ready" className="px-3 py-2 rounded border text-sm">Mark as Ready</button>
          <button formAction={`/api/admin/tickets/${ticket.id}`} formMethod="post" name="action" value="close" className="px-3 py-2 rounded border text-sm">Close Ticket</button>
          <button formAction={`/api/admin/tickets/${ticket.id}`} formMethod="post" name="action" value="reopen" className="px-3 py-2 rounded border text-sm">Reopen</button>
          <button formAction={`/api/admin/tickets/${ticket.id}`} formMethod="post" name="action" value="delete" className="px-3 py-2 rounded border text-sm text-red-600">Delete</button>
        </div>
      </form>
    </main>
  )
}
