"use client"

import { Sparkles } from "lucide-react"
import { motion, Variants } from "framer-motion"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // Using cubic-bezier values for easeOutExpo
    },
  },
};

export function AboutHero() {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div className="flex justify-center mb-6" variants={itemVariants}>
            <motion.div
              className="flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4" />
              </motion.div>
              <span>Redefining Website Creation</span>
            </motion.div>
          </motion.div>

          <motion.h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6" variants={itemVariants}>
            Building the Future of
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
              Web Development
            </motion.span>
          </motion.h1>

          <motion.p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed" variants={itemVariants}>
            Our mission is to remove the friction between your creative vision and your website. We're building the
            future where anyone can create, manage, and scale beautiful websites without compromise.
          </motion.p>
          <motion.p className="text-base text-gray-600 max-w-3xl mx-auto" variants={itemVariants}>
            You can deploy, manage, and host Fluxedita using any remote services that support Next.js. Pick the providers that fit your workflow.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
