"use client"

import { useState } from "react"
import { motion, easeOut } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Info, Clock, DollarSign, CheckCircle, X } from "lucide-react"

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

interface Item {
  title: string
  time: string
  cost: string
  bullets: string[]
  details?: { title: string; points: string[] }[]
}

const ITEMS: Item[] = [
  {
    title: "Core Platform & Architecture",
    time: "3–6 weeks",
    cost: "$12,000–$30,000",
    bullets: [
      "Project planning, technical architecture, database schema design",
      "Full-stack environment setup (frontend, backend, pipelines)",
    ],
    details: [
      {
        title: "Architecture & Schema",
        points: [
          "Define data models, relationships, and indexing strategy",
          "Establish API contracts and service boundaries",
          "Select sensible defaults for performance and scalability",
        ],
      },
      {
        title: "Environment Setup",
        points: [
          "Bootstrap Next.js + API routes, auth, and middleware",
          "Configure CI/CD and environment variables",
          "Set up preview/staging and production environments",
        ],
      },
    ],
  },
  {
    title: "Authentication & Membership",
    time: "4–6 weeks",
    cost: "$12,000–$24,000",
    bullets: [
      "Secure sign-up/sign-in, social logins",
      "Profiles, avatars, role-based access (user/admin/premium)",
    ],
    details: [
      {
        title: "Auth & Providers",
        points: [
          "Email/password and OAuth provider wiring",
          "Session handling and refresh token strategy",
          "Validation, rate limits, and basic hardening",
        ],
      },
      {
        title: "Accounts & Roles",
        points: [
          "Profile fields (name, bio, avatar)",
          "Role checks in server and client components",
          "Admin and premium gating for protected routes",
        ],
      },
    ],
  },
  {
    title: "Member Interaction",
    time: "6–10 weeks",
    cost: "$22,000–$39,000",
    bullets: [
      "Real-time messaging (WebSockets)",
      "Comments, likes/favourites, content flagging",
    ],
    details: [
      {
        title: "Messaging",
        points: [
          "Channel/room model and presence indicators",
          "Optimistic updates and typing indicators",
          "Backoff/retry and connection health",
        ],
      },
      {
        title: "Engagement",
        points: [
          "Threaded comments and mentions",
          "Like/favourite counters and aggregation",
          "Report/flag flow with moderation hooks",
        ],
      },
    ],
  },
  {
    title: "Media Management",
    time: "7–12 weeks",
    cost: "$21,000–$42,000",
    bullets: [
      "Cloudinary + hosted media integration",
      "Uploads, processing (thumbs, compression), galleries & filters",
    ],
    details: [
      {
        title: "Integrations",
        points: [
          "Signed uploads and secure delivery URLs",
          "Responsive images and video transformations",
          "CDN caching and invalidation strategy",
        ],
      },
      {
        title: "UX & Organization",
        points: [
          "Drag-and-drop uploads with progress",
          "Filtering, sorting, pagination patterns",
          "Batch operations and accessibility checks",
        ],
      },
    ],
  },
  {
    title: "Dynamic Media Sets",
    time: "4–7 weeks",
    cost: "$12,000–$24,000",
    bullets: [
      "Admin creates media sets → auto-generated supporting pages",
      "Categories, tags, responsive grid & detail views",
    ],
    details: [
      {
        title: "Automation",
        points: [
          "Auto-generate list/detail pages from a schema",
          "Precompute slugs, metadata, and OG images",
          "Preview drafts and publish workflows",
        ],
      },
      {
        title: "Taxonomy & Views",
        points: [
          "Category/tag assignment and filtering",
          "Responsive grid, masonry, and detail layouts",
          "Keyboard navigation and deep linking",
        ],
      },
    ],
  },
  {
    title: "Premium Content & Payments",
    time: "4–7 weeks",
    cost: "$12,000–$24,000",
    bullets: [
      "Stripe/PayPal integration",
      "Access gating for premium-only areas",
    ],
    details: [
      {
        title: "Billing",
        points: [
          "Stripe products, prices, webhooks",
          "Trials, coupons, and proration logic",
          "Dunning and payment failure handling",
        ],
      },
      {
        title: "Gating",
        points: [
          "SSR/ISR checks for protected routes",
          "Client guards and graceful fallback UIs",
          "Audit logs for access attempts",
        ],
      },
    ],
  },
  {
    title: "Admin Panel & Moderation",
    time: "6–10 weeks",
    cost: "$18,000–$36,000",
    bullets: [
      "Full admin dashboard: users, content, media",
      "Moderation queue, analytics overview",
    ],
    details: [
      {
        title: "Admin Console",
        points: [
          "Sortable, searchable tables with bulk actions",
          "Role/permission editing and user status",
          "Content publishing and rollback",
        ],
      },
      {
        title: "Moderation & Analytics",
        points: [
          "Flag triage and resolution workflow",
          "Basic traffic and engagement dashboards",
          "Exports for BI tools",
        ],
      },
    ],
  },
  {
    title: "Deployment & Scalability",
    time: "4–7 weeks",
    cost: "$12,000–$24,000",
    bullets: [
      "Cloud hosting setup, CI/CD",
      "Performance testing, security hardening",
    ],
    details: [
      {
        title: "Delivery",
        points: [
          "CI/CD with preview deployments",
          "Environment variable management",
          "Monitoring and alerting hooks",
        ],
      },
      {
        title: "Quality & Security",
        points: [
          "Load testing and lighthouse budgets",
          "Security headers and dependency scanning",
          "Backups and recovery drills",
        ],
      },
    ],
  },
  {
    title: "Component Reusability & Accelerators",
    time: "2–4 weeks",
    cost: "$5,000–$12,000",
    bullets: [
      "Reusable sections and UI components reduce duplicate work",
      "Rapid feature delivery with prebuilt patterns and templates",
      "Consistent design system lowers QA surface area",
      "Easier long-term maintenance and iteration",
    ],
    details: [
      {
        title: "Reusable Building Blocks",
        points: [
          "Composable section components across pages",
          "Config-driven variants to avoid copy/paste",
          "Shared utilities and hooks",
        ],
      },
      {
        title: "Speed & Consistency",
        points: [
          "Reduce time-to-market for new pages",
          "Fewer regressions via standardized patterns",
          "Theming with tokens for brand changes",
        ],
      },
    ],
  },
]

