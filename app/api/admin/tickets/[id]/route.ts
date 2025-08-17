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
  const { id } = await params
  const { supabase, isAdmin } = await ensureAdmin()
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const contentType = req.headers.get("content-type") || ""
  let action = ""
  if (contentType.includes("application/json")) {
    const json = await req.json().catch(() => ({}))
    action = json.action || ""
  } else {
    const form = await req.formData().catch(() => null)
    action = (form?.get("action") as string) || ""
  }

  // id resolved from params above
  try {
    switch (action) {
      case "mark_ready":
        await supabase.from("support_tickets").update({ status: "ready" }).eq("id", id)
        break
      case "close":
        // Force close the ticket and bump activity timestamp
        await supabase
          .from("support_tickets")
          .update({ status: "closed", updated_at: new Date().toISOString() })
          .eq("id", id)

        // Notify sender via email (best-effort)
        try {
          const { data: ticket } = await supabase
            .from("support_tickets")
            .select("user_email, subject")
            .eq("id", id)
            .maybeSingle()
          const to = ticket?.user_email
          const subject = ticket?.subject || `Ticket #${id}`
          const GMAIL_USER = process.env.GMAIL_USER
          const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD
          if (to && GMAIL_USER && GMAIL_APP_PASSWORD) {
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
            })
            await transporter.sendMail({
              from: `Support <${GMAIL_USER}>`,
              to,
              subject: `Your support ticket has been closed`,
              text: `Hello,\n\nYour support ticket ("${subject}") has been marked as closed by our team. If you need further assistance, simply reply in the ticket thread from your account and we'll reopen it.\n\nThanks,\nSupport Team`,
            })
          }
        } catch {}
        break
      case "reopen":
        await supabase.from("support_tickets").update({ status: "open", updated_at: new Date().toISOString() }).eq("id", id)
        break
      case "delete":
        await supabase.from("support_messages").delete().eq("ticket_id", id)
        await supabase.from("support_tickets").delete().eq("id", id)
        return NextResponse.redirect(new URL("/admin/messages", req.url))
      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 })
    }
    return NextResponse.redirect(new URL(`/admin/messages/${id}`, req.url))
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 })
  }
}
