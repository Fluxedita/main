"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Code, Palette } from "lucide-react"
import { motion, easeOut } from "framer-motion"

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

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
}

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
}

const techIconVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
}

export function Hero() {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div className="flex justify-center mb-6" variants={badgeVariants}>
            <motion.div
              className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Zap className="h-4 w-4" />
              </motion.div>
              <span>Welcome to the Future of Website Creation</span>
            </motion.div>
          </motion.div>

          <motion.h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6" variants={itemVariants}>
            <motion.span
              className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              FluxEdita
            </motion.span>
            <br />
            Live-Editable Web Platform
          </motion.h1>

          <motion.p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed" variants={itemVariants}>
            Empowers anyone — from beginners to developers — to design, update, and manage modern websites directly in
            the browser. No external builders. No confusing CMS dashboards. Just powerful, intuitive editing and full
            control at your fingertips.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center mb-12" variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="text-lg px-8 py-3 relative overflow-hidden group">
                <a href="/pricing" className="relative z-10 flex items-center">
                  <span>Start Building Now</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.div>
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent hover:bg-blue-50">
                <a href="/products">View Demo</a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500"
            variants={containerVariants}
          >
            {[
              { icon: Code, text: "Next.js & React" },
              { icon: Palette, text: "Tailwind CSS" },
              { icon: Zap, text: "Framer Motion" },
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-2"
                variants={techIconVariants}
                whileHover={{ scale: 1.1, color: "#3B82F6" }}
              >
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                >
                  <tech.icon className="h-4 w-4" />
                </motion.div>
                <span>{tech.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
