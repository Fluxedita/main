import { HeroSlider } from "@/components/hero-slider"
import { PromoVideo } from "@/components/promo-video"
import { Features } from "@/components/features"
import { Packages } from "@/components/packages"
import { TechStack } from "@/components/tech-stack"
import { ForEveryone } from "@/components/for-everyone"
import { CTA } from "@/components/cta"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RoiBanner } from "@/components/roi/roi-banner"
import { RoiCalculator } from "@/components/ui/roi-calculator"
import { ValueSavingsSection } from "@/components/value-savings-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSlider />
      <Features />
      <TechStack />
      <PromoVideo
        videoId="ddGtaBu4GHM"
      />
      {/* Hosting-agnostic tagline banner */}
      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-md border border-gray-200 bg-gradient-to-r from-blue-50 via-white to-purple-50 p-4 text-gray-700 text-sm">
          You can deploy, manage, and host <span className="font-semibold">Fluxedita</span> using any remote services that support Next.js. Pick the providers that fit your workflow.
        </div>
      </section>
      <RoiBanner />
      <ValueSavingsSection />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Run the numbers</h2>
          <p className="mt-1 text-gray-600">Estimate revenue impact, build cost avoided, and payback period with our ROI calculator.</p>
        </div>
        <RoiCalculator />
      </section>
      <ForEveryone />
      <PromoVideo />
      <CTA />
      <Footer />
    </div>
  )
}

