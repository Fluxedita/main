import { redirect } from "next/navigation"
import Link from "next/link"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { getSupabaseAdminClient } from "@/lib/supabase/admin"
import { getStripe } from "@/lib/stripe/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

async function ensureAdmin() {
  const supabase = getSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/signin?next=/admin/members")
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle()
  if (!profile || profile.role !== "admin") redirect("/unauthorized")
  return { supabase }
}

async function loadMembers() {
  const admin = getSupabaseAdminClient()
  // Load first 50 non-admin profiles
  const { data: profiles } = await admin
    .from("profiles")
    .select("id, username, full_name, role, stripe_customer_id")
    .neq("role", "admin")
    .limit(50)

  const ids = (profiles || []).map(p => p.id)
  let entByUser = new Map<string, Array<{ slug: string; type: string; status: string }>>()
  if (ids.length > 0) {
    const { data: ents } = await admin
      .from("entitlements")
      .select("user_id, type, status, packages:package_id ( slug )")
      .in("user_id", ids)
    for (const e of ents || []) {
      const userId = (e as any).user_id as string
      const list = entByUser.get(userId) || []
      const slug = (e as any).packages?.slug ?? ""
      list.push({ slug, type: (e as any).type, status: (e as any).status })
      entByUser.set(userId, list)
    }
  }

  // Determine support package via Stripe subscriptions
  const stripe = getStripe()
  const priceStandard = process.env.STRIPE_PRICE_STANDARD_SUPPORT
  const pricePremium = process.env.STRIPE_PRICE_PREMIUM_SUPPORT

  async function getSupportTier(stripeCustomerId?: string | null) {
    if (!stripeCustomerId || (!priceStandard && !pricePremium)) return null as null | "standard" | "premium"
    try {
      const subs = await stripe.subscriptions.list({
        customer: stripeCustomerId,
        status: "all",
        expand: ["data.items.data.price"],
        limit: 50,
      })
      let tier: null | "standard" | "premium" = null
      for (const s of subs.data) {
        if (s.status === "canceled" || s.status === "incomplete_expired") continue
        for (const item of s.items.data) {
          const priceId = item.price?.id
          if (!priceId) continue
          if (pricePremium && priceId === pricePremium) { tier = "premium"; break }
          if (priceStandard && priceId === priceStandard) { tier = "standard"; break }
        }
        if (tier) break
      }
      return tier
    } catch {
      return null
    }
  }

  const rows = [] as Array<{
    id: string
    username: string | null
    full_name: string | null
    entitlements: Array<{ slug: string; type: string; status: string }>
    support_tier: null | "standard" | "premium"
  }>

  // modest concurrency
  const concurrency = 5
  let i = 0
  while (i < (profiles?.length || 0)) {
    const chunk = (profiles || []).slice(i, i + concurrency)
    const support = await Promise.all(chunk.map(p => getSupportTier(p.stripe_customer_id as any)))
    chunk.forEach((p, idx) => {
      rows.push({
        id: p.id,
        username: (p as any).username || null,
        full_name: (p as any).full_name || null,
        entitlements: entByUser.get(p.id) || [],
        support_tier: support[idx],
      })
    })
    i += concurrency
  }

  return rows
}

export default async function AdminMembersPage() {
  await ensureAdmin()
  const rows = await loadMembers()

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Members</h1>
        <Link href="/admin" className="text-sm text-blue-600 hover:underline">← Back to Admin</Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 pr-4">User ID</th>
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Username</th>
              <th className="py-2 pr-4">Support</th>
              <th className="py-2 pr-4">Entitlements</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={5} className="py-6 text-gray-500">No members found.</td></tr>
            ) : rows.map((r) => (
              <tr key={r.id} className="border-b align-top">
                <td className="py-2 pr-4 font-mono text-[12px]">
                  <Link href={`/admin/members/${r.id}`} className="text-blue-600 hover:underline">{r.id}</Link>
                </td>
                <td className="py-2 pr-4">
                  <Link href={`/admin/members/${r.id}`} className="text-blue-600 hover:underline">{r.full_name || "—"}</Link>
                </td>
                <td className="py-2 pr-4">{r.username || "—"}</td>
                <td className="py-2 pr-4">
                  {r.support_tier ? (
                    <span className={`inline-flex items-center text-xs px-2 py-0.5 rounded border ${r.support_tier === 'premium' ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-blue-50 border-blue-200 text-blue-700'}`}>
                      {r.support_tier === 'premium' ? 'Premium' : 'Standard'}
                    </span>
                  ) : <span className="text-xs text-gray-500">None</span>}
                </td>
                <td className="py-2 pr-4">
                  {r.entitlements.length === 0 ? (
                    <span className="text-xs text-gray-500">None</span>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {r.entitlements.map((e, idx) => (
                        <span key={`${e.slug}-${idx}`} className={`inline-flex items-center text-xs px-2 py-0.5 rounded border ${e.status === 'active' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                          {e.slug} · {e.type}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
