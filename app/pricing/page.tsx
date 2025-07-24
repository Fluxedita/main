import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PricingHero } from "@/components/pricing/pricing-hero"
import { PricingPlans } from "@/components/pricing/pricing-plans"
import { FeatureComparison } from "@/components/pricing/feature-comparison"
import { PricingCTA } from "@/components/pricing/pricing-cta"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PricingHero />
      <PricingPlans />
      <FeatureComparison />
      <PricingCTA />
      <Footer />
    </div>
  )
}
