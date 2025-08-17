import { NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs"

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: ticketId } = await params
  const supabase = getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const contentType = req.headers.get("content-type") || ""
  let bodyText = ""
  if (contentType.includes("application/json")) {
    const json = await req.json().catch(() => ({}))
    bodyText = (json.body as string) || ""
  } else {
    const form = await req.formData().catch(() => null)
    bodyText = (form?.get("body") as string) || ""
  }

  if (!bodyText?.trim()) {
    return NextResponse.json({ error: "Message body is required" }, { status: 400 })
  }

  // ticket id already resolved from params above

  // ensure ticket belongs to user
  const { data: ticket } = await supabase
    .from("support_tickets")
    .select("id, user_id")
    .eq("id", ticketId)
    .maybeSingle()
  if (!ticket || ticket.user_id !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  // insert user message
  const { error } = await supabase.from("support_messages").insert({
    ticket_id: ticketId,
    body: bodyText,
    is_admin: false,
    author_id: user.id,
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // update ticket activity timestamp and auto-status transition
  const nowIso = new Date().toISOString()
  const { data: cur } = await supabase
    .from("support_tickets")
    .select("status")
    .eq("id", ticketId)
    .maybeSingle()
  const next: any = { updated_at: nowIso }
  if (!cur || cur.status === "ready" || cur.status === "open") {
    // When user replies, mark ticket as open (awaiting admin)
    next.status = "open"
  }
  await supabase.from("support_tickets").update(next).eq("id", ticketId)

  // Notify support inbox about user reply (non-blocking best-effort)
  try {
    const supportInbox =
      process.env.SUPPORT_INBOX_EMAIL || process.env.CONTACT_INBOX_EMAIL || undefined
    if (supportInbox && process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      // fetch subject for better email subject line
      const { data: t } = await supabase
        .from("support_tickets")
        .select("subject")
        .eq("id", ticketId)
        .maybeSingle()

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      })
      const subject = `[User Reply] ${t?.subject || ticketId}`
      const html = `
        <p>User ${user.email || user.id} replied to ticket ${ticketId}:</p>
        <blockquote style="border-left:3px solid #ddd;padding-left:8px;color:#555;">${bodyText.replace(/\n/g, "<br/>")}</blockquote>
      `
      await transporter.sendMail({
        from: `Fluxedita Support <${process.env.GMAIL_USER}>`,
        to: supportInbox,
        subject,
        html,
      })
    }
  } catch (e) {
    console.warn("Failed to email support about user reply", e)
  }

  return NextResponse.redirect(new URL(`/account/messages/${ticketId}`, req.url))
}
