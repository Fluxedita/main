"use client"

import { Edit3, Layers, Repeat, Layout, Sparkles, Clock, Star, Unlink, Palette, Infinity, Zap } from "lucide-react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const packageBenefits = [
  {
    icon: Edit3,
    title: "Live-Editable in Browser",
    description: "Make changes instantly and visually, seeing results in real-time without waiting for builds.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Layers,
    title: "Fully Scalable Architecture",
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
    title: "Uniquely Designed Elements",
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

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
    },
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    y: 20,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    }
  },
}

const bulletItemVariants: Variants = {
  hidden: { opacity: 0, x: -50, scale: 0.8 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
    },
  },
}

// Framer Motion variants for the dialog content
const dialogContentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { 
      duration: 0.4, 
      ease: [0.16, 1, 0.3, 1] // easeOutExpo
    } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    y: 50, 
    transition: { 
      duration: 0.3, 
      ease: [0.12, 0, 0.39, 0] // easeInExpo
    } 
  },
}

export function EditablePackages() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedPoint, setSelectedPoint] = useState<(typeof bulletPoints)[number] | null>(null) // State to hold the data of the clicked point
  const [isOpen, setIsOpen] = useState(false)

  const bulletPoints = [
    {
      icon: Unlink,
      text: "You're not purchasing a fixed template, regardless of your starting package.",
      detailedTitle: "Beyond Fixed Templates",
      detailedDescription:
        "Unlike traditional website builders that lock you into rigid templates, Fluxedita provides a flexible foundation. You get the underlying code and structure, allowing you to customize every aspect, from layout to functionality, without being confined to a pre-defined design. Your creative vision is the only limit.",
    },
    {
      icon: Palette,
      text: "Gain total design freedom to bring any vision to life.",
      detailedTitle: "Unleash Your Design Potential",
      detailedDescription:
        "Fluxedita empowers you with unparalleled design flexibility. Our modular components and live editing capabilities mean you can drag, drop, resize, and style elements directly on your page. Whether you're a designer or a beginner, you have the power to craft truly unique and stunning web experiences that perfectly match your brand.",
    },
    {
      icon: Infinity,
      text: "Create as many unique sites as you need, without limitations.",
      detailedTitle: "Unlimited Projects, Infinite Possibilities",
      detailedDescription:
        "Your Fluxedita package isn't tied to a single website. You can reuse the entire design system, components, and architecture across an unlimited number of projects. This means you can build multiple client sites, personal projects, or experimental designs without incurring additional licensing costs or restrictions.",
    },
    {
      icon: Zap,
      text: "Achieve a massive time advantage over traditional web development workflows.",
      detailedTitle: "Accelerated Development Workflow",
      detailedDescription:
        "Stop wasting hours on repetitive coding tasks. Fluxedita's live editing and pre-built, yet customizable, components drastically reduce development time. Launch professional, high-quality websites in minutes or hours, not days or weeks, freeing up your time to focus on content, strategy, or other creative endeavors.",
    },
  ]

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
            Build Once - Build a Hundred Times - Build Forever.{" "}
            <span className="font-semibold text-blue-600">Live. Visual. Scalable.</span>
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
              <Card className="h-full flex flex-col items-center text-center p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto text-center mt-12"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl shadow-xl relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-white/10"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <div className="relative z-10">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full text-center mx-auto mb-8 flex items-center justify-center max-w-fit"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        scale: 1,
                        boxShadow: [
                          "0 0 0 0 rgba(59, 130, 246, 0.7)",
                          "0 0 0 10px rgba(59, 130, 246, 0)",
                          "0 0 0 0 rgba(59, 130, 246, 0)",
                        ],
                      }
                    : {
                        opacity: 0,
                        scale: 0.8,
                      }
                }
                transition={
                  isInView
                    ? {
                        opacity: { duration: 0.5, delay: 0.3 },
                        scale: { duration: 0.5, delay: 0.3 },
                        boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                      }
                    : {
                        opacity: { duration: 0.5 },
                        scale: { duration: 0.5 },
                      }
                }
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Star className="h-6 w-6 mr-3" />
                </motion.div>
                <h3 className="text-xl md:text-2xl font-bold">More Than Just a Template</h3>
              </motion.div>
              <ul className="space-y-4 text-left max-w-2xl mx-auto">
                {bulletPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start text-lg md:text-xl font-medium cursor-pointer"
                    variants={bulletItemVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    whileHover={{ scale: 1.05, x: 10, color: "#86EFAC" }}
                    onClick={() => setIsOpen(true)}
                  >
                    <point.icon className="h-6 w-6 text-white mr-3 mt-1 flex-shrink-0" />
                    <span>{point.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Card>
        </motion.div>

        {/* Single Dialog component rendered conditionally */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <AnimatePresence>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={cardVariants}
              className="w-full"
            >
              <DialogContent className="max-w-4xl p-0 overflow-hidden">
                <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl shadow-xl relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="relative z-10 p-6">
                    <DialogHeader className="mb-4">
                      {/* Corrected structure: DialogTitle and DialogDescription are direct children */}
                      <DialogTitle className="text-3xl font-bold text-white flex items-center mb-4">
                        {selectedPoint && selectedPoint.icon && (
                          <motion.div
                            className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          >
                            <selectedPoint.icon className="h-6 w-6 text-white" />
                          </motion.div>
                        )}
                        {selectedPoint && selectedPoint.detailedTitle}
                      </DialogTitle>
                      <DialogDescription className="text-blue-100 text-lg leading-relaxed">
                        {selectedPoint && selectedPoint.detailedDescription}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-6 text-right">
                      <Button
                        onClick={() => setIsOpen(false)}
                        variant="outline"
                        className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </Card>
              </DialogContent>
            </motion.div>
          </AnimatePresence>
        </Dialog>
      </div>
    </section>
  )
}
