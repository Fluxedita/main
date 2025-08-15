import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe/server"
import { getSupabaseAdminClient } from "@/lib/supabase/admin"
import Stripe from "stripe"
import { getAccessSlugForSlug } from "@/config/stripePackages"

export const runtime = "nodejs"

async function upsertOneTimeEntitlement(supabase: ReturnType<typeof getSupabaseAdminClient>, userId: string, packageSlug: string, stripeCustomerId?: string, stripePriceId?: string) {
  // Resolve package_id by slug
  const { data: pkg } = await supabase.from('packages').select('id').eq('slug', packageSlug).maybeSingle()
  if (!pkg?.id) throw new Error(`Package not found for slug: ${packageSlug}`)

  // Try update existing active entitlement, else insert
  const update = {
    type: 'one_time',
    status: 'active',
    source: 'stripe',
    stripe_customer_id: stripeCustomerId ?? null,
    stripe_price_id: stripePriceId ?? null,
  }

  const { data: existing } = await supabase
    .from('entitlements')
    .select('id')
    .eq('user_id', userId)
    .eq('package_id', pkg.id)
    .eq('status', 'active')
    .maybeSingle()

  if (existing?.id) {
    await supabase.from('entitlements').update(update).eq('id', existing.id)
  } else {
    await supabase.from('entitlements').insert({ user_id: userId, package_id: pkg.id, ...update })
  }
}

async function upsertSubscriptionEntitlement(
  supabase: ReturnType<typeof getSupabaseAdminClient>,
  userId: string,
  packageSlug: string,
  status: 'active' | 'canceled' | 'expired',
  stripeCustomerId: string | null,
  stripeSubscriptionId: string,
  stripePriceId: string,
  currentPeriodEnd: number | null,
) {
  const { data: pkg } = await supabase.from('packages').select('id').eq('slug', packageSlug).maybeSingle()
  if (!pkg?.id) throw new Error(`Package not found for slug: ${packageSlug}`)

  const update = {
    type: 'subscription',
    status,
    source: 'stripe',
    stripe_customer_id: stripeCustomerId,
    stripe_subscription_id: stripeSubscriptionId,
    stripe_price_id: stripePriceId,
    current_period_end: currentPeriodEnd ? new Date(currentPeriodEnd * 1000).toISOString() : null,
  }

  const { data: existing } = await supabase
    .from('entitlements')
    .select('id')
    .eq('user_id', userId)
    .eq('package_id', pkg.id)
    .eq('status', 'active')
    .maybeSingle()

  if (status === 'active') {
    if (existing?.id) {
      await supabase.from('entitlements').update(update).eq('id', existing.id)
    } else {
      await supabase.from('entitlements').insert({ user_id: userId, package_id: pkg.id, ...update })
    }
  } else {
    // canceled or expired: update any entitlement rows for this subscription
    if (existing?.id) {
      await supabase.from('entitlements').update(update).eq('id', existing.id)
    } else {
      // ensure a row exists reflecting canceled status (historical)
      await supabase.from('entitlements').insert({ user_id: userId, package_id: pkg.id, ...update })
    }
  }
}

export async function POST(req: NextRequest) {
  const stripe = getStripe()
  const sig = req.headers.get('stripe-signature')
  if (!sig) return NextResponse.json({ error: 'Missing signature' }, { status: 400 })

  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })

  let event: Stripe.Event
  const buf = await req.arrayBuffer()
  try {
    // @ts-ignore types for constructEvent expect Buffer, Node >=18 supports Uint8Array
    event = stripe.webhooks.constructEvent(Buffer.from(buf), sig, secret)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook signature verification failed: ${err.message}` }, { status: 400 })
  }

  const supabase = getSupabaseAdminClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any
        const mode = session.mode as 'payment' | 'subscription'
        const userId = session.metadata?.user_id as string | undefined
        const packageSlugRaw = session.metadata?.package_slug as string | undefined
        const packageSlug = packageSlugRaw ? getAccessSlugForSlug(packageSlugRaw as any) : undefined
        if (!userId || !packageSlug) throw new Error('Missing metadata user_id or package_slug')

        // ensure profile has stripe_customer_id set
        const stripeCustomerId = (session.customer as string) || null
        if (stripeCustomerId) {
          await supabase.from('profiles').update({ stripe_customer_id: stripeCustomerId }).eq('id', userId)
        }

        if (mode === 'payment') {
          // Retrieve session with expanded line items to get price id
          const fullSession = await stripe.checkout.sessions.retrieve(session.id as string, { expand: ['line_items'] })
          const priceId = (fullSession.line_items?.data?.[0]?.price?.id as string | undefined) || undefined
          await upsertOneTimeEntitlement(supabase, userId, packageSlug, stripeCustomerId ?? undefined, priceId)
        } else {
          const subscriptionId = session.subscription as string
          // fetch subscription for period end & price
          const sub = await stripe.subscriptions.retrieve(subscriptionId)
          await upsertSubscriptionEntitlement(
            supabase,
            userId,
            packageSlug,
            'active',
            stripeCustomerId,
            subscriptionId,
            (sub.items.data[0]?.price?.id as string) || '',
            sub.current_period_end || null
          )
        }
        break
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.created':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as any
        const subscriptionId = sub.id as string
        const priceId = (sub.items?.data?.[0]?.price?.id as string) || ''
        const customerId = (sub.customer as string | null) ?? null
        const currentPeriodEnd = sub.current_period_end || null
        // We rely on entitlement metadata from checkout; store package_slug in subscription metadata if you want
        const userId = sub.metadata?.user_id as string | undefined
        const packageSlugRaw = sub.metadata?.package_slug as string | undefined
        const packageSlug = packageSlugRaw ? getAccessSlugForSlug(packageSlugRaw as any) : undefined
        if (!userId || !packageSlug) {
          // If metadata missing, we cannot confidently update; ignore safely
          break
        }
        const status: 'active' | 'canceled' | 'expired' = sub.status === 'active' || sub.status === 'trialing' ? 'active' : sub.status === 'canceled' ? 'canceled' : 'expired'
        await upsertSubscriptionEntitlement(
          supabase,
          userId,
          packageSlug,
          status,
          customerId,
          subscriptionId,
          priceId,
          currentPeriodEnd
        )
        break
      }
      default:
        // ignore other events
        break
    }
    return NextResponse.json({ received: true })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Webhook error' }, { status: 500 })
  }
}
