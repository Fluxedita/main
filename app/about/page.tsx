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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <AboutHero />
      <Mission />
      <CoreValues />
      <EditablePackagesAbout /> {/* New component added here */}
      <ProblemsSolved />
      <BuiltForEveryone />
      <LiveEditingRevolution />
      <ModernArchitecture />
      <Philosophy />
      <AboutCTA />
      <Footer />
    </div>
  )
}
