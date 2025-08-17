"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Check } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

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
        "Limited support portal access (5 tickets per week)",
      ],
      badge: "Most Popular",
    },
    {
      id: "premium",
      name: "Premium Support",
      price: "£99/mo",
      description: "Priority assistance with faster responses and expanded guidance. Email-first support during business hours.",
      features: [
        "Priority email support",
        "Response target: next business day",
        "Best-practice reviews & guidance",
        "Escalation path for critical issues",
        "Unlimited support portal access",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="py-16">
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

          {/* How Support Works */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">How Support Works</h2>
            <p className="mt-2 text-gray-600 text-center max-w-3xl mx-auto">
              We keep it simple: pick a tier, subscribe securely via Stripe, then contact us whenever you need help.
              You can upgrade, downgrade, or cancel anytime from your account.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-lg border p-5">
                <h3 className="font-semibold text-gray-900">1. Subscribe in seconds</h3>
                <p className="mt-1 text-sm text-gray-600">Use the checkout above to start your monthly plan. No long-term contracts.</p>
              </div>
              <div className="rounded-lg border p-5">
                <h3 className="font-semibold text-gray-900">2. Reach us anytime</h3>
                <p className="mt-1 text-sm text-gray-600">Email us with your questions. Premium tickets receive priority handling.</p>
              </div>
              <div className="rounded-lg border p-5">
                <h3 className="font-semibold text-gray-900">3. Manage in your account</h3>
                <p className="mt-1 text-sm text-gray-600">Access invoices and make changes to your plan from your account’s billing portal.</p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">Support FAQs</h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg border p-5">
                <h3 className="font-semibold text-gray-900">What does Standard vs Premium include?</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Standard provides email-first support during business hours with a 2 business day response target.
                  Premium adds priority handling and a next business day response target, plus expanded guidance.
                </p>
              </div>
              <div className="rounded-lg border p-5">
                <h3 className="font-semibold text-gray-900">Can I cancel anytime?</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Yes. Your subscription renews monthly. You can cancel at any time and your benefits continue until the end of the current billing period.
                </p>
              </div>
              <div className="rounded-lg border p-5">
                <h3 className="font-semibold text-gray-900">How do I manage billing and invoices?</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Head to your <Link href="/account" className="text-blue-600 hover:underline">Account</Link> to open the Billing Portal powered by Stripe. There you can update payment methods, download invoices, or change plans.
                </p>
              </div>
              <div className="rounded-lg border p-5">
                <h3 className="font-semibold text-gray-900">Is support only for Fluxedita products?</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Yes—support focuses on installation, configuration, and best practices for your Fluxedita packages and platform features.
                </p>
              </div>
            </div>
          </section>

          {/* Manage Subscription CTA */}
          <section className="mt-16 text-center">
            <h2 className="text-xl font-semibold text-gray-900">Already subscribed?</h2>
            <p className="mt-2 text-sm text-gray-600">Manage your plan, payment methods, and invoices from your account.</p>
            <div className="mt-4">
              <Link href="/account" className="inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                Go to Account
              </Link>
            </div>
          </section>

          <div className="mt-10 text-center text-xs text-gray-500">
            By subscribing, you agree to recurring monthly charges until you cancel. You can manage or cancel at
            any time in the billing portal.
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
