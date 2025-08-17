import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { getStripe } from '@/lib/stripe/server'

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json().catch(() => ({}))
    const subject: string = String(body.subject || '').slice(0, 200)
    const category: string = String(body.category || 'General').slice(0, 100)
    const message: string = String(body.message || '').slice(0, 10000)

    if (!subject || !message) {
      return NextResponse.json({ error: 'Subject and message are required' }, { status: 400 })
    }

    // Fetch a bit more context from profile if available
    const { data: profile } = await supabase
      .from('profiles')
      .select('username, full_name, company, role, stripe_customer_id')
      .eq('id', user.id)
      .maybeSingle()

    const supportInbox = process.env.SUPPORT_INBOX_EMAIL || process.env.CONTACT_INBOX_EMAIL || 'jamescroanin@gmail.com'

    // Determine support tier (standard/premium) via Stripe subscriptions
    let activeTier: null | 'standard' | 'premium' = null
    try {
      const stripeCustomerId = (profile as any)?.stripe_customer_id
      const priceStandard = process.env.STRIPE_PRICE_STANDARD_SUPPORT
      const pricePremium = process.env.STRIPE_PRICE_PREMIUM_SUPPORT
      if (stripeCustomerId && (priceStandard || pricePremium)) {
        const stripe = getStripe()
        const subs = await stripe.subscriptions.list({ customer: stripeCustomerId, status: 'all', expand: ['data.items.data.price'], limit: 100 })
        for (const s of subs.data) {
          if (s.status === 'canceled' || s.status === 'incomplete_expired') continue
          for (const item of s.items.data) {
            const pid = item.price?.id
            if (!pid) continue
            if (pricePremium && pid === pricePremium) { activeTier = 'premium'; break }
            if (priceStandard && pid === priceStandard) { activeTier = 'standard'; break }
          }
          if (activeTier) break
        }
      }
    } catch (e) {
      // Non-fatal: inability to resolve tier should not block ticket
      console.warn('Support tier resolution failed', e)
    }

    // Compute remaining free/basic quotas to tag tickets
    let creditType: 'free' | 'basic' | 'premium' | 'none' = 'none'
    try {
      // Free entitlement: 5 total if user has purchased any package (any active entitlement)
      let hasPurchase = false
      const { data: ents } = await supabase
        .from('entitlements')
        .select('id, status')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .limit(1)
      hasPurchase = Boolean(ents && ents.length > 0)

      // Count prior usage by credit_type
      const { count: freeUsed } = await supabase
        .from('support_tickets')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('credit_type', 'free')

      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      const { count: basicUsed } = await supabase
        .from('support_tickets')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('credit_type', 'basic')
        .gte('created_at', sevenDaysAgo)

      const basicWeeklyLimit = 5
      const freeTotalLimit = hasPurchase ? 5 : 0

      if (activeTier === 'premium') {
        creditType = 'premium'
      } else if (activeTier === 'standard' && (basicUsed ?? 0) < basicWeeklyLimit) {
        creditType = 'basic'
      } else if ((freeUsed ?? 0) < freeTotalLimit) {
        creditType = 'free'
      } else {
        creditType = 'none'
      }

      // Block if no credits available
      const noFreeLeft = (freeUsed ?? 0) >= freeTotalLimit
      const noBasicLeft = (basicUsed ?? 0) >= basicWeeklyLimit
      if (activeTier === 'premium') {
        // never block
      } else if (activeTier === 'standard') {
        if (noBasicLeft && noFreeLeft) {
          return NextResponse.json({ error: 'You have used your weekly Standard Support allowance. Please upgrade your Support plan or contact us.', code: 'basic_exhausted' }, { status: 403 })
        }
      } else {
        // no active support subscription
        if (noFreeLeft) {
          return NextResponse.json({ error: 'You have used your free support credits. Please upgrade to a Support plan or contact us.', code: 'free_exhausted' }, { status: 403 })
        }
      }
    } catch (e) {
      console.warn('Quota computation failed', e)
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Persist ticket in Supabase (for history/analytics)
    let inserted: { id: string } | null = null
    let insertError: any = null
    try {
      const res = await supabase
        .from('support_tickets')
        .insert({
          user_id: user.id,
          user_email: user.email,
          subject,
          category,
          message,
          profile_full_name: profile?.full_name ?? null,
          profile_username: profile?.username ?? null,
          profile_company: profile?.company ?? null,
          profile_role: profile?.role ?? null,
          status: 'open',
          source: 'account',
          credit_type: creditType,
        })
        .select('id')
        .single()
      inserted = res.data as any
      insertError = res.error
    } catch (e: any) {
      insertError = e
    }
    if (insertError) {
      // Retry path 1: remove credit_type if that column is missing
      const msg = String(insertError?.message || insertError)
      if (/column\s+credit_type\s+does not exist/i.test(msg)) {
        console.warn('support_tickets.credit_type missing; retrying insert without it')
        const fallback1 = await supabase
          .from('support_tickets')
          .insert({
            user_id: user.id,
            user_email: user.email,
            subject,
            category,
            message,
            profile_full_name: profile?.full_name ?? null,
            profile_username: profile?.username ?? null,
            profile_company: profile?.company ?? null,
            profile_role: profile?.role ?? null,
            status: 'open',
            source: 'account',
          })
          .select('id')
          .single()
        inserted = fallback1.data as any
        insertError = fallback1.error
      }
    }
    if (insertError) {
      // Retry path 2: minimal required columns only
      console.warn('support_tickets insert failed; retrying with minimal columns only')
      const fallback2 = await supabase
        .from('support_tickets')
        .insert({
          user_id: user.id,
          user_email: user.email,
          subject,
          message,
          status: 'open',
        })
        .select('id')
        .single()
      inserted = fallback2.data as any
      insertError = fallback2.error
    }
    if (insertError) {
      console.error('Failed to persist support ticket after fallbacks:', insertError)
    }

    const html = `
      <h2>New Support Ticket</h2>
      <p><strong>Submitted by:</strong> ${user.email || '(no email)'} (${user.id})</p>
      ${profile ? `<p><strong>Name:</strong> ${profile.full_name || ''} | <strong>Username:</strong> ${profile.username || ''} | <strong>Company:</strong> ${profile.company || ''} | <strong>Role:</strong> ${profile.role || ''}</p>` : ''}
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr />
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `

    const info = await transporter.sendMail({
      from: `Fluxedita Support <${process.env.GMAIL_USER}>`,
      to: supportInbox,
      replyTo: user.email || undefined,
      subject: `[Support Ticket] ${subject}`,
      html,
    })

    console.log('Support ticket sent:', info.messageId, 'db_id:', inserted?.id)
    return NextResponse.json({ ok: true, id: inserted?.id })
  } catch (e) {
    console.error('Support ticket error', e)
    return NextResponse.json({ error: 'Failed to submit ticket' }, { status: 500 })
  }
}
