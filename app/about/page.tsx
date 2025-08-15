import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about/about-hero"
import { Mission } from "@/components/about/mission"
import { CoreValues } from "@/components/about/core-values"
import { EditablePackagesAbout } from "@/components/about/editable-packages-about" // New import
import { ProblemsSolved } from "@/components/about/problems-solved"
import { BuiltForEveryone } from "@/components/about/built-for-everyone"
import { LiveEditingRevolution } from "@/components/about/live-editing-revolution"
import { ModernArchitecture } from "@/components/about/modern-architecture"
import { Philosophy } from "@/components/about/philosophy"
import { AboutCTA } from "@/components/about/about-cta"
import { RoiBanner } from "@/components/roi/roi-banner"
import { RoiCalculator } from "@/components/ui/roi-calculator"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <AboutHero />
      <Mission />
      <CoreValues />
      <EditablePackagesAbout /> {/* New component added here */}
      <ProblemsSolved />
      <RoiBanner />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Run the numbers</h2>
          <p className="mt-1 text-gray-600">Estimate revenue impact, build cost avoided, and payback period with our ROI calculator.</p>
        </div>
        <RoiCalculator />
      </section>
      <BuiltForEveryone />
      <LiveEditingRevolution />
      <ModernArchitecture />
      <Philosophy />
      <AboutCTA />
      <Footer />
    </div>
  )
}
