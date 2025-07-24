"use client"

import {
  Rocket,
  Repeat,
  Lightbulb,
  Map,
  Code,
  Palette,
  Megaphone,
  BookOpen,
  DollarSign,
  Check,
  Mail,
  ArrowRight,
} from "lucide-react"
import { motion, Variants } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button" // Import Button component

const whyPartnerPoints = [
  {
    icon: Rocket,
    title: "High-Growth Market",
    description:
      "No-code/low-code platforms are exploding — Fluxedita merges true frontend power with visual live-editing freedom.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Repeat,
    title: "Recurring Value",
    description:
      "Our editable packages offer limitless reuse and personal scalability, appealing to creators, developers, agencies, and educators alike.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Lightbulb,
    title: "First-Mover Advantage",
    description: "Our unique live-editable section builder and media systems are unlike anything else on the market.",
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: Map,
    title: "Strong Roadmap",
    description:
      "With foundational tech built, we’re focused on partnerships that fuel growth, expansion, and monetization.",
    color: "from-orange-500 to-red-600",
  },
]

const partnershipCategories = [
  {
    id: 1,
    icon: Code,
    title: "Development & Technical Partnerships",
    points: [
      "Extend core functionality (AI tools, component libraries, integrations)",
      "Collaborate on Framer Motion/Next.js/Tailwind-powered animations, libraries and utilities",
      "Join our early dev contributors’ network to co-create modular tools",
    ],
    perfectFor: "Indie devs, agencies, plugin builders, open-source contributors",
    color: "from-blue-600 to-cyan-600",
    type: "category",
  },
  {
    id: 2,
    icon: Palette,
    title: "Design & UX Partnerships",
    points: [
      "Co-create new editable section libraries (niche, conversion-optimized, brandable)",
      "Help evolve the visual language of live site editing",
      "Design theme bundles or custom site kits for community use or sale",
    ],
    perfectFor: "UI/UX designers, motion designers, brand studios, Framer/Figma experts",
    color: "from-purple-600 to-pink-600",
    type: "category",
  },
  {
    id: 3,
    icon: Megaphone,
    title: "Marketing & Strategic Growth",
    points: [
      "Content creation (tutorials, product walkthroughs, influencer partnerships)",
      "Campaign and funnel support (paid/organic reach, SEO, YouTube content)",
      "Affiliate or white-label program collaboration",
    ],
    perfectFor: "Marketers, creators, SEO experts, SaaS launch strategists",
    color: "from-green-600 to-lime-600",
    type: "category",
  },
  {
    id: 4,
    icon: BookOpen,
    title: "Community & Education Partners",
    points: [
      "Bring Fluxedita into classrooms, bootcamps, and learning platforms",
      "Partner on certification programs for new digital skill levels",
      "Help make modern web development truly accessible to all",
    ],
    perfectFor: "Educators, YouTubers, course creators, community leaders",
    color: "from-yellow-600 to-orange-600",
    type: "category",
  },
  {
    id: 5,
    icon: DollarSign,
    title: "Investment & Financial Backing",
    points: [
      "Explore early-stage investment for platform scaling and support",
      "Discuss strategic alignments, funding rounds, or joint ventures",
      "Back a high-potential, infrastructure-level creative tool",
    ],
    perfectFor: "Angel investors, seed funds, strategic SaaS investors",
    color: "from-red-600 to-rose-600",
    type: "category",
  },
  {
    id: 6,
    icon: Mail,
    title: "Start the Conversation",
    description:
      "Ready to discuss a potential partnership? Reach out to us directly and tell us about your vision and how you see yourself contributing to Fluxedita.",
    perfectFor: "Anyone interested in collaborating with Fluxedita",
    color: "from-gray-600 to-gray-800",
    type: "cta", // New type for this card
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
    },
  },
}

export function PartnersSections() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Why Partner Section */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" variants={itemVariants}>
            Key Reasons to Partner With Fluxedita
          </motion.h2>
          <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto" variants={itemVariants}>
            Align with a platform that's shaping the future of web creation.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {whyPartnerPoints.map((point, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group cursor-pointer text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className={`w-16 h-16 bg-gradient-to-r ${point.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <point.icon className="h-8 w-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{point.title}</h3>
              <p className="text-gray-600 text-sm">{point.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Seeking Partnerships Section */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" variants={itemVariants}>
            We’re Seeking Partnerships In:
          </motion.h2>
          <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto" variants={itemVariants}>
            Explore the diverse ways you can collaborate with Fluxedita and contribute to our ecosystem.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {partnershipCategories.map((category, index) => (
            <motion.div
              key={category.id}
              className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col" // Added flex-col for consistent height
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <div className="flex items-center mb-6">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mr-4`}
                >
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
              </div>
              {category.type === "category" && (
                <>
                  <ul className="space-y-3 mb-6 flex-grow">
                    {" "}
                    {/* Added flex-grow */}
                    {category.points?.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <p className="text-gray-700">{point}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="text-sm font-semibold text-gray-800 mb-1">🛠 Perfect for:</p>
                    <p className="text-gray-600 text-sm">{category.perfectFor}</p>
                  </div>
                </>
              )}
              {category.type === "cta" && (
                <div className="flex flex-col items-center text-center flex-grow justify-center">
                  {" "}
                  {/* Added flex-grow and justify-center */}
                  <p className="text-gray-700 text-lg mb-6">{category.description}</p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="text-lg px-8 py-3" asChild>
                      <Link href="/contact">
                        <Mail className="mr-2 h-5 w-5" />
                        Contact Us
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </motion.div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 mt-6 w-full">
                    <p className="text-sm font-semibold text-gray-800 mb-1">🤝 Ideal for:</p>
                    <p className="text-gray-600 text-sm">{category.perfectFor}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
