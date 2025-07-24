"use client"

import { Handshake } from "lucide-react"
import { motion, Variants } from "framer-motion"

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

export function PartnersHero() {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div className="flex justify-center mb-6" variants={itemVariants}>
            <motion.div
              className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Handshake className="h-4 w-4" />
              </motion.div>
              <span>Join Our Journey</span>
            </motion.div>
          </motion.div>

          <motion.h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6" variants={itemVariants}>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Partnership Opportunities
            </span>
            <br />
            at Fluxedita
          </motion.h1>

          <motion.p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed" variants={itemVariants}>
            Join us in redefining how the world builds websites. Fluxedita is more than a product — it’s a movement
            toward effortless, empowering, and fully editable web creation. We’ve built the engine. Now, we’re inviting
            visionary partners to help scale it into a category-defining platform.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
