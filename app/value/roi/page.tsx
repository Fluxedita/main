import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { RoiCalculator } from "@/components/ui/roi-calculator"

export default function RoiPage() {
  const total = Number(process.env.NEXT_PUBLIC_LIFETIME_SLOTS_TOTAL ?? 15)
  const leftRaw = Number(process.env.NEXT_PUBLIC_LIFETIME_SLOTS_LEFT ?? total)
  const left = Math.max(0, Math.min(total, leftRaw))
  const soldOut = left === 0
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="mb-12">
          <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">Build vs. Buy</span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Fluxedita Premium ROI Calculator</h1>
          <p className="mt-3 max-w-3xl text-gray-600">
            See how quickly Fluxedita Premium pays for itself. Based on typical 2025 dev rates, building comparable functionality
            from scratch costs $121k–$243k and 6–9 months. Use the calculator to estimate your monthly revenue, the custom build
            cost you avoid, and your payback period.
          </p>
          <div className="mt-4 text-sm text-gray-500">Want the summary? <Link href="/pricing" className="text-indigo-600 hover:text-indigo-700 underline">See pricing</Link></div>
        </section>

        <section className="mb-12">
          <RoiCalculator />
        </section>

        <section className="mb-12">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <div className="text-sm font-semibold text-emerald-800">Anchor value</div>
                <div className="mt-1 text-2xl font-bold text-emerald-900">$121k–$243k+</div>
                <div className="text-emerald-900/80">Estimated custom build cost</div>
              </div>
              <div className="md:border-l md:border-emerald-200 md:pl-6">
                <div className="text-sm font-semibold text-emerald-800">Early Adopter</div>
                <div className="mt-1 text-2xl font-bold text-emerald-900">$199/mo</div>
                <div className="text-emerald-900/80">or $1,999/yr (2 months free)</div>
              </div>
              <div className="md:border-l md:border-emerald-200 md:pl-6">
                <div className="text-sm font-semibold text-emerald-800">Agency/Enterprise</div>
                <div className="mt-1 text-2xl font-bold text-emerald-900">$399/mo</div>
                <div className="text-emerald-900/80">or $3,999/yr</div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/pricing" className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-white shadow-sm hover:bg-emerald-700">See Plans</Link>
              <Link href="/contact" className="inline-flex items-center rounded-md border border-emerald-300 bg-white px-4 py-2 text-emerald-700 hover:bg-emerald-100">Talk to Sales</Link>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6 sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-300 bg-white px-3 py-1 text-xs font-medium text-orange-700">
                  🔒 Lifetime Access
                  <span className={`ml-2 rounded-full px-2 py-0.5 text-[11px] ${soldOut ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-orange-100 text-orange-800 border border-orange-200'}`}>
                    {soldOut ? 'Sold Out' : `Limited: ${left} / ${total} left`}
                  </span>
                </div>
                <h2 className="mt-3 text-2xl font-bold text-orange-900">Lifetime (Early Adopter) — $2,499 one-time</h2>
                <p className="mt-1 text-orange-900/80">All features and updates for life. Founders tier support. First {total} customers only.</p>
              </div>
              <div className="flex gap-3">
                <Link href="/pricing" className={`inline-flex items-center rounded-md px-4 py-2 text-white shadow-sm ${soldOut ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'}`} aria-disabled={soldOut}>
                  {soldOut ? 'Sold Out' : 'Claim Lifetime'}</Link>
                <Link href="/contact" className="inline-flex items-center rounded-md border border-orange-300 bg-white px-4 py-2 text-orange-700 hover:bg-orange-100">Questions? Talk to us</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold">Why build is so expensive</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-600">
              <li>Full CMS + social features (messaging, comments, likes, favourites)</li>
              <li>Premium gating, paywalls, and payments</li>
              <li>Media management, CDN, Cloudinary, processing</li>
              <li>Admin dashboard, moderation, analytics</li>
              <li>Security, CI/CD, cloud deployment, scaling</li>
            </ul>
          </div>
          <div className="rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold">Typical custom build costs</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-600">
              <li>Messaging system: $12k–$20k</li>
              <li>Paywall + payments: $12k–$24k</li>
              <li>Admin & moderation: $18k–$36k</li>
              <li>Media management: $21k–$42k</li>
              <li>Deployment & security: $12k–$24k</li>
            </ul>
            <p className="mt-3 text-sm text-gray-500">All included in Fluxedita Premium.</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold">Time-to-launch advantage</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-600">
              <li>Launch in days, not months</li>
              <li>Start growing members and revenue sooner</li>
              <li>Ongoing updates and maintenance included</li>
            </ul>
          </div>
        </section>

        <section className="mb-16 overflow-hidden rounded-2xl border border-indigo-100 bg-indigo-50 p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold text-indigo-900">A six‑figure platform’s worth of features—without the six‑figure bill.</h2>
              <p className="mt-2 text-indigo-900/80">Messaging, memberships, premium paywalls, media sets, admin controls—ready today. We handle hosting, performance, and security so you can focus on your content and community.</p>
              <div className="mt-4 flex gap-3">
                <Link href="/pricing" className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-700">See Pricing</Link>
                <Link href="/contact" className="inline-flex items-center rounded-md border border-indigo-300 bg-white px-4 py-2 text-indigo-700 hover:bg-indigo-100">Request a Demo</Link>
              </div>
            </div>
            <div className="rounded-xl border border-indigo-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-gray-900">Build vs. Fluxedita Premium</h3>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="text-gray-500">Custom build timeline</div>
                <div className="font-medium text-gray-900">6–9 months</div>
                <div className="text-gray-500">Custom build cost</div>
                <div className="font-medium text-gray-900">$121k–$243k+</div>
                <div className="text-gray-500">Fluxedita time-to-live</div>
                <div className="font-medium text-gray-900">Days</div>
                <div className="text-gray-500">Fluxedita maintenance</div>
                <div className="font-medium text-gray-900">Included</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
