import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductsHero } from "@/components/products/products-hero"
import { ProductPackages } from "@/components/products/product-packages"
import { TechStack } from "@/components/products/tech-stack"
import { ProductsCTA } from "@/components/products/products-cta"

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ProductsHero />
      <ProductPackages />
      <TechStack />
      <ProductsCTA />
      <Footer />
    </div>
  )
}
