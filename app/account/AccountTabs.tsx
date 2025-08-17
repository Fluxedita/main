"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

type Profile = {
  id: string
  username: string | null
  full_name: string | null
  role: string | null
  stripe_customer_id: string | null
  timezone: string | null
  marketing_opt_in: boolean | null
  avatar_url: string | null
  company: string | null
  sector: string | null
  position: string | null
  website_url: string | null
  bio: string | null
  other_info: string | null
}

type Props = {
  user: { id: string; email: string | null }
  profile: Profile | null
}

export default function AccountTabs({ user, profile }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const [tab, setTab] = useState<"overview" | "downloads" | "billing" | "settings">("overview")
  const [unread, setUnread] = useState<number>(0)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const [showSupportPrompt, setShowSupportPrompt] = useState(false)
  const [support, setSupport] = useState<{ loading: boolean; active: boolean; tier: null | 'standard' | 'premium' }>({ loading: false, active: false, tier: null })
  const [showOverviewSupportBanner, setShowOverviewSupportBanner] = useState(false)
  const [showTicket, setShowTicket] = useState(false)
  const [ticketSubmitting, setTicketSubmitting] = useState(false)
  const [ticket, setTicket] = useState<{ subject: string; category: string; message: string }>({ subject: "", category: "General", message: "" })

  const [quotas, setQuotas] = useState<{
    loading: boolean
    tier: null | 'standard' | 'premium'
    free: { limit: number; used: number; remaining: number }
    basic: { limit: number; used: number; nextResetAt: string | null }
  }>({ loading: false, tier: null, free: { limit: 0, used: 0, remaining: 0 }, basic: { limit: 5, used: 0, nextResetAt: null } })

  const [form, setForm] = useState({
    full_name: profile?.full_name ?? "",
    username: profile?.username ?? "",
    timezone: profile?.timezone ?? "",
    marketing_opt_in: Boolean(profile?.marketing_opt_in ?? false),
    avatar_url: profile?.avatar_url ?? "",
    company: profile?.company ?? "",
    sector: profile?.sector ?? "",
    position: profile?.position ?? "",
    website_url: profile?.website_url ?? "",
    bio: profile?.bio ?? "",
    other_info: profile?.other_info ?? "",
  })

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setStatus(null)
    try {
      const r = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const j = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(j.error || r.statusText)
      setStatus("Saved")
    } catch (e: any) {
      setStatus(`Error: ${e.message || e}`)
    } finally {
      setSaving(false)
    }

  }

  // Start Support subscription checkout (in a new tab)
  const startSupportCheckout = async (tier: "standard" | "premium") => {
    track('support_checkout_click', { tier, source: tab })
    try {
      const res = await fetch('/api/stripe/create-support-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ tier }),
      })
      if (res.status === 401) {
        toast({ title: 'Please sign in to subscribe to support' })
        const current = typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/account'
        router.push(`/signin?next=${encodeURIComponent(current)}`)
        return
      }
      const data = await res.json()
      if (res.ok && data?.url) {
        window.open(data.url as string, '_blank')
      } else {
        throw new Error(data?.error || 'Unable to start support checkout')
      }
    } catch (e: any) {
      toast({ title: 'Support checkout error', description: e?.message || String(e) })
    }
  }

  // Detect successful purchase and either prompt/auto-deeplink Support, or redirect to Downloads
  useEffect(() => {
    if (typeof window === "undefined") return
    const params = new URLSearchParams(window.location.search)
    if (params.get("purchase") === "success") {
      const support = params.get('support')
      // Always show a success toast
      toast({ title: "Purchase successful", description: support ? "You can add Support now." : "Your access is ready. Redirecting to downloads…" })

      if (support === 'standard' || support === 'premium') {
        track('support_autodeeplink', { tier: support })
        // Auto-deeplink directly into Support checkout
        const t = setTimeout(() => startSupportCheckout(support), 400)
        return () => clearTimeout(t)
      }
      if (support === 'prompt') {
        track('support_prompt_shown', { from: 'post_purchase' })
        // Show upsell card, do NOT redirect yet
        setShowSupportPrompt(true)
        return
      }
      // Default: redirect to Downloads
      const t = setTimeout(() => {
        router.replace('/account/downloads')
      }, 1200)
      return () => clearTimeout(t)
    }
  }, [router, toast])

  // Lightweight analytics tracker (no-op backend by default)
  const track = async (event: string, props?: Record<string, any>) => {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, props }),
        keepalive: true,
      })
    } catch {}
  }

  // Fetch support status when viewing Billing or Overview
  useEffect(() => {
    if (tab !== 'billing' && tab !== 'overview') return
    let aborted = false
    const run = async () => {
      setSupport((s) => ({ ...s, loading: true }))
      try {
        const res = await fetch('/api/stripe/support-status', { credentials: 'include' })
        const data = await res.json().catch(() => ({}))
        if (!aborted && res.ok) {
          setSupport({ loading: false, active: Boolean(data.active), tier: (data.tier === 'standard' || data.tier === 'premium') ? data.tier : null })
          if ((tab === 'overview') && !Boolean(data.active)) {
            setShowOverviewSupportBanner(true)
            track('support_overview_banner_shown')
          }
        } else if (!aborted) {
          setSupport({ loading: false, active: false, tier: null })
        }
      } catch {
        if (!aborted) setSupport({ loading: false, active: false, tier: null })
      }
    }
    run()
    return () => { aborted = true }
  }, [tab])

  // Fetch unread messages count for Messages tab
  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const res = await fetch('/api/account/messages/unread-count', { credentials: 'include' })
        const data = await res.json().catch(() => ({}))
        if (!cancelled && res.ok) setUnread(Number(data.count || 0))
      } catch {}
    }
    load()
    const t = setInterval(load, 30_000)
    return () => { cancelled = true; clearInterval(t) }
  }, [])

  // Fetch quotas when viewing Billing or Overview
  useEffect(() => {
    if (tab !== 'billing' && tab !== 'overview') return
    let aborted = false
    const run = async () => {
      setQuotas((q) => ({ ...q, loading: true }))
      try {
        const res = await fetch('/api/support/quotas', { credentials: 'include' })
        const data = await res.json().catch(() => ({}))
        if (!aborted && res.ok) {
          setQuotas({
            loading: false,
            tier: (data.tier === 'standard' || data.tier === 'premium') ? data.tier : null,
            free: data.free || { limit: 0, used: 0, remaining: 0 },
            basic: data.basic || { limit: 5, used: 0, nextResetAt: null },
          })
        } else if (!aborted) {
          setQuotas((q) => ({ ...q, loading: false }))
        }
      } catch {
        if (!aborted) setQuotas((q) => ({ ...q, loading: false }))
      }
    }
    run()
    return () => { aborted = true }
  }, [tab])

  return (
    <div>
      {showSupportPrompt && (
        <div className="mb-4 rounded-md border border-blue-200 bg-blue-50 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-semibold text-blue-900">Add Ongoing Support</div>
              <p className="text-sm text-blue-800 mt-1">Get monthly assistance, updates, and priority help. Choose a Support plan to continue.</p>
            </div>
            <button
              className="text-blue-700 text-sm underline"
              onClick={() => { setShowSupportPrompt(false); router.replace('/account/downloads') }}
            >
              Skip for now
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            <button
              onClick={() => startSupportCheckout('standard')}
              className="rounded bg-white border border-blue-300 px-3 py-2 text-sm text-blue-900 hover:bg-blue-100"
            >
              Standard Support — £49/mo
            </button>
            <button
              onClick={() => startSupportCheckout('premium')}
              className="rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
            >
              Premium Support — £99/mo
            </button>
          </div>
        </div>
      )}
      <div className="flex gap-3 border-b mb-6">
        {([
          ["overview", "Overview"],
          ["downloads", "Downloads"],
          ["billing", "Billing"],
          ["settings", "Settings"],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-3 py-2 -mb-px border-b-2 ${tab === key ? "border-black font-semibold" : "border-transparent text-gray-500"}`}
          >
            {label}
          </button>
        ))}
        <button
          onClick={() => router.push('/account/messages')}
          className={`px-3 py-2 -mb-px border-b-2 ${pathname?.startsWith('/account/messages') ? "border-black font-semibold" : "border-transparent text-gray-500"} relative`}
        >
          Messages
          {unread > 0 && (
            <span className="ml-2 inline-flex items-center justify-center text-[10px] leading-none px-1.5 py-0.5 rounded-full bg-red-600 text-white">
              {unread}
            </span>
          )}
        </button>
      </div>

      {tab === "overview" && (
        <section className="space-y-4">
          {!support.loading && !support.active && showOverviewSupportBanner && (
            <div className="rounded-md border border-blue-200 bg-blue-50 p-3 flex items-start justify-between gap-4">
              <div>
                <div className="text-sm text-blue-900 font-medium">Add Support for Priority Help</div>
                <p className="text-xs text-blue-800 mt-1">Get monthly assistance, updates, and priority support.</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => startSupportCheckout('standard')}
                    className="rounded bg-white border border-blue-300 px-2.5 py-1.5 text-xs text-blue-900 hover:bg-blue-100"
                  >
                    Add Standard — £49/mo
                  </button>
                  <button
                    onClick={() => startSupportCheckout('premium')}
                    className="rounded bg-blue-600 px-2.5 py-1.5 text-xs text-white hover:bg-blue-700"
                  >
                    Add Premium — £99/mo
                  </button>
                </div>
              </div>
              <button
                onClick={() => { setShowOverviewSupportBanner(false); track('support_overview_banner_dismiss') }}
                className="text-xs text-blue-700 underline"
              >
                Dismiss
              </button>
            </div>
          )}
          <div className="rounded-lg border p-4 bg-white">
            <div className="text-sm text-gray-500">Email</div>
            <div>{user.email}</div>
          </div>
          <div className="rounded-lg border p-4 bg-white flex items-center gap-4">
            <div className="text-sm text-gray-500">Avatar</div>
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="Avatar" className="w-12 h-12 rounded-full object-cover border" />
            ) : (
              <div className="w-12 h-12 rounded-full border bg-gray-100" />
            )}
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => { setShowTicket(true); track('support_ticket_open', { source: 'overview' }) }}
              className="rounded bg-white border px-3 py-2 text-sm hover:bg-gray-50"
            >
              Submit Support Ticket
            </button>
            {!quotas.loading && (
              <div className="text-xs text-gray-600 flex items-center gap-3">
                <span>Weekly (Basic): {quotas.basic.used}/{quotas.basic.limit}{quotas.basic.nextResetAt ? ` • resets ${new Date(quotas.basic.nextResetAt).toLocaleDateString()}` : ''}</span>
                <span>Free included: {quotas.free.used}/{quotas.free.limit} used • {Math.max(0, quotas.free.remaining)} left</span>
              </div>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border p-4 bg-white">
              <div className="text-sm text-gray-500 mb-1">Full name</div>
              <div className="text-base">{profile?.full_name ?? "—"}</div>
            </div>
            <div className="rounded-lg border p-4 bg-white">
              <div className="text-sm text-gray-500 mb-1">Username</div>
              <div className="text-base">{profile?.username ?? "—"}</div>
            </div>
            <div className="rounded-lg border p-4 bg-white">
              <div className="text-sm text-gray-500 mb-1">Role</div>
              <div className="text-base">{profile?.role ?? "user"}</div>
            </div>
            <div className="rounded-lg border p-4 bg-white">
              <div className="text-sm text-gray-500 mb-1">Stripe Customer</div>
              <div className="text-base">{profile?.stripe_customer_id ?? "—"}</div>
            </div>
          </div>
          <div>
            <button
              onClick={async () => {
                try {
                  const res = await fetch("/api/stripe/portal", { method: "POST", credentials: "include" })
                  const data = await res.json().catch(() => ({} as any))
                  if (!res.ok || !data?.url) throw new Error(data?.error || "Unable to open billing portal")
                  window.location.href = data.url as string
                } catch (e: any) {
                  toast({ title: "Billing portal error", description: e?.message || String(e) })
                }
              }}
              className="bg-black text-white rounded px-3 py-2"
            >
              Manage Billing
            </button>
          </div>
          {/* Support Ticket Modal */}
          {showTicket && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowTicket(false)} />
              <div className="relative z-10 w-full max-w-lg rounded-lg bg-white shadow-lg border">
                <div className="px-4 py-3 border-b flex items-center justify-between">
                  <h3 className="font-semibold">New Support Ticket</h3>
                  <button className="text-sm text-gray-600 hover:underline" onClick={() => setShowTicket(false)}>Close</button>
                </div>
                <form
                  className="p-4 grid gap-3"
                  onSubmit={async (e) => {
                    e.preventDefault()
                    if (!ticket.subject || !ticket.message) {
                      toast({ title: 'Please fill subject and message' })
                      return
                    }
                    // Client-side quota guard
                    const noFreeLeft = !support.active && !quotas.loading && quotas.free.remaining <= 0
                    const noBasicLeft = (support.tier === 'standard') && !quotas.loading && quotas.basic.used >= quotas.basic.limit && quotas.free.remaining <= 0
                    const exhausted = noFreeLeft || noBasicLeft
                    const promptUpgradeOrContact = (kind: 'free' | 'basic') => {
                      const title = kind === 'basic' ? 'Standard Support allowance used' : 'Free support credits used'
                      const description = kind === 'basic'
                        ? 'You have used your weekly Standard Support allowance. You can upgrade your Support plan or contact us via the contact form.'
                        : 'You have used your free support credits. You can purchase a Support plan or contact us via the contact form.'
                      toast({ title, description })
                      setTimeout(() => {
                        const choice = window.confirm('OK: View Support plans. Cancel: Go to Contact page.')
                        if (choice) {
                          // Let users choose tier on Support page
                          window.location.href = '/support'
                        } else {
                          window.location.href = '/contact'
                        }
                      }, 50)
                    }
                    if (exhausted) {
                      promptUpgradeOrContact(noBasicLeft ? 'basic' : 'free')
                      return
                    }
                    setTicketSubmitting(true)
                    try {
                      const res = await fetch('/api/support/ticket', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify(ticket),
                      })
                      const data = await res.json().catch(() => ({}))
                      if (res.status === 403) {
                        // Exhausted on server-side; show upgrade/contact
                        const code = (data && (data.code === 'free_exhausted' || data.code === 'basic_exhausted')) ? data.code : undefined
                        toast({ title: 'Support credits unavailable', description: data?.error || 'You have used your available support credits.' })
                        if (code === 'basic_exhausted') {
                          setTimeout(() => { const c = window.confirm('OK: View Support plans. Cancel: Go to Contact page.'); window.location.href = c ? '/support' : '/contact' }, 50)
                        } else {
                          setTimeout(() => { const c = window.confirm('OK: View Support plans. Cancel: Go to Contact page.'); window.location.href = c ? '/support' : '/contact' }, 50)
                        }
                        return
                      }
                      if (!res.ok) throw new Error(data?.error || 'Failed to submit ticket')
                      track('support_ticket_submitted', { category: ticket.category })
                      toast({ title: 'Ticket submitted', description: 'We\'ll get back to you via email.' })
                      setShowTicket(false)
                      setTicket({ subject: '', category: 'General', message: '' })
                      // Refresh quotas after successful submission
                      try {
                        const qr = await fetch('/api/support/quotas', { credentials: 'include' })
                        const qd = await qr.json().catch(() => ({}))
                        if (qr.ok) {
                          setQuotas({
                            loading: false,
                            tier: (qd.tier === 'standard' || qd.tier === 'premium') ? qd.tier : null,
                            free: qd.free || { limit: 0, used: 0, remaining: 0 },
                            basic: qd.basic || { limit: 5, used: 0, nextResetAt: null },
                          })
                        }
                      } catch {}
                    } catch (e: any) {
                      toast({ title: 'Ticket error', description: e?.message || String(e) })
                    } finally {
                      setTicketSubmitting(false)
                    }
                  }}
                >
                  {(!quotas.loading) && (
                    (() => {
                      const noFreeLeft = !support.active && quotas.free.remaining <= 0
                      const noBasicLeft = (support.tier === 'standard') && quotas.basic.used >= quotas.basic.limit && quotas.free.remaining <= 0
                      if (noFreeLeft || noBasicLeft) {
                        return (
                          <div className="rounded border border-amber-300 bg-amber-50 p-2 text-xs text-amber-900">
                            {noBasicLeft ? (
                              <>
                                You have used your weekly Standard Support allowance. Consider upgrading your Support plan or use our contact form.
                              </>
                            ) : (
                              <>
                                You have used your free support credits. Consider purchasing a Support plan or use our contact form.
                              </>
                            )}
                            <div className="mt-2 flex gap-2">
                              <a className="underline" href="/support">View Support plans</a>
                              <a className="underline" href="/contact">Contact</a>
                            </div>
                          </div>
                        )
                      }
                      return null
                    })()
                  )}
                  <div className="grid gap-1">
                    <label className="text-sm">Subject</label>
                    <input
                      className="border rounded px-2 py-1"
                      value={ticket.subject}
                      onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
                      maxLength={200}
                      placeholder="Brief summary"
                    />
                  </div>
                  <div className="grid gap-1">
                    <label className="text-sm">Category</label>
                    <select
                      className="border rounded px-2 py-1"
                      value={ticket.category}
                      onChange={(e) => setTicket({ ...ticket, category: e.target.value })}
                    >
                      <option>General</option>
                      <option>Billing</option>
                      <option>Installation</option>
                      <option>Bug</option>
                      <option>Feature Request</option>
                    </select>
                  </div>
                  <div className="grid gap-1">
                    <label className="text-sm">Message</label>
                    <textarea
                      className="border rounded px-2 py-1 min-h-32"
                      value={ticket.message}
                      onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
                      maxLength={10000}
                      placeholder="Describe your issue or request."
                    />
                  </div>
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button type="button" className="px-3 py-2 text-sm" onClick={() => setShowTicket(false)}>Cancel</button>
                    {(() => {
                      const noFreeLeft = !support.active && !quotas.loading && quotas.free.remaining <= 0
                      const noBasicLeft = (support.tier === 'standard') && !quotas.loading && quotas.basic.used >= quotas.basic.limit && quotas.free.remaining <= 0
                      const disabled = ticketSubmitting || noFreeLeft || noBasicLeft
                      return (
                        <button type="submit" className={`rounded px-3 py-2 text-sm ${disabled ? 'bg-gray-300 text-gray-600' : 'bg-black text-white'}`} disabled={disabled}>
                          {disabled ? 'No credits available' : (ticketSubmitting ? 'Submitting…' : 'Submit Ticket')}
                        </button>
                      )
                    })()}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">From: {user.email || '—'} • ID: {user.id}</p>
                </form>
              </div>
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border p-4 bg-white">
              <div className="text-sm text-gray-500 mb-1">Company</div>
              <div className="text-base">{profile?.company ?? "—"}</div>
            </div>
            <div className="rounded-lg border p-4 bg-white">
              <div className="text-sm text-gray-500 mb-1">Sector</div>
              <div className="text-base">{profile?.sector ?? "—"}</div>
            </div>
            <div className="rounded-lg border p-4 bg-white">
              <div className="text-sm text-gray-500 mb-1">Position</div>
              <div className="text-base">{profile?.position ?? "—"}</div>
            </div>
            <div className="rounded-lg border p-4 bg-white">
              <div className="text-sm text-gray-500 mb-1">Website</div>
              <div className="text-base">{profile?.website_url ? <a className="underline" href={profile.website_url} target="_blank" rel="noreferrer">{profile.website_url}</a> : "—"}</div>
            </div>
            <div className="rounded-lg border p-4 bg-white sm:col-span-2">
              <div className="text-sm text-gray-500 mb-1">Bio</div>
              <div className="text-base whitespace-pre-wrap">{profile?.bio ?? "—"}</div>
            </div>
            <div className="rounded-lg border p-4 bg-white sm:col-span-2">
              <div className="text-sm text-gray-500 mb-1">Other Info</div>
              <div className="text-base whitespace-pre-wrap">{profile?.other_info ?? "—"}</div>
            </div>
          </div>
          <div className="rounded-lg border p-4 bg-white">
            <div className="text-sm text-gray-500 mb-2">User ID</div>
            <code className="break-all text-xs">{user.id}</code>
          </div>
        </section>
      )}

      {tab === "billing" && (
        <section className="space-y-4">
          <div className="rounded-lg border p-4 bg-white">
            <div className="text-sm text-gray-500 mb-2">Billing</div>
            <p className="text-sm text-gray-700 mb-4">
              Manage your subscription, payment methods, and invoices.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={async () => {
                  try {
                    const res = await fetch("/api/stripe/portal", { method: "POST", credentials: "include" })
                    const data = await res.json().catch(() => ({} as any))
                    if (!res.ok || !data?.url) throw new Error(data?.error || "Unable to open billing portal")
                    window.location.href = data.url as string
                  } catch (e: any) {
                    console.error("Billing portal error:", e)
                    toast({ title: "Billing portal error", description: e?.message || String(e) })
                  }
                }}
                className="bg-black text-white rounded px-3 py-2"
              >
                Manage Billing
              </button>
              <button
                onClick={() => { setShowTicket(true); track('support_ticket_open', { source: 'billing' }) }}
                className="rounded bg-white border px-3 py-2 text-sm hover:bg-gray-50"
              >
                Submit Support Ticket
              </button>
              {!quotas.loading && (
                <div className="text-xs text-gray-600 flex items-center gap-3">
                  <span>Weekly (Basic): {quotas.basic.used}/{quotas.basic.limit}{quotas.basic.nextResetAt ? ` • resets ${new Date(quotas.basic.nextResetAt).toLocaleDateString()}` : ''}</span>
                  <span>Free included: {quotas.free.used}/{quotas.free.limit} used • {Math.max(0, quotas.free.remaining)} left</span>
                </div>
              )}
            </div>
          </div>
          {/* Support status and upsell */}
          <div className="rounded-lg border p-4 bg-white">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm text-gray-500 mb-1">Support Subscription</div>
                {support.loading ? (
                  <div className="text-sm text-gray-600">Checking status…</div>
                ) : support.active ? (
                  <div className="text-sm"><span className="inline-block rounded bg-green-100 text-green-800 px-2 py-0.5 mr-2">Active</span> Tier: <strong className="capitalize">{support.tier}</strong></div>
                ) : (
                  <div className="text-sm text-gray-700">No active Support subscription.</div>
                )}
              </div>
            </div>
            {!support.loading && !support.active && (
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => startSupportCheckout('standard')}
                  className="rounded bg-white border border-blue-300 px-3 py-2 text-sm text-blue-900 hover:bg-blue-100"
                >
                  Add Standard Support — £49/mo
                </button>
                <button
                  onClick={() => startSupportCheckout('premium')}
                  className="rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                >
                  Add Premium Support — £99/mo
                </button>
              </div>
            )}
          </div>
          {/* Ticket quotas in Billing */}
          <div className="rounded-lg border p-4 bg-white">
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => { setShowTicket(true); track('support_ticket_open', { source: 'billing' }) }}
                className="rounded bg-white border px-3 py-2 text-sm hover:bg-gray-50"
              >
                Submit Support Ticket
              </button>
              {!quotas.loading && (
                <div className="text-xs text-gray-600 flex items-center gap-3">
                  <span>Weekly (Basic): {quotas.basic.used}/{quotas.basic.limit}{quotas.basic.nextResetAt ? ` • resets ${new Date(quotas.basic.nextResetAt).toLocaleDateString()}` : ''}</span>
                  <span>Free included: {quotas.free.used}/{quotas.free.limit} used • {Math.max(0, quotas.free.remaining)} left</span>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {tab === "downloads" && (
        <section className="space-y-3">
          <p>Use the Downloads page to test entitlements and retrieve signed URLs.</p>
          <a className="inline-block bg-black text-white rounded px-3 py-2" href="/account/downloads">Go to Downloads</a>
        </section>
      )}

      {tab === "settings" && (
        <section>
          <form onSubmit={save} className="grid gap-4 max-w-xl">
            <label className="grid gap-1 text-sm">
              <span>Avatar URL</span>
              <input
                className="border rounded px-2 py-1"
                placeholder="https://..."
                value={form.avatar_url}
                onChange={(e) => setForm({ ...form, avatar_url: e.target.value })}
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span>Full name</span>
              <input
                className="border rounded px-2 py-1"
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span>Username</span>
              <input
                className="border rounded px-2 py-1"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span>Company</span>
              <input
                className="border rounded px-2 py-1"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span>Sector</span>
              <input
                className="border rounded px-2 py-1"
                value={form.sector}
                onChange={(e) => setForm({ ...form, sector: e.target.value })}
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span>Position</span>
              <input
                className="border rounded px-2 py-1"
                value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span>Website URL</span>
              <input
                className="border rounded px-2 py-1"
                placeholder="https://..."
                value={form.website_url}
                onChange={(e) => setForm({ ...form, website_url: e.target.value })}
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span>Timezone</span>
              <input
                className="border rounded px-2 py-1"
                placeholder="e.g. Europe/London"
                value={form.timezone}
                onChange={(e) => setForm({ ...form, timezone: e.target.value })}
              />
            </label>
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.marketing_opt_in}
                onChange={(e) => setForm({ ...form, marketing_opt_in: e.target.checked })}
              />
              <span>Marketing opt-in</span>
            </label>
            <label className="grid gap-1 text-sm">
              <span>Bio</span>
              <textarea
                className="border rounded px-2 py-1 min-h-24"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span>Other Info</span>
              <textarea
                className="border rounded px-2 py-1 min-h-24"
                value={form.other_info}
                onChange={(e) => setForm({ ...form, other_info: e.target.value })}
              />
            </label>
            <div className="flex items-center gap-3">
              <button type="submit" className="bg-black text-white rounded px-3 py-2" disabled={saving}>
                {saving ? "Saving…" : "Save Settings"}
              </button>
              {status && <span className="text-sm">{status}</span>}
            </div>
          </form>
        </section>
      )}
    </div>
  )
}
