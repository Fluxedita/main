import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PartnersHero } from "@/components/partners/partners-hero"
import { PartnersSections } from "@/components/partners/partners-sections"
import { PartnersCTA } from "@/components/partners/partners-cta"

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PartnersHero />
      <PartnersSections />
      <PartnersCTA />
      <Footer />
    </div>
  )
}
