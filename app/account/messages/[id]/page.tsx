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

async function fetchTicketForUser(supabase: ReturnType<typeof getSupabaseServerClient>, id: string, userId: string) {
  const { data } = await supabase.from("support_tickets").select("*").eq("id", id).eq("user_id", userId).maybeSingle()
  return data || null
}

async function fetchMessages(supabase: ReturnType<typeof getSupabaseServerClient>, ticketId: string) {
  const { data } = await supabase
    .from("support_messages")
    .select("id, body, is_admin, author_id, created_at")
    .eq("ticket_id", ticketId)
    .order("created_at", { ascending: true })
  return data || []
}

export default async function AccountTicketThread({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { supabase, user } = await ensureUser()
  const ticket = await fetchTicketForUser(supabase, id, user.id)
  if (!ticket) {
    redirect("/account/messages")
  }
  const messages = await fetchMessages(supabase, id)
  const status = (ticket as any).status || "open"
  // Mark as read for user (best-effort)
  try {
    await supabase
      .from("support_tickets")
      .update({ user_last_read_at: new Date().toISOString() })
      .eq("id", id)
      .eq("user_id", user.id)
  } catch {}

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-4"><Link href="/account/messages" className="text-blue-600">← Back to messages</Link></div>
      <h1 className="text-2xl font-bold mb-1">{ticket.subject || `Ticket #${ticket.id}`}</h1>
      <div className="text-xs text-gray-500 mb-6">Status: {status} · Created {ticket.created_at ? new Date(ticket.created_at).toLocaleString() : ""}</div>

      <div className="border rounded-md divide-y">
        {ticket.message && (
          <div className="p-4">
            <div className="text-xs text-gray-500 mb-1">You · {ticket.created_at ? new Date(ticket.created_at).toLocaleString() : ""}</div>
            <div className="whitespace-pre-wrap text-sm">{ticket.message}</div>
          </div>
        )}
        {messages.map((m: any) => (
          <div key={m.id} className="p-4">
            <div className="text-xs text-gray-500 mb-1">{m.is_admin ? "Support" : m.author_id === user.id ? "You" : "User"} · {m.created_at ? new Date(m.created_at).toLocaleString() : ""}</div>
            <div className="whitespace-pre-wrap text-sm">{m.body}</div>
          </div>
        ))}
        {!ticket.message && messages.length === 0 && (
          <div className="p-4 text-sm text-gray-500">No messages yet.</div>
        )}
      </div>

      <form action={`/api/account/tickets/${ticket.id}/messages`} method="post" className="mt-6 grid gap-2">
        <textarea name="body" required placeholder="Write a reply..." className="w-full border rounded-md p-3 min-h-[120px]" />
        <div>
          <button type="submit" className="px-3 py-2 rounded bg-blue-600 text-white text-sm">Send Reply</button>
        </div>
      </form>
    </main>
  )
}
