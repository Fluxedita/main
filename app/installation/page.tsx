import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { InstallationGuide } from "@/components/installation-guide"

export default function InstallationPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <InstallationGuide />
      <Footer />
    </div>
  )
}
