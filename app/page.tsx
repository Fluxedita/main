import { HeroSlider } from "@/components/hero-slider" // New import
import { Features } from "@/components/features"
import { Packages } from "@/components/packages"
import { TechStack } from "@/components/tech-stack"
import { ForEveryone } from "@/components/for-everyone"
import { CTA } from "@/components/cta"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSlider /> {/* Replaced Hero, Problems, and EditablePackages */}
      <Features />
      <Packages />
      <TechStack />
      <ForEveryone />
      <CTA />
      <Footer />
    </div>
  )
}
