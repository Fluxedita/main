"use client"

import { BookOpen } from "lucide-react"
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

export function DocumentationHero() {
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
                <BookOpen className="h-4 w-4" />
              </motion.div>
              <span>Comprehensive Guides</span>
            </motion.div>
          </motion.div>

          <motion.h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6" variants={itemVariants}>
            Fluxedita
            <br />
            <motion.span
              className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                scale: [1, 1.02, 1],
              }}
              transition={{
                backgroundPosition: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Documentation Hub
            </motion.span>
          </motion.h1>

          <motion.p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed" variants={itemVariants}>
            Find everything you need to get started, troubleshoot issues, and master your Fluxedita website. Our guides
            are designed for all skill levels, from beginners to advanced developers.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
