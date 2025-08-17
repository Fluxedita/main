"use client"

import { Button } from "@/components/ui/button"
import { Check, Star } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { easeOut } from "framer-motion"

const packages = [
  {
    id: "landing-page-package",
    name: "Landing Page Package",
    price: 49,
    description: "Perfect for single-page sites and landing pages",
    features: [
      "1 Page",
      "5+ Pre-built Sections",
      "Contact Form",
      "Basic SEO",
      "Mobile Responsive",
      "1 Year of Updates"
    ],
    cta: "Get Started",
    popular: false,
    href: "/pricing#landing-page-package"
  },
  {
    id: "root-page-package",
    name: "Root Page Package",
    price: 99,
    description: "Ideal for small business websites",
    features: [
      "3-5 Pages",
      "15+ Pre-built Sections",
      "Contact Form",
      "SEO Optimized",
      "Mobile Responsive",
      "1 Year of Updates"
    ],
    cta: "Get Started",
    popular: true,
    href: "/pricing#root-page-package"
  },
  {
    id: "multi-page-package",
    name: "Multi Page Package",
    price: 199,
    description: "For growing businesses with more content",
    features: [
      "Up to 10 Pages",
      "30+ Pre-built Sections",
      "Contact Form + Newsletter",
      "Advanced SEO",
      "Mobile Responsive",
      "1 Year of Updates"
    ],
    cta: "Get Started",
    popular: false,
    href: "/pricing#multi-page-package"
  },
  {
    id: "premium-page-package",
    name: "Premium Package",
    price: 299,
    description: "For businesses that need custom solutions",
    features: [
      "Unlimited Pages",
      "50+ Pre-built Sections",
      "Custom Development",
      "Priority Support",
      "Mobile Responsive",
      "Lifetime Updates"
    ],
    cta: "Contact Us",
    popular: false,
    href: "/pricing#premium-page-package"
  }
]

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
  hidden: { opacity: 0, y: 50, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
}

const popularBadgeVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      delay: 0.3,
      ease: easeOut,
    },
  },
}

export function Packages() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="packages" className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tiered Website Packages</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Four core packages designed to suit different stages of your web presence. All feature live front-end
            editing and modern architecture.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              className={`relative p-6 rounded-xl border-2 bg-white group cursor-pointer ${
                pkg.popular ? "border-blue-500 shadow-lg" : "border-gray-200"
              }`}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              {pkg.popular && (
                <motion.div
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                  variants={popularBadgeVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <motion.div
                    className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(59, 130, 246, 0.7)",
                        "0 0 0 10px rgba(59, 130, 246, 0)",
                        "0 0 0 0 rgba(59, 130, 246, 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Star className="h-4 w-4 mr-1" />
                    </motion.div>
                    Most Popular
                  </motion.div>
                </motion.div>
              )}

              <motion.div className="text-center mb-6">
                <motion.h3
                  className="text-2xl font-bold text-gray-900 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {pkg.name}
                </motion.h3>
                <motion.p
                  className="text-gray-600 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  {pkg.description}
                </motion.p>
              </motion.div>

              <motion.ul className="space-y-3 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + featureIndex * 0.05 + 0.5 }}
                  >
                    <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    </motion.div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                <a href={pkg.href} className="block w-full">
                  <Button
                    className={`w-full transition-all duration-300 ${
                      pkg.popular ? "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl" : "hover:shadow-md"
                    }`}
                    variant={pkg.popular ? "default" : "outline"}
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.8 }}
                    >
                      {pkg.cta} {pkg.id !== 'premium-page-package' && `- £${pkg.price}`}
                    </motion.span>
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