export function ValueSavingsSection() {

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm text-blue-700">
          <Info className="h-4 w-4" />
          <span>Save months of build time and six-figure costs</span>
        </div>
        <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
          Time & Cost Savings with Fluxedita
        </h2>
        <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
          Fluxedita packages compress what often takes teams 6–9 months into days. Use these estimates as a guide
          for what you avoid building from scratch.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ITEMS.map((item) => (
          <motion.div
            key={item.title}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card className="h-full shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col h-full">
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-gray-600">{item.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="font-medium">Cost avoided</p>
                      <p className="text-gray-600">{item.cost}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex-1" />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      See what’s included
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white text-gray-900 p-0 overflow-visible w-full sm:max-w-[600px] min-w-[320px] min-h-[200px] border border-gray-200 rounded-lg shadow-xl z-[100]">
                    <DialogHeader className="p-6 pb-4 border-b border-gray-200 flex flex-row items-center justify-between">
                      <DialogTitle className="text-xl font-bold text-gray-900">{item.title}</DialogTitle>
                    </DialogHeader>
                    <div className="p-6 text-gray-700">
                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-blue-600" /><span className="font-medium">Time:</span> {item.time}</div>
                        <div className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-green-600" /><span className="font-medium">Cost avoided:</span> {item.cost}</div>
                      </div>
                      {item.bullets && item.bullets.length > 0 ? (
                        <ul className="space-y-2">
                          {item.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-600">Details will appear here.</p>
                      )}

                      {item.details && item.details.length > 0 && (
                        <div className="mt-6 space-y-4">
                          {item.details.map((d) => (
                            <div key={d.title}>
                              <p className="font-medium text-gray-900 flex items-center">
                                <CheckCircle className="h-5 w-5 text-green-600 mr-2" /> {d.title}
                              </p>
                              <ul className="mt-2 list-disc list-inside text-sm text-gray-700 space-y-1">
                                {d.points.map((p) => (
                                  <li key={p}>{p}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-10 rounded-lg border border-blue-100 bg-blue-50 p-4 text-blue-900"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <p className="text-sm">
          <span className="font-semibold">Key takeaway:</span> Fluxedita Premium delivers a platform worth $121k–$243k+ in
          custom development value — already live, maintained, and continuously improved.
        </p>
      </motion.div>
    </section>
  )
}
