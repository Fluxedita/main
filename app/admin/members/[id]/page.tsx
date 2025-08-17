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
}

async function loadMember(id: string) {
  const admin = getSupabaseAdminClient()
  const { data: profile } = await admin
    .from("profiles")
    .select("id, username, full_name, role, stripe_customer_id, timezone, company, sector, position, website_url, avatar_url")
    .eq("id", id)
    .maybeSingle()

  if (!profile) return null

  const { data: entitlements } = await admin
    .from("entitlements")
    .select("type, status, created_at, packages:package_id ( slug )")
    .eq("user_id", id)
    .order("created_at", { ascending: false })

  const packages = (entitlements || []).map((e: any) => ({
    slug: e.packages?.slug ?? "",
    type: e.type as string,
    status: e.status as string,
    created_at: e.created_at as string,
  }))

  // Recent support tickets
  const { data: tickets } = await admin
    .from("support_tickets")
    .select("id, subject, status, created_at, updated_at")
    .eq("user_id", id)
    .order("updated_at", { ascending: false })
    .limit(5)

  // Support tier via Stripe
  const stripe = getStripe()
  const priceStandard = process.env.STRIPE_PRICE_STANDARD_SUPPORT
  const pricePremium = process.env.STRIPE_PRICE_PREMIUM_SUPPORT
  let support_tier: null | "standard" | "premium" = null
  try {
    if (profile.stripe_customer_id && (priceStandard || pricePremium)) {
      const subs = await stripe.subscriptions.list({
        customer: profile.stripe_customer_id,
        status: "all",
        expand: ["data.items.data.price"],
        limit: 50,
      })
      for (const s of subs.data) {
        if (s.status === "canceled" || s.status === "incomplete_expired") continue
        for (const item of s.items.data) {
          const priceId = item.price?.id
          if (!priceId) continue
          if (pricePremium && priceId === pricePremium) { support_tier = "premium"; break }
          if (priceStandard && priceId === priceStandard) { support_tier = "standard"; break }
        }
        if (support_tier) break
      }
    }
  } catch {}

  return { profile, packages, tickets: tickets || [], support_tier }
}

export default async function AdminMemberDetail({ params }: { params: Promise<{ id: string }> }) {
  await ensureAdmin()
  const { id } = await params
  const data = await loadMember(id)
  if (!data) redirect("/admin/members")

  const { profile, packages, tickets, support_tier } = data

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Member · {profile.full_name || profile.username || profile.id}</h1>
        <Link href="/admin/members" className="text-sm text-blue-600 hover:underline">← Back to Members</Link>
      </div>

      <section className="mb-8 grid sm:grid-cols-2 gap-4">
        <div className="rounded border bg-white p-4">
          <h2 className="font-semibold mb-2">Profile</h2>
          <div className="flex items-start gap-4 mb-3">
            {profile.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.avatar_url} alt={profile.full_name || profile.username || 'Avatar'} className="h-12 w-12 rounded-full object-cover border" />
            ) : (
              <div className="h-12 w-12 rounded-full bg-gray-200 border flex items-center justify-center text-gray-600 text-sm">{(profile.full_name || profile.username || '?').slice(0,1).toUpperCase()}</div>
            )}
          </div>
          <div className="text-sm grid gap-1">
            <div><span className="text-gray-500">User ID:</span> <span className="font-mono text-[12px]">{profile.id}</span></div>
            <div><span className="text-gray-500">Name:</span> {profile.full_name || "—"}</div>
            <div><span className="text-gray-500">Username:</span> {profile.username || "—"}</div>
            <div><span className="text-gray-500">Company:</span> {profile.company || "—"}</div>
            <div><span className="text-gray-500">Position:</span> {profile.position || "—"}</div>
            <div><span className="text-gray-500">Website:</span> {profile.website_url ? (<a href={profile.website_url} target="_blank" className="text-blue-600 underline">{profile.website_url}</a>) : "—"}</div>
          </div>
        </div>
        <div className="rounded border bg-white p-4">
          <h2 className="font-semibold mb-2">Support</h2>
          {support_tier ? (
            <span className={`inline-flex items-center text-xs px-2 py-0.5 rounded border ${support_tier === 'premium' ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-blue-50 border-blue-200 text-blue-700'}`}>
              {support_tier === 'premium' ? 'Premium' : 'Standard'}
            </span>
          ) : <span className="text-sm text-gray-500">None</span>}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="font-semibold mb-2">Entitlements</h2>
        {packages.length === 0 ? (
          <div className="text-sm text-gray-500">None</div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {packages.map((e, i) => (
              <span key={`${e.slug}-${i}`} className={`inline-flex items-center text-xs px-2 py-0.5 rounded border ${e.status === 'active' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                {e.slug} · {e.type}
              </span>
            ))}
          </div>
        )}
        <div className="mt-3">
          <Link href="/admin/entitlements" className="text-sm text-blue-600 underline">Manage entitlements</Link>
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-2">Recent Tickets</h2>
        {tickets.length === 0 ? (
          <div className="text-sm text-gray-500">No tickets.</div>
        ) : (
          <ul className="grid gap-2">
            {tickets.map((t: any) => (
              <li key={t.id} className="rounded border p-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">
                    <Link href={`/admin/messages/${t.id}`} className="hover:underline">{t.subject || `Ticket #${t.id}`}</Link>
                  </div>
                  <div className="text-xs text-gray-500">Updated {new Date(t.updated_at).toLocaleString()}</div>
                </div>
                <div className={`text-xs px-2 py-1 rounded border ${t.status === 'closed' ? 'bg-red-50 border-red-200 text-red-700' : t.status === 'ready' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-700'}`}>{t.status}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
