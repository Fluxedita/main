"use client"

import {
  AlertCircle,
  Zap,
  Shield,
  TrendingUp,
  Palette,
  DollarSign,
  Wrench,
  Server,
  Folder,
  Users,
  Clock,
  Lock,
} from "lucide-react"
import { useState, useRef } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const problemsData = [
  {
    icon: AlertCircle,
    title: "Tool Overload & Workflow Fragmentation",
    shortProblem: "Stop switching between multiple tools and platforms?",
    shortSolution: "Fluxedita consolidates all tools into a single live-editable platform.",
    detailedPainPoint:
      "Constantly switching between website builders, code editors, CMS dashboards, media platforms, and analytics tools.",
    detailedSolution:
      "Fluxedita consolidates all tools into a single live-editable platform — everything happens in-browser, on the site.",
    color: "from-red-500 to-pink-600",
  },
  {
    icon: Zap,
    title: "Confusing & Bloated CMS Interfaces",
    shortProblem: "Confused by overwhelming and complex admin dashboards?",
    shortSolution: "Clean admin tools and visual editing simplify the entire process.",
    detailedPainPoint:
      "Traditional CMSs (e.g., WordPress) can be overwhelming, with nested menus and non-intuitive controls.",
    detailedSolution: "A clean, minimal admin interface and visual editing experience simplify the entire process.",
    color: "from-yellow-500 to-orange-600",
  },
  {
    icon: Shield,
    title: "Lack of Technical Skills",
    shortProblem: "Worried about lacking the necessary technical skills?",
    shortSolution: "If you can click and type, you can manage your website.",
    detailedPainPoint: "Many users cannot code or navigate developer-centric tools.",
    detailedSolution:
      "Intuitive, WYSIWYG-style live editing makes building and updating websites accessible to anyone who can click and type.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Palette,
    title: "Limited Creative Control",
    shortProblem: "Feeling limited by rigid templates and design constraints?",
    shortSolution: "Full layout control and reusable components enable true creative flexibility.",
    detailedPainPoint: "Drag-and-drop builders or rigid templates limit layout freedom and scalability.",
    detailedSolution:
      "Full layout control, reusable components, custom page routing, and dynamic content support enable true creative flexibility.",
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: Users,
    title: "No Built-In User or Media Management",
    shortProblem: "Struggling with disconnected user or media management systems?",
    shortSolution: "Built-in CRUD interfaces for members and media are included.",
    detailedPainPoint: "Managing members and media often requires plugins, integrations, or third-party platforms.",
    detailedSolution:
      "Built-in CRUD interfaces for members and media, including role-based access and Cloudinary-powered uploads.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: TrendingUp,
    title: "Poor Audience Insight & Feedback Tools",
    shortProblem: "Lacking real-time audience insights and feedback mechanisms?",
    shortSolution: "Real-time analytics dashboard and comment systems are integrated.",
    detailedPainPoint: "Understanding site performance and user behavior typically involves external analytics tools.",
    detailedSolution:
      "Real-time analytics dashboard and (for premium users) comment systems integrated directly into the admin console.",
    color: "from-cyan-500 to-teal-600",
  },
  {
    icon: DollarSign,
    title: "Difficulty Monetizing Content",
    shortProblem: "Facing challenges in monetizing your content or services?",
    shortSolution: "Stripe-ready payment integration makes it easy to launch paid services.",
    detailedPainPoint: "Setting up payments or membership gates can be complex and risky.",
    detailedSolution:
      "Stripe-ready payment integration and Supabase-managed membership authentication make it easy to launch paid services.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Wrench,
    title: "Developer Bottlenecks",
    shortProblem: "Are developer bottlenecks slowing down your content updates?",
    shortSolution: "Non-devs can manage pages live, freeing up developers.",
    detailedPainPoint: "Non-technical teams depend on developers for every small site change or content update.",
    detailedSolution:
      "Non-devs can manage pages and media live, while devs still have the freedom to extend and customize the platform.",
    color: "from-gray-500 to-gray-600",
  },
  {
    icon: Server,
    title: "Scalability Concerns",
    shortProblem: "Worried if your current platform can handle future growth?",
    shortSolution: "Modular architecture and tiered packages ensure scalability.",
    detailedPainPoint: "Sites built with lightweight tools often can't scale to meet business or content demands.",
    detailedSolution:
      "Modular architecture with unlimited page support, dynamic routing, and tiered packages for growing needs.",
    color: "from-lime-500 to-green-600",
  },
  {
    icon: Folder,
    title: "Disconnected Content & Media Handling",
    shortProblem: "Is your content and media scattered across different systems?",
    shortSolution: "Integrated Cloudinary support optimizes media handling.",
    detailedPainPoint: "Media is often uploaded through separate interfaces or poorly optimized for web.",
    detailedSolution:
      "Integrated Cloudinary support with optimized previews, lightbox viewers, and auto-generated media pages.",
    color: "from-indigo-500 to-purple-600",
  },
  {
    icon: Clock,
    title: "Unbeatable Value & Time Savings",
    shortProblem: "Spending countless hours coding even basic landing pages?",
    shortSolution: "Save hundreds of hours with our pre-built, live-editable solutions.",
    detailedPainPoint:
      "Traditional web development requires significant time investment in coding, even for simple landing pages, leading to high costs and slow deployment.",
    detailedSolution:
      "Fluxedita's pre-built, live-editable packages save hundreds of hours of coding, allowing you to launch professional sites in a fraction of the time and cost.",
    color: "from-teal-500 to-cyan-600",
  },
  {
    icon: Lock,
    title: "Full Ownership & Future-Proofing",
    shortProblem: "Concerned about restrictions on your purchased web assets?",
    shortSolution: "Enjoy full ownership, no restrictions, and one year of updates.",
    detailedPainPoint:
      "Many platforms impose restrictions on how you use your purchased assets or require ongoing subscriptions for updates and full functionality.",
    detailedSolution:
      "With Fluxedita, you get full ownership of your purchased package, no restrictions on multiple uses, and one year of comprehensive updates included, ensuring long-term value.",
    color: "from-rose-500 to-pink-600",
  },
]

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1] // easeOutExpo
    } 
  },
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
    },
  },
}

const detailedItemVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export function Problems() {
  const [showDetailedContent, setShowDetailedContent] = useState(false) // Controls detailed text within cards
  const [visibleCardsCount, setVisibleCardsCount] = useState(3) // Controls number of visible cards
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleToggleCards = () => {
    if (visibleCardsCount === 3) {
      setVisibleCardsCount(problemsData.length) // Show all cards
    } else {
      setVisibleCardsCount(3) // Show only first 3 cards
    }
  }

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Real-World Pain Points Solved</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We understand the frustrations of modern web development. Here's how Fluxedita eliminates the common pain
            points that slow you down.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {problemsData.slice(0, visibleCardsCount).map((item, index) => (
              <motion.div
                key={item.title} // Use a unique key for AnimatePresence
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="pb-0">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mb-4`}
                    >
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900 mb-2">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 pt-4">
                    <AnimatePresence mode="wait">
                      {showDetailedContent ? (
                        <motion.div
                          key="detailed"
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={detailedItemVariants}
                        >
                          <p className="text-gray-700 font-medium mb-2">❌ Pain Point:</p>
                          <p className="text-gray-600 text-sm">{item.detailedPainPoint}</p>
                          <p className="text-gray-700 font-medium mt-3 mb-2">✅ Fluxedita Solution:</p>
                          <p className="text-gray-600 text-sm">{item.detailedSolution}</p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="short"
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={detailedItemVariants}
                        >
                          <p className="text-gray-600 text-sm mb-2">{item.shortProblem}</p>
                          <p className="text-gray-600 text-sm">{item.shortSolution}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            onClick={handleToggleCards}
            className="text-lg px-8 py-3 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
          >
            {visibleCardsCount === 3 ? "Show More" : "Show Less"}
          </Button>
          {visibleCardsCount > 3 && ( // Only show this button if all cards are visible
            <Button
              variant="outline"
              onClick={() => setShowDetailedContent(!showDetailedContent)}
              className="text-lg px-8 py-3 border-blue-600 text-blue-600 hover:bg-blue-50 ml-4"
            >
              {showDetailedContent ? "Show Less Detail" : "Show More Detail"}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
