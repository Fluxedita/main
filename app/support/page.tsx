"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Check } from "lucide-react"

export default function SupportPage() {
  const { toast } = useToast()
  const [loadingTier, setLoadingTier] = useState<"standard" | "premium" | null>(null)

  async function startSupportCheckout(tier: "standard" | "premium") {
    try {
      setLoadingTier(tier)
      const res = await fetch("/api/stripe/create-support-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ tier }),
      })
      if (res.status === 401) {
        try {
          toast({
            title: "Please sign in to subscribe",
            description: "Create your account, then complete the support subscription.",
            duration: 3000,
          })
        } catch {}
        const current = typeof window !== "undefined" ? window.location.pathname : "/support"
        const nextUrl = `/signin?next=${encodeURIComponent(current)}`
        setTimeout(() => {
          window.location.href = nextUrl
        }, 1200)
        return
      }
      const data = await res.json()
      if (res.ok && data?.url) {
        // Use same-tab navigation for reliability
        window.location.href = data.url as string
      } else {
        console.error("Support checkout error", data)
        alert(data?.error || "Unable to start support checkout")
      }
    } catch (err: any) {
      console.error(err)
      alert("Unexpected error creating support checkout session")
    } finally {
      setLoadingTier(null)
    }
  }

  const tiers: Array<{
    id: "standard" | "premium"
    name: string
    price: string
    description: string
    features: string[]
    badge?: string
  }> = [
    {
      id: "standard",
      name: "Standard Support",
      price: "£49/mo",
      description: "Core assistance for growing teams. Email-first support during business hours.",
      features: [
        "Email support (business hours)",
        "Response target: 2 business days",
        "Help with configuration & usage",
        "Access to knowledge base & docs",
      ],
      badge: "Most Popular",
    },
    {
      id: "premium",
      name: "Premium Support",
      price: "£99/mo",
      description: "Priority assistance with faster responses and expanded guidance.",
      features: [
        "Priority email support",
        "Response target: next business day",
        "Best-practice reviews & guidance",
        "Escalation path for critical issues",
      ],
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
        <header className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Fluxedita Support</h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Choose the support level that fits your needs. Subscriptions are billed monthly and can be managed
            anytime from your account’s billing portal.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tiers.map((t) => (
            <Card key={t.id} className="border rounded-xl shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{t.name}</h2>
                  {t.badge ? <Badge variant="secondary">{t.badge}</Badge> : null}
                </div>
                <div className="mt-2 text-2xl font-bold">{t.price}</div>
                <p className="mt-2 text-sm text-gray-600">{t.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {t.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-emerald-600 mt-[2px]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  onClick={() => startSupportCheckout(t.id)}
                  disabled={loadingTier !== null}
                >
                  {loadingTier === t.id ? "Starting checkout…" : `Subscribe to ${t.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center text-xs text-gray-500">
          By subscribing, you agree to recurring monthly charges until you cancel. You can manage or cancel at
          any time in the billing portal.
        </div>
      </div>
    </section>
  )
}
