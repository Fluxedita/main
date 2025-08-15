import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export const runtime = "nodejs"

export async function POST(_req: NextRequest) {
  try {
    const supabase = getSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .maybeSingle()

    if (error) throw error
    const stripe = getStripe()

    let customerId = profile?.stripe_customer_id || null
    if (!customerId) {
      // Auto-create a Stripe customer for manually created test users
      const customer = await stripe.customers.create({
        email: user.email || undefined,
        metadata: { user_id: user.id },
      })
      customerId = customer.id
      const { error: upErr } = await supabase
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id)
      if (upErr) throw upErr
    }

    const returnUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/account?portal=1`
    const portalConfigId = process.env.STRIPE_PORTAL_CONFIGURATION_ID || undefined
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
      ...(portalConfigId ? { configuration: portalConfigId } : {}),
    })

    return NextResponse.json({ url: session.url })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 })
  }
}
