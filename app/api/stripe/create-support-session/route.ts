import { NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { getStripe } from "@/lib/stripe/server"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const tier = String(body.tier || "").trim().toLowerCase() as "standard" | "premium"
    if (!tier || (tier !== "standard" && tier !== "premium")) {
      return NextResponse.json({ error: "Invalid or missing tier" }, { status: 400 })
    }

    const supabase = getSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const price = tier === "premium"
      ? process.env.STRIPE_PRICE_PREMIUM_SUPPORT
      : process.env.STRIPE_PRICE_STANDARD_SUPPORT

    if (!price) return NextResponse.json({ error: `No Stripe price configured for ${tier} support` }, { status: 400 })

    // Link to Stripe customer if present
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, stripe_customer_id")
      .eq("id", user.id)
      .maybeSingle()

    const stripe = getStripe()
    const successUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/account?support=success`
    const cancelUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/pricing?support_canceled=1`

    const session = await stripe.checkout.sessions.create(
      {
        mode: 'subscription',
        line_items: [{ price, quantity: 1 }],
        success_url: successUrl,
        cancel_url: cancelUrl,
        customer: profile?.stripe_customer_id || undefined,
        customer_email: profile?.stripe_customer_id ? undefined : user.email || undefined,
        metadata: {
          user_id: user.id,
          support_tier: tier,
        },
        subscription_data: { metadata: { user_id: user.id, support_tier: tier } },
      },
      { idempotencyKey: `support:${user.id}:${tier}:${price}` }
    )

    return NextResponse.json({ url: session.url })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 })
  }
}
