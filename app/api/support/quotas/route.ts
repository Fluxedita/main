import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { getStripe } from "@/lib/stripe/server"

export const runtime = "nodejs"

export async function GET() {
  try {
    const supabase = getSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    // Pull minimal profile fields needed for Stripe lookup
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .maybeSingle()

    // Resolve active support tier via Stripe
    let tier: null | "standard" | "premium" = null
    try {
      const stripeCustomerId = profile?.stripe_customer_id
      const priceStandard = process.env.STRIPE_PRICE_STANDARD_SUPPORT
      const pricePremium = process.env.STRIPE_PRICE_PREMIUM_SUPPORT
      if (stripeCustomerId && (priceStandard || pricePremium)) {
        const stripe = getStripe()
        const subs = await stripe.subscriptions.list({ customer: stripeCustomerId, status: "all", expand: ["data.items.data.price"], limit: 100 })
        for (const s of subs.data) {
          if (s.status === "canceled" || s.status === "incomplete_expired") continue
          for (const item of s.items.data) {
            const pid = item.price?.id
            if (!pid) continue
            if (pricePremium && pid === pricePremium) { tier = "premium"; break }
            if (priceStandard && pid === priceStandard) { tier = "standard"; break }
          }
          if (tier) break
        }
      }
    } catch (e) {
      // Non-fatal
      console.warn("quotas: tier resolve failed", e)
    }

    // Entitlement indicates any purchase (for free 5 total)
    let hasPurchase = false
    try {
      const { data: ents } = await supabase
        .from("entitlements")
        .select("id, status")
        .eq("user_id", user.id)
        .eq("status", "active")
        .limit(1)
      hasPurchase = Boolean(ents && ents.length > 0)
    } catch (e) {
      console.warn("quotas: entitlements lookup failed", e)
    }

    const freeLimit = hasPurchase ? 5 : 0
    const basicLimit = 5

    // Usage counts
    let freeUsed = 0
    let basicUsed = 0
    let nextWeeklyReset: string | null = null

    const now = Date.now()
    const sevenDaysAgoISO = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString()

    // Count free (all-time)
    try {
      const { count } = await supabase
        .from("support_tickets")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("credit_type", "free")
      freeUsed = count || 0
    } catch (e) {
      console.warn("quotas: freeUsed count failed", e)
    }

    // Count basic in the last 7 days and compute next reset based on oldest within window
    try {
      const { data: basics } = await supabase
        .from("support_tickets")
        .select("created_at")
        .eq("user_id", user.id)
        .eq("credit_type", "basic")
        .gte("created_at", sevenDaysAgoISO)
        .order("created_at", { ascending: true })
      basicUsed = basics?.length || 0
      if (basicUsed > 0) {
        const oldest = basics![0].created_at as string
        const resetAtMs = new Date(oldest).getTime() + 7 * 24 * 60 * 60 * 1000
        nextWeeklyReset = new Date(resetAtMs).toISOString()
      }
    } catch (e) {
      console.warn("quotas: basicUsed query failed", e)
    }

    return NextResponse.json({
      tier,
      free: { limit: freeLimit, used: freeUsed, remaining: Math.max(0, freeLimit - freeUsed) },
      basic: { limit: basicLimit, used: basicUsed, nextResetAt: nextWeeklyReset },
    })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 })
  }
}
