"use client"

import { Edit3, Layers, Users, BarChart3, ImageIcon, MessageSquare } from "lucide-react"
import { motion, Variants } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const features = [
  {
    icon: Edit3,
    title: "Live Page Editor",
    description:
      "Edit your website directly in the browser with real-time visual feedback. No more switching between tools or waiting for builds.",
  },
  {
    icon: Layers,
    title: "Page Control Sidebar",
    description:
      "Intuitive sidebar controls for managing layouts, sections, and components — reorder using up/down controls with instant updates.",
  },
  {
    icon: Users,
    title: "Member Management",
    description:
      "Full CRUD operations for user management with role-based access and secure authentication via Supabase integration.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Track page visits, member behavior, and engagement with clean, interactive graphs and comprehensive insights.",
  },
  {
    icon: ImageIcon,
    title: "Media Library",
    description:
      "Upload, organize, and manage all your media with Cloudinary integration for optimized delivery and storage.",
  },
  {
    icon: MessageSquare,
    title: "Comment System",
    description:
      "Premium feature allowing logged-in members to comment on media pages with full moderation tools and controls.",
  },
]

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

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
    },
  },
}

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="features" className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            All‑in‑One, Fully Guided Tools
          </motion.h2>
          <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create, manage, and scale — guided from beginner → expert. Reusable license, client handover & editability,
            and safe app‑code updates included.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className="h-6 w-6 text-blue-600" />
              </motion.div>
              <motion.h3
                className="text-xl font-semibold text-gray-900 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {feature.title}
              </motion.h3>
              <motion.p
                className="text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.4 }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
