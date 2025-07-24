"use client"

import { Edit3, Layers, Repeat, Layout, Sparkles, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { easeOut } from "framer-motion"

const packageBenefits = [
  {
    icon: Edit3,
    title: "Live-Editable in the Browser",
    description: "Make changes instantly and visually, seeing results in real-time without waiting for builds.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Layers,
    title: "Fully Scalable",
    description: "Build from a single landing page to complex, multi-page site structures with ease and confidence.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Layout,
    title: "Modular & Customizable",
    description: "Mix and match sections like Hero, Sliders, Galleries, and Features to create unique layouts.",
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: Repeat,
    title: "Reusable Across Unlimited Projects",
    description: "No usage caps or license friction – deploy your designs on any number of unique sites.",
    color: "from-orange-500 to-red-600",
  },
  {
    icon: Sparkles,
    title: "Uniquely Designed",
    description: "Leverage Fluxedita’s one-of-a-kind sections to ensure no two sites ever look the same.",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: Clock,
    title: "Massive Time Advantage",
    description: "Launch professional, fully editable websites in minutes, saving countless hours of manual coding.",
    color: "from-teal-500 to-cyan-600",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
}

export function EditablePackagesAbout() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" variants={itemVariants}>
            Fluxedita Editable Web Packages
          </motion.h2>
          <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8" variants={itemVariants}>
            Build Once, Edit Forever. <span className="font-semibold text-blue-600">Live. Visual. Scalable.</span>
          </motion.p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.p className="text-lg text-gray-700 mb-6 leading-relaxed" variants={itemVariants}>
            Why spend hours, days, or even weeks coding from scratch — again and again — when you can launch fully
            editable, beautifully structured websites in minutes?
          </motion.p>
          <motion.p className="text-lg text-gray-700 mb-8 leading-relaxed" variants={itemVariants}>
            With Fluxedita, you’re not buying a single landing page, or just one multipage layout. You're unlocking an
            unlimited, endlessly reusable design system — each package a launchpad for any number of unique, fully
            editable sites.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {packageBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.08)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="h-full flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="bg-white p-8 rounded-xl shadow-xl border border-blue-100">
            <p className="text-lg text-gray-700 leading-relaxed">
              Whether you start with a Standard, a Root, a Multi, or the Premium Package, you're not purchasing a fixed template. You're gaining total design freedom, the ability to
              create as many sites as you need, and a massive time advantage over traditional workflows.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
