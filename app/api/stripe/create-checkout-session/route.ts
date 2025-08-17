import { NextRequest, NextResponse } from "next/server"
import type Stripe from 'stripe'
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { getStripe } from "@/lib/stripe/server"
import { getPriceIdForSlug, getModeForSlug, type PackageSlug } from "@/config/stripePackages"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const slug = String(body.slug || "").trim() as PackageSlug
    const supportTier = (body.supportTier === 'standard' || body.supportTier === 'premium') ? body.supportTier as 'standard' | 'premium' : null
    if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 })

    const supabase = getSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const price = getPriceIdForSlug(slug)
    if (!price) return NextResponse.json({ error: `No price configured for ${slug}` }, { status: 400 })
    const mode = getModeForSlug(slug)

    // Fetch profile for customer linking
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, stripe_customer_id")
      .eq("id", user.id)
      .maybeSingle()

    const stripe = getStripe()
    // After successful package checkout, send users to Account with optional Support deeplink
    const supportParam = supportTier ? `support=${supportTier}` : 'support=prompt'
    const successUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/account?purchase=success&${supportParam}`
    const cancelUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/pricing?canceled=1`

    // Validate price type to avoid mode/price mismatch
    let priceObj: Stripe.Price | null = null
    try {
      // Lazy import type to avoid runtime dependency; get actual object via stripe
      // @ts-ignore - type provided by stripe package at runtime
      priceObj = await stripe.prices.retrieve(price)
    } catch (e) {
      // If retrieval fails, continue and let Stripe surface the error on session.create
    }

    if (mode === 'payment' && priceObj && priceObj.type === 'recurring') {
      return NextResponse.json(
        {
          error:
            'Configured package price is a recurring price but checkout mode is payment. Please update env to use a one-time price ID for this package.',
          details: {
            package_slug: slug,
            configured_price: price,
            price_type: priceObj.type,
            recurring: priceObj.recurring || null,
          },
        },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.create(
      {
        mode,
        line_items: [{ price, quantity: 1 }],
        success_url: successUrl,
        cancel_url: cancelUrl,
        customer: profile?.stripe_customer_id || undefined,
        customer_email: profile?.stripe_customer_id ? undefined : user.email || undefined,
        metadata: {
          user_id: user.id,
          package_slug: slug,
        },
        subscription_data: mode === 'subscription' ? { metadata: { user_id: user.id, package_slug: slug } } : undefined,
      },
      // Include supportParam (via success_url) in the idempotency key to prevent collisions when the same user/slugs
      // generate different success URLs (e.g., support=prompt vs support=standard). Alternatively, you can omit the
      // idempotency key to let Stripe generate one per request.
      { idempotencyKey: `checkout:${user.id}:${slug}:${price}:${mode}:${encodeURIComponent(successUrl)}` }
    )

    return NextResponse.json({ url: session.url })
  } catch (e: any) {
    // Surface Stripe error details when available for easier debugging on the client
    const msg = e?.raw?.message || e?.message || 'Server error'
    const code = e?.raw?.code || e?.code || undefined
    return NextResponse.json({ error: msg, code }, { status: 500 })
  }
}
