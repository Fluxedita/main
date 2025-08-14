"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Check, X, Zap, Users, Building, Crown } from "lucide-react"
import { motion, easeOut } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export const plans = [
  {
    id: "landing-page-package",
    name: "Landing Page Package",
    subtitle: "Launch your online presence with a single, stunning landing page design.",
    price: "£99",
    period: "One-time payment",
    icon: Zap,
    color: "from-gray-400 to-gray-600",
    badge: "💡 Quick Launch",
    badgeDesc: "Get online in minutes with professional design",
    included: [
      "Live page editing with real-time preview",
      "Page Editor & Sidebar for easy management",
      "Cloudinary integration for media optimization",
      "Responsive design for all device types",
      "SEO optimized structure and meta tags",
      "Email support (24-48h response time)",
      "Access to community forum",
      "Comprehensive documentation and guides",
      "Admin console and dashboard access",
      "Basic analytics and reporting tools",
      "Unlimited page length with unlimited sections"
    ],
    // Sitewide value props
    includedExtras: [
      "Fully guided onboarding and live documentation",
      "Client handover & editability built-in",
      "Reusable license for purchaser (non-transferable)",
      "12 months of safe app‑code updates (never overwrites your content or database)",
    ],
    notIncluded: [
      "Priority support options",
      "Phone or live chat support",
      "Dedicated account manager",
      "Custom development work",
      "Advanced analytics",
      "Premium integrations",
      "24/7 support availability"
    ],
    cta: "Get Started",
    ctaVariant: "outline",
    popular: false,
    recommended: false,
    href: "/contact?package=landing-page-package",
    features: [
      "Fully editable landing page with live preview",
      "Live page editing & section control system",
      "Page Editor & Sidebar included for easy management",
      "Cloudinary media integration (plug in your environment)",
      "Responsive design optimization for all devices",
      "SEO-ready structure and meta tag management",
      "Basic analytics and performance tracking",
      "Email support and comprehensive documentation",
    ],
    perfectFor: [
      "Marketing campaigns",
      "Product launches",
      "Personal portfolios",
      "Minimal web presence",
      "Event promotions",
      "Quick online setup",
    ],
    valueProposition: {
      title: "Exceptional Value: Unlimited Reusability",
      text: "This package offers **unlimited reusability by the purchaser** across any number of your own projects, **plus 12 months of safe app‑code updates** that never overwrite your content or database. Build once, deploy many times. License is non‑transferable.",
    },
    previewDescription: "Single page design with live editing capabilities and intuitive controls for immediate results",
    imagePlaceholder: "https://res.cloudinary.com/dv9g1csum/image/upload/v1753705261/zihuggjouxnyhkagv4no.png",
    exampleUrl: "https://custom-landingpage-package.vercel.app/",
    paymentLink: "https://buy.stripe.com/5kQbJ11gEdXd0aJ5n0eEo00",
  },
  {
    id: "root-page-package",
    name: "Root Page Package",
    subtitle: "Grow your business with essential features and integrations.",
    price: "£299",
    period: "One-time payment",
    icon: Users,
    color: "from-blue-500 to-blue-600",
    badge: "🏆 Best Value",
    badgeDesc: "Most features for the price with comprehensive tools",
    popular: true,
    included: [
      "Live page editing with real-time preview",
      "Page Editor & Sidebar for easy management",
      "Cloudinary integration for media optimization",
      "Responsive design for all device types",
      "SEO optimized structure and meta tags",
      "Basic support with email assistance",
      "Comprehensive documentation and guides",
      "Admin console and dashboard access (admin only)",
      "Member management and user controls (admin only)",
      "Analytics dashboard and reporting tools (admin only)",
      // Standard-specific features
      "Multiple pages and navigation systems (Home page, /Products/Main page, /about page, contact page, and admin/legal pages included)",
      "Custom routing and advanced navigation",
      "Media library with CRUD functionality",
      "Member management with full CRUD operations (public/member-facing)",
      "Analytics dashboard with detailed insights",
      "Supabase integration with authentication system",
      "Stripe integration ready for payment processing",
    ],
    includedExtras: [
      "Fully guided onboarding and live documentation",
      "Client handover & editability built-in",
      "Reusable license for purchaser (non-transferable)",
      "12 months of safe app‑code updates (never overwrites your content or database)",
    ],
    notIncluded: [
      "Unlimited custom pages with dynamic content",
      "Advanced page management tools and controls",
      "Priority support with dedicated assistance",
      "Custom integrations and API access",
      "Advanced SEO tools and optimization features",
      "Media root pages and gallery systems",
      "Member comments and interaction systems",
      "Advanced media tools and processing",
    ],
    features: [
      "Fully editable Home page, Products/Main page, about page, contact page with live preview",
      "Live page editing & section control system",
      "Page Editor & Sidebar included for easy management",
      "Cloudinary media integration (plug in your environment)",
      "Responsive design optimization for all devices",
      "SEO-ready structure and meta tag management",
      "Basic analytics and performance tracking",
      "Email support and comprehensive documentation",
    ],
    perfectFor: [
      "Marketing campaigns",
      "Product launches",
      "Personal portfolios",
      "Minimal web presence",
      "Event promotions",
      "Quick online setup",
    ],
    valueProposition: {
      title: "Exceptional Value: Unlimited Reusability",
      text: "This package offers **unlimited reusability by the purchaser** across any number of your own projects, **plus 12 months of safe app‑code updates** that never overwrite your content or database. Build once, deploy many times, saving countless hours and costs. This license is non-transferable.",
    },
    previewDescription: "Root pages design with live editing capabilities and intuitive controls for immediate results",
    imagePlaceholder: "https://res.cloudinary.com/dv9g1csum/image/upload/v1753705262/jnqzrqvxh3kg92q6mcik.png",
    exampleUrl: "https://custom-rootpage-package.vercel.app/",
    paymentLink: "https://buy.stripe.com/5kQbJ1e3q3ize1z02GeEo01",
  },
  {
    id: "multi-page-package",
    name: "Multi Page Package",
    subtitle: "Scale your operations with advanced management and customization.",
    price: "£599",
    period: "One-time payment",
    icon: Building,
    color: "from-purple-500 to-purple-600",
    badge: "🚀 Scale Ready",
    badgeDesc: "Grows with your business and expanding needs",
    included: [
      "Live page editing with real-time preview",
      "Page Editor & Sidebar for easy management",
      "Cloudinary integration for media optimization",
      "Responsive design for all device types",
      "SEO optimized structure and meta tags",
      "Basic support with email assistance",
      "Comprehensive documentation and guides",
      "Admin console and dashboard access (admin only)",
      "Member management and user controls (admin only)",
      "Analytics dashboard and reporting tools (admin only)",
      // Standard features
      "Multiple pages and navigation systems",
      "Custom routing and advanced navigation",
      "Media library with CRUD functionality",
      "Member management with full CRUD operations (public/member-facing)",
      "Analytics dashboard with detailed insights",
      "Supabase integration with authentication system",
      "Stripe integration ready for payment processing",
      // Advanced-specific features
      "Unlimited custom pages with dynamic content",
      "Custom slugs and advanced routing system",
      "Advanced page management tools and controls",
      "Enhanced analytics with comprehensive reporting",
      "Priority support with dedicated assistance",
      "Custom integrations and API access",
      "Advanced SEO tools and optimization features",
    ],
    includedExtras: [
      "Fully guided onboarding and live documentation",
      "Client handover & editability built-in",
      "Reusable license for purchaser (non-transferable)",
      "12 months of safe app‑code updates (never overwrites your content or database)",
    ],
    notIncluded: [
      "Media root pages and gallery systems",
      "Member comments and interaction systems",
      "Advanced media tools and processing",
    ],
    features: [
      "Fully editable Home page, Products/Main page, about page, contact page with live preview",
      "Custom Page/s creation, create unlimited with dynamic navbar link updates with live preview",
      "Live page editing & section control system",
      "Page Editor & Sidebar included for easy management",
      "Cloudinary media integration (plug in your environment)",
      "Responsive design optimization for all devices",
      "SEO-ready structure and meta tag management",
      "Basic analytics and performance tracking",
      "Email support and comprehensive documentation",
    ],
    perfectFor: [
      "Marketing campaigns",
      "Product launches",
      "Personal portfolios",
      "Minimal web presence",
      "Event promotions",
      "Quick online setup",
    ],
    valueProposition: {
      title: "Exceptional Value: Unlimited Reusability",
      text: "This package offers **unlimited reusability by the purchaser** across any number of your own projects, **plus 12 months of safe app‑code updates** that never overwrite your content or database. Build once, deploy many times, saving countless hours and costs. This license is non-transferable.",
    },
    previewDescription: "Multi page design with live editing capabilities and intuitive controls for immediate results",
    imagePlaceholder: "https://res.cloudinary.com/dv9g1csum/image/upload/v1753705261/jyamglihxgcue2o9sock.png",
    exampleUrl: "https://custom-multipage-package.vercel.app/",
    paymentLink: "https://buy.stripe.com/7sYcN58J61ar4qZeXAeEo02",
  },
  {
    id: "premium-page-package",
    name: "Premium Page Package",
    subtitle: "Unlock the full potential with complete creative control and support.",
    price: "£999",
    period: "One-time payment",
    icon: Crown,
    color: "from-orange-500 to-red-600",
    badge: "⭐ Full Power",
    badgeDesc: "Everything included with no limitations or restrictions",
    premium: true,
    included: [
      "Live page editing with real-time preview",
      "Page Editor & Sidebar for easy management",
      "Cloudinary integration for media optimization",
      "Responsive design for all device types",
      "SEO optimized structure and meta tags",
      "Basic support with email assistance",
      "Comprehensive documentation and guides",
      "Multiple pages and navigation systems",
      "Admin console and dashboard access",
      "Member management and user controls",
      "Analytics dashboard and reporting tools",
      "Custom routing and advanced navigation",
      // Premium exclusive features below
      "Media root pages (/gallery, /exclusive, /behind-the-scenes)",
      "Unlimited Media Sets with advanced organization",
      "Auto-generated media pages with dynamic content",
      "Lightbox & fullscreen viewing for all media",
      "Member commenting system with moderation tools",
      "Admin comments console for community management",
      "Advanced Cloudinary features with optimization",
    ],
    includedExtras: [
      "Fully guided onboarding and live documentation",
      "Client handover & editability built-in",
      "Reusable license for purchaser (non-transferable)",
      "12 months of safe app‑code updates (never overwrites your content or database)",
    ],
    premiumBenefits: [
      "This package includes absolutely everything available",
      "No feature limitations or usage restrictions",
      "Complete platform access with all capabilities",
      "All future updates and features included",
      "Dedicated account manager for personalized support",
      "Custom development support for unique requirements",
      "Enterprise-level support with priority response",
      "Unlimited customizations and brand integration",
    ],
    features: [
      "Fully editable Home page, /Products/Main page, /about page, contact page with live preview",
      "Custom Page/s creation, create unlimited with dynamic navbar link updates with live preview",
      "Live page editing & section control system",
      "Page Editor & Sidebar included for easy management",
      "Cloudinary media integration (plug in your environment)",
      "Responsive design optimization for all devices",
      "SEO-ready structure and meta tag management",
      "Basic analytics and performance tracking",
      "Email support and comprehensive documentation",
      "Custom routing and advanced navigation",
      "Media root pages (/gallery, /exclusive, /behind-the-scenes)",
      "Unlimited Media Sets with advanced organization2",
      "Auto-generated media pages with dynamic content",
      "Lightbox & fullscreen viewing for all media",
      "Member commenting system with moderation tools",
      "Admin comments console for community management",
    ],
    perfectFor: [
      "Marketing campaigns",
      "Product launches",
      "Personal portfolios",
      "Minimal web presence",
      "Event promotions",
      "Quick online setup",
    ],
    valueProposition: {
      title: "Exceptional Value: Unlimited Reusability",
      text: "This package offers **unlimited reusability by the purchaser** across any number of your own projects, **plus 12 months of safe app‑code updates** that never overwrite your content or database. Build once, deploy many times, saving countless hours and costs. This license is non-transferable.",
    },
    previewDescription: "Premium creative suite with live editing and advanced media features",
    imagePlaceholder: "/multi_page_placeholder.png",
    exampleUrl: "#",
    paymentLink: "#",
  },
]

