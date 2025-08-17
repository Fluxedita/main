import React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const runtime = "nodejs"

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header showPromo={false} />
      <div className="min-h-screen flex flex-col pt-24">
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </div>
    </>
  )
}
