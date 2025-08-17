"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
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
  const { toast } = useToast()
  const [tab, setTab] = useState<"overview" | "downloads" | "billing" | "settings">("overview")
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const [showSupportPrompt, setShowSupportPrompt] = useState(false)
  const [support, setSupport] = useState<{ loading: boolean; active: boolean; tier: null | 'standard' | 'premium' }>({ loading: false, active: false, tier: null })
  const [showOverviewSupportBanner, setShowOverviewSupportBanner] = useState(false)

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
