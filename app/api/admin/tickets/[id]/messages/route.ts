import { NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs"

async function ensureAdmin() {
  const supabase = getSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { supabase, user: null, isAdmin: false }
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle()
  const isAdmin = profile?.role === "admin"
  return { supabase, user, isAdmin }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: ticketId } = await params
  const { supabase, user, isAdmin } = await ensureAdmin()
  if (!isAdmin || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  let bodyText = ""
  const contentType = req.headers.get("content-type") || ""
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

  try {
    // ensure ticket exists and get user email for notification
    const { data: ticket } = await supabase
      .from("support_tickets")
      .select("id, user_email, subject")
      .eq("id", ticketId)
      .maybeSingle()
    if (!ticket) return NextResponse.json({ error: "Ticket not found" }, { status: 404 })

    // insert admin message
    const { error: insertErr } = await supabase.from("support_messages").insert({
      ticket_id: ticketId,
      body: bodyText,
      is_admin: true,
      author_id: user.id,
    })
    if (insertErr) throw insertErr

    // update ticket activity timestamp and auto-status transition
    const nowIso = new Date().toISOString()
    // fetch current status
    const { data: cur } = await supabase
      .from("support_tickets")
      .select("status")
      .eq("id", ticketId)
      .maybeSingle()
    const next: any = { updated_at: nowIso }
    if (!cur || cur.status !== "closed") {
      // When admin replies, mark as ready (waiting on user)
      next.status = "ready"
    }
    await supabase.from("support_tickets").update(next).eq("id", ticketId)

    // Email the ticket submitter (if we have their email)
    try {
      if (ticket.user_email && process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        })

        const subject = `[Support Reply] ${ticket.subject || ticket.id}`
        const html = `
          <p>Hi,</p>
          <p>We have replied to your support ticket:</p>
          <blockquote style="border-left:3px solid #ddd;padding-left:8px;color:#555;">${bodyText.replace(/\n/g, "<br/>")}</blockquote>
          <p>You can continue the conversation by replying to this email or via your account once messaging is available.</p>
        `

        await transporter.sendMail({
          from: `Fluxedita Support <${process.env.GMAIL_USER}>`,
          to: ticket.user_email,
          subject,
          html,
        })
      }
    } catch (e) {
      console.warn("Failed to email user about admin reply", e)
    }

    return NextResponse.redirect(new URL(`/admin/messages/${ticketId}`, req.url))
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 })
  }
}
