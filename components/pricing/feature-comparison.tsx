"use client"

import { Check, X, ChevronDown, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import Link from "next/link"

const featureCategories = [
  {
    name: "Core Features & Functionality",
    features: [
      { name: "Live page editing with real-time preview", standard: true, root: true, multi: true, premium: true },
      { name: "Page Editor & Sidebar for easy management", standard: true, root: true, multi: true, premium: true },
      { name: "Cloudinary integration for media optimization", standard: true, root: true, multi: true, premium: true },
      { name: "Responsive design for all device types", standard: true, root: true, multi: true, premium: true },
      { name: "SEO optimized structure and meta tags", standard: true, root: true, multi: true, premium: true },
      { name: "Basic support with email assistance", standard: true, root: true, multi: true, premium: true },
      { name: "Comprehensive documentation and guides", standard: true, root: true, multi: true, premium: true },
    ],
  },
  {
    name: "Admin & Management Tools",
    features: [
      { name: "Admin console and dashboard access (admin only for Landing)", standard: true, root: true, multi: true, premium: true },
      { name: "Member management and user controls (admin only for Landing)", standard: true, root: true, multi: true, premium: true },
      { name: "Analytics dashboard and reporting tools (admin only for Landing)", standard: true, root: true, multi: true, premium: true },
    ],
  },
  {
    name: "Pages & Content Management",
    features: [
      { name: "Multiple pages and navigation systems", standard: true, root: true, multi: true, premium: true },
      { name: "Custom routing and advanced navigation", standard: true, root: true, multi: true, premium: true },
      { name: "Media library with CRUD functionality", standard: true, root: true, multi: true, premium: true },
      { name: "Member management with full CRUD operations (public/member-facing)", standard: true, root: true, multi: true, premium: true },
      { name: "Analytics dashboard with detailed insights", standard: true, root: true, multi: true, premium: true },
      { name: "Supabase integration with authentication system", standard: true, root: true, multi: true, premium: true },
      { name: "Stripe integration ready for payment processing", standard: true, root: true, multi: true, premium: true },
      { name: "Unlimited custom pages with dynamic content", standard: false, root: false, multi: true, premium: true },
      { name: "Custom slugs and advanced routing system", standard: false, root: false, multi: true, premium: true },
      { name: "Advanced page management tools and controls", standard: false, root: false, multi: true, premium: true },
      { name: "Enhanced analytics with comprehensive reporting", standard: false, root: false, multi: true, premium: true },
      { name: "Priority support with dedicated assistance", standard: false, root: false, multi: true, premium: true },
      { name: "Custom integrations and API access", standard: false, root: false, multi: true, premium: true },
      { name: "Advanced SEO tools and optimization features", standard: false, root: false, multi: true, premium: true },
    ],
  },
  {
    name: "Support & Assistance",
    features: [
      { name: "Basic email support", standard: true, root: true, multi: true, premium: true },
      { name: "Online videos & docs support", standard: true, root: true, multi: true, premium: true },
      { name: "5 free Support Ticket requests with purchase", standard: true, root: true, multi: true, premium: true },
      { name: "Additional support channels (chat/phone)", standard: false, root: false, multi: false, premium: false },
      { name: "Dedicated support (account manager)", standard: false, root: false, multi: false, premium: false },
      { name: "Onboarding & Training", standard: false, root: false, multi: false, premium: false },
      { name: "SLA & Uptime commitments", standard: false, root: false, multi: false, premium: false },
      { name: "Business Reviews", standard: false, root: false, multi: false, premium: false },
    ]
  },
  {
    name: "Premium & Media Features",
    features: [
      { name: "Media root pages (/gallery, /exclusive, /behind-the-scenes)", standard: false, root: false, multi: false, premium: true },
      { name: "Unlimited Media Sets with advanced organization", standard: false, root: false, multi: false, premium: true },
      { name: "Auto-generated media pages with dynamic content", standard: false, root: false, multi: false, premium: true },
      { name: "Lightbox & fullscreen viewing for all media", standard: false, root: false, multi: false, premium: true },
      { name: "Member commenting system with moderation tools", standard: false, root: false, multi: false, premium: true },
      { name: "Admin comments console for community management", standard: false, root: false, multi: false, premium: true },
      { name: "Advanced Cloudinary features with optimization", standard: false, root: false, multi: false, premium: true },
    ],
  },
]

const plans = [
  { id: "standard", name: "Standard", letter: "S", color: "bg-green-500" },
  { id: "root", name: "Root", letter: "R", color: "bg-blue-500" },
  { id: "multi", name: "Multi", letter: "M", color: "bg-purple-500" },
  { id: "premium", name: "Premium", letter: "P", color: "bg-orange-500" },
]

export function FeatureComparison() {
  // Track expanded/collapsed state for each category
  const [open, setOpen] = useState<boolean[]>(() => featureCategories.map(() => false))
  const [showTicketsInfo, setShowTicketsInfo] = useState(false)

  const toggle = (index: number) =>
    setOpen((prev) => prev.map((v, i) => (i === index ? !v : v)))

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Compare Plans, Confidently</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            All plans are fully guided (beginner → expert), include a reusable license for the purchaser, client handover &
            editability, and 12 months of safe app‑code updates that never overwrite your content or database. Compare
            features below to pick the right fit.
          </p>
        </div>

        <div className="space-y-4">
          {featureCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="overflow-hidden">
              <CardHeader
                className="bg-gray-100 cursor-pointer select-none"
                onClick={() => toggle(categoryIndex)}
                role="button"
                aria-expanded={open[categoryIndex]}
                aria-controls={`fc-panel-${categoryIndex}`}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900">{category.name}</CardTitle>
                  {open[categoryIndex] ? (
                    <ChevronDown className="h-5 w-5 text-gray-600" aria-hidden="true" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-600" aria-hidden="true" />
                  )}
                </div>
              </CardHeader>
              {open[categoryIndex] && (
                <CardContent id={`fc-panel-${categoryIndex}`} className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th scope="col" className="text-left py-4 px-6 font-semibold text-gray-900 min-w-[300px]">Feature</th>
                          {plans.map((plan) => (
                            <th scope="col" key={plan.id} className="text-center py-4 px-4 min-w-[120px]">
                              <div className="flex flex-col items-center">
                                <div
                                  className={`w-8 h-8 ${plan.color} rounded-full flex items-center justify-center text-white font-bold text-sm mb-1`}
                                >
                                  {plan.letter}
                                </div>
                                <span className="text-sm font-semibold text-gray-900">{plan.name}</span>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {category.features.map((feature, featureIndex) => (
                          <tr key={featureIndex} className="border-b border-gray-100 hover:bg-gray-50">
                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 text-left">
                              {feature.name.startsWith("5 free Support Ticket") ? (
                                <>
                                  5 free {" "}
                                  <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); setShowTicketsInfo(true) }}
                                    className="text-blue-600 hover:underline"
                                  >
                                    Support Ticket
                                  </button>{" "}
                                  requests with purchase
                                </>
                              ) : (
                                feature.name
                              )}
                            </th>
                            <td className="py-4 px-4 text-center">
                              {feature.standard ? (
                                <Check className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-red-400 mx-auto" />
                              )}
                            </td>
                            <td className="py-4 px-4 text-center">
                              {feature.root ? (
                                <Check className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-red-400 mx-auto" />
                              )}
                            </td>
                            <td className="py-4 px-4 text-center">
                              {feature.multi ? (
                                <Check className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-red-400 mx-auto" />
                              )}
                            </td>
                            <td className="py-4 px-4 text-center">
                              {feature.premium ? (
                                <Check className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-red-400 mx-auto" />
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {category.name === "Support & Assistance" && (
                    <div className="px-6 py-4 text-sm text-gray-600 border-t bg-white">
                      Advanced assistance (chat/phone, onboarding, SLA, reviews) is available via our Support Plans. See details on the
                      {" "}
                      <Link href="/support" className="text-blue-600 hover:underline">Support</Link>
                      {" "}
                      page.
                    </div>
                  )}
                  {category.name === "Support & Assistance" && showTicketsInfo && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                      <div className="absolute inset-0 bg-black/50" onClick={() => setShowTicketsInfo(false)} />
                      <div className="relative z-10 max-w-lg w-full bg-white rounded-lg shadow-lg border">
                        <div className="px-4 py-3 border-b flex items-center justify-between">
                          <h3 className="font-semibold">About Support Tickets</h3>
                          <button className="text-sm text-gray-600 hover:underline" onClick={() => setShowTicketsInfo(false)}>Close</button>
                        </div>
                        <div className="p-4 text-sm text-gray-700 space-y-3">
                          <p>
                            Each new purchase entitles you to <strong>5 free support ticket requests</strong>. You can submit tickets anytime from your
                            <Link href="/account" className="text-blue-600 hover:underline"> Account</Link> page.
                          </p>
                          <p>
                            Open your Account and click <em>Submit Support Ticket</em> in the Overview or Billing tab. For ongoing assistance beyond the included
                            tickets, consider our <Link href="/support" className="text-blue-600 hover:underline">Support Plans</Link>.
                          </p>
                        </div>
                        <div className="px-4 py-3 border-t flex justify-end">
                          <button onClick={() => setShowTicketsInfo(false)} className="bg-black text-white rounded px-3 py-2 text-sm">Got it</button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
