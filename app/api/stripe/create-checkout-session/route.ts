import { NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { getStripe } from "@/lib/stripe/server"
import { getPriceIdForSlug, getModeForSlug, type PackageSlug } from "@/config/stripePackages"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const slug = String(body.slug || "").trim() as PackageSlug
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
    const successUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/account?purchase=success`
    const cancelUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/pricing?canceled=1`

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
      { idempotencyKey: `checkout:${user.id}:${slug}:${price}:${mode}` }
    )

    return NextResponse.json({ url: session.url })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 })
  }
}
