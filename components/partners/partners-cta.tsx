"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Mail } from "lucide-react"
import { motion, Variants } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"

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

export function PartnersCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.h2 className="text-3xl md:text-5xl font-bold mb-6" variants={itemVariants}>
            Let’s Shape the Future Together
          </motion.h2>

          <motion.p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto" variants={itemVariants}>
            Fluxedita is early — and that’s exactly why now is the moment to get involved. Whether you're a solo dev, a
            design team, an educator, or a funder, your contribution can help shape a platform with global reach.
          </motion.p>

          <motion.h3 className="text-2xl font-bold mb-6" variants={itemVariants}>
            Ready to Start the Conversation?
          </motion.h3>

          <motion.ul 
            className="text-lg text-blue-100 mb-8 space-y-2 max-w-md mx-auto text-left"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.li className="flex items-center" variants={itemVariants}>
              <ArrowRight className="h-5 w-5 mr-3 flex-shrink-0" />
              <span>What type of partnership are you interested in?</span>
            </motion.li>
            <motion.li className="flex items-center" variants={itemVariants}>
              <ArrowRight className="h-5 w-5 mr-3 flex-shrink-0" />
              <span>What's your timeline for getting started?</span>
            </motion.li>
            <motion.li className="flex items-center" variants={itemVariants}>
              <ArrowRight className="h-5 w-5 mr-3 flex-shrink-0" />
              <span>What resources or support are you looking for?</span>
            </motion.li>
          </motion.ul>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} variants={itemVariants}>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3" asChild>
              <Link href="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Contact Us / Fill Out the Partner Form
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
