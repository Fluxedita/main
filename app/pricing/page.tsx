import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PricingHero } from "@/components/pricing/pricing-hero"
import { PricingPlans } from "@/components/pricing/pricing-plans"
import { FeatureComparison } from "@/components/pricing/feature-comparison"
import { PricingCTA } from "@/components/pricing/pricing-cta"
import Link from "next/link"
import { RoiBanner } from "@/components/roi/roi-banner"
import { RoiCalculator } from "@/components/ui/roi-calculator"

export default async function PricingPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const canceled = params?.canceled === "1"
  const success = params?.success === "1"
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {(canceled || success) && (
        <div
          className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 ${
            canceled ? "text-red-800 bg-red-50" : "text-green-800 bg-green-50"
          }`}
        >
          <div className={`border rounded-md px-4 py-3 ${canceled ? "border-red-200" : "border-green-200"}`}>
            <p className="text-sm">
              {canceled ? "Checkout canceled. You can try again anytime." : "Checkout completed. If you don't see access yet, it will appear shortly."}
            </p>
          </div>
        </div>
      )}
      <PricingHero />
      <RoiBanner />
      <PricingPlans />
      <FeatureComparison />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Run the numbers</h2>
          <p className="mt-1 text-gray-600">Estimate revenue impact, build cost avoided, and payback period with our ROI calculator.</p>
        </div>
        <RoiCalculator />
      </section>
      <PricingCTA />
      <Footer />
    </div>
  )
}
