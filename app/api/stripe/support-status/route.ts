import { NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { getStripe } from "@/lib/stripe/server"

export const runtime = "nodejs"

export async function GET(_req: NextRequest) {
  try {
    const supabase = getSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .maybeSingle()

    const stripe = getStripe()

    const priceStandard = process.env.STRIPE_PRICE_STANDARD_SUPPORT
    const pricePremium = process.env.STRIPE_PRICE_PREMIUM_SUPPORT

    if (!profile?.stripe_customer_id || (!priceStandard && !pricePremium)) {
      return NextResponse.json({ active: false })
    }

    // Look for any active (non-canceled) subscription with the Support prices
    const subs = await stripe.subscriptions.list({
      customer: profile.stripe_customer_id,
      status: "all",
      expand: ["data.items.data.price"],
      limit: 100,
    })

    let activeTier: null | "standard" | "premium" = null
    for (const s of subs.data) {
      if (s.status === "canceled" || s.status === "incomplete_expired") continue
      for (const item of s.items.data) {
        const priceId = item.price?.id
        if (!priceId) continue
        if (pricePremium && priceId === pricePremium) { activeTier = "premium"; break }
        if (priceStandard && priceId === priceStandard) { activeTier = "standard"; break }
      }
      if (activeTier) break
    }

    return NextResponse.json({ active: Boolean(activeTier), tier: activeTier })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 })
  }
}