export type Plan = typeof plans[number];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
}

const priceVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
}

export function PricingPlans() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [allExpanded, setAllExpanded] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full h-full max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {plans.map((plan, index) => {
            const featuresToShow = !allExpanded ? plan.included.slice(0, 3) : plan.included;
            return (
              <motion.div key={plan.id} variants={cardVariants} className="min-w-0 w-full flex h-full">
                <Card
                  className={`w-full mx-auto flex-1 flex flex-col h-full relative overflow-hidden group cursor-pointer transition-all duration-300 ${
                    plan.popular
                      ? "border-2 border-blue-500 shadow-xl lg:scale-105"
                      : "border border-gray-200 hover:border-blue-300 hover:shadow-lg"
                  }`}
                >
                  {plan.popular && (
                    <motion.div
                      className="absolute top-0 left-0 right-0 bg-blue-500 text-white text-center py-2 text-sm font-medium"
                      initial={{ y: -100 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    >
                      <motion.span
                        animate={{
                          textShadow: [
                            "0 0 0px rgba(255,255,255,0.5)",
                            "0 0 10px rgba(255,255,255,0.8)",
                            "0 0 0px rgba(255,255,255,0.5)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        Most Popular
                      </motion.span>
                    </motion.div>
                  )}

                  <CardHeader className={`${plan.popular ? "pt-12" : "pt-6"} pb-4 px-4 sm:px-6`}>
                    <div className="text-center">
                      <motion.div
                        className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center cursor-pointer`}
                        whileHover={{
                          rotate: 360,
                          scale: 1.1,
                        }}
                        transition={{ duration: 0.5 }}
                        onClick={() => {
                          setSelectedPlan(plan)
                          setModalOpen(true)
                        }}
                        aria-label={`Select ${plan.name} package`}
                        tabIndex={0}
                        role="button"
                      >
                        <plan.icon className="h-8 w-8 text-white" />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        <Badge variant="secondary" className="mb-3 text-xs">
                          {plan.badge}
                        </Badge>
                      </motion.div>

                      <motion.h3
                        className="text-2xl font-bold text-gray-900 mb-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        {plan.name}
                      </motion.h3>
                      <motion.p
                        className="text-gray-600 text-sm mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                      >
                        {plan.subtitle}
                      </motion.p>

                      <motion.div
                        className="mb-4"
                        variants={priceVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        <motion.span
                          className="text-4xl font-bold text-gray-900"
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                        >
                          {plan.price}
                        </motion.span>
                        <p className="text-gray-500 text-sm mt-1">{plan.period}</p>
                      </motion.div>

                      <motion.p
                        className="text-xs text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.6 }}
                      >
                        {plan.badgeDesc}
                      </motion.p>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6 pb-6 flex-1 flex flex-col">
                    <div className="space-y-6 flex-1 flex flex-col">
                      <div>
                        <h4 className="font-semibold text-green-700 mb-3 text-sm">✅ Included Features:</h4>
                        <ul className="space-y-2">
                          {featuresToShow.map((feature, featureIndex) => (
                            <motion.li
                              key={featureIndex}
                              className="flex items-start text-sm"
                              initial={{ opacity: 0, x: -20 }}
                              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                              transition={{ delay: index * 0.1 + featureIndex * 0.03 + 0.7 }}
                            >
                              <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
                                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              </motion.div>
                              <span className="text-gray-700">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                        {allExpanded && plan.includedExtras && (
                          <div className="mt-5">
                            <h5 className="font-semibold text-blue-700 mb-2 text-sm">📦 Platform Essentials:</h5>
                            <ul className="space-y-2">
                              {plan.includedExtras.map((extra, extraIndex) => (
                                <motion.li
                                  key={extraIndex}
                                  className="flex items-start text-sm"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                  transition={{ delay: index * 0.1 + extraIndex * 0.03 + 0.9 }}
                                >
                                  <Check className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700">{extra}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      {/* Only show the rest of the card if expanded */}
                      {allExpanded && (
                        <>
                          {plan.premiumBenefits && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                              transition={{ delay: index * 0.1 + 1 }}
                            >
                              <h4 className="font-semibold text-orange-700 mb-3 text-sm">🌟 Premium Benefits:</h4>
                              <ul className="space-y-2">
                                {plan.premiumBenefits.map((benefit, benefitIndex) => (
                                  <motion.li
                                    key={benefitIndex}
                                    className="flex items-start text-sm"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                    transition={{ delay: index * 0.1 + benefitIndex * 0.03 + 1.2 }}
                                  >
                                    <motion.div
                                      animate={{ rotate: [0, 360] }}
                                      transition={{
                                        duration: 3,
                                        repeat: Number.POSITIVE_INFINITY,
                                        delay: benefitIndex * 0.2,
                                      }}
                                    >
                                      <Check className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                                    </motion.div>
                                    <span className="text-gray-700">{benefit}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                          {plan.notIncluded && (
                            <div>
                              <h4 className="font-semibold text-red-700 mb-3 text-sm">❌ Not Included:</h4>
                              <ul className="space-y-2">
                                {plan.notIncluded.map((feature, featureIndex) => (
                                  <motion.li
                                    key={featureIndex}
                                    className="flex items-start text-sm"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                    transition={{ delay: index * 0.1 + featureIndex * 0.03 + 1.5 }}
                                  >
                                    <X className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-500">{feature}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <motion.div
                            className="mt-auto"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: index * 0.1 + 1.8 }}
                          >
                            <Button
                              className={`w-full py-4 text-base relative overflow-hidden group ${
                                plan.popular
                                  ? "bg-blue-600 hover:bg-blue-700"
                                  : plan.premium
                                    ? `bg-gradient-to-r ${plan.color} hover:opacity-90`
                                    : ""
                              }`}
                              variant={plan.popular || plan.premium ? "default" : "outline"}
                              onClick={() => {
                                setSelectedPlan(plan)
                                setModalOpen(true)
                              }}
                            >
                              <motion.div
                                className="absolute inset-0 bg-white/20"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.5 }}
                              />
                              <span className="relative z-10 px-4 py-2">Get Started</span>
                            </Button>
                          </motion.div>
                        </>
                      )}
                      {plan.included.length > 3 && (
                        <div className="mt-4 flex justify-center">
                          <button
                            className="text-blue-600 hover:underline text-sm font-medium focus:outline-none"
                            onClick={() => setAllExpanded((prev) => !prev)}
                          >
                            {allExpanded ? "Show Less" : `Show More (${plan.included.length - 3} more)`}
                          </button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
        {/* Modal Dialog for Plan Confirmation */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="w-[95vw] max-w-lg max-h-[90vh] overflow-y-auto">
            {selectedPlan && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold mb-2">{selectedPlan.name} Package</DialogTitle>
                  <div className="text-gray-600 mb-2">{selectedPlan.subtitle}</div>
                  <div className="text-3xl font-bold text-gray-900 mb-4">{selectedPlan.price}</div>
                </DialogHeader>
                <div className="mb-4">
                  <h4 className="font-semibold text-green-700 mb-2 text-sm">Included Features:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                    {selectedPlan.included.map((feature: string, i: number) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
                {selectedPlan.includedExtras && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-blue-700 mb-2 text-sm">Platform Essentials:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                      {selectedPlan.includedExtras.map((extra: string, i: number) => (
                        <li key={i}>{extra}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedPlan.notIncluded && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-red-700 mb-2 text-sm">❌ Not Included:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-500 text-sm">
                      {selectedPlan.notIncluded.map((feature: string, i: number) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <DialogFooter>
                  {/* Replace '#' with the Stripe Payment Link for this plan when available */}
                  <Button asChild className="w-full">
                    <a href={selectedPlan.paymentLink} target="_blank" rel="noopener noreferrer">
                      Proceed to Payment
                    </a>
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
