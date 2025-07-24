import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HelpPage } from "@/components/help-page"

export default function Help() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HelpPage />
      <Footer />
    </div>
  )
}
