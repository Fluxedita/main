"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, MessageCircle, Calendar, Users, Headphones, FileText, Star, Lock } from "lucide-react"
import { motion, Variants } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const contactInfo = [
  {
    icon: Mail,
    title: "Email Support",
    details: "Contact Our Support Team",
    subtext: "Response within 24-48 business hours",
    color: "from-gray-400 to-gray-500",
    href: "/contact",
    premium: false,
    comingSoon: false
  },
  {
    icon: Phone,
    title: "Phone Support",
    details: "Available for Premium Users",
    subtext: "Priority phone assistance with Premium plan",
    color: "from-green-400 to-emerald-500",
    href: "/pricing",
    premium: true,
    comingSoon: true
  },
  {
    icon: MapPin,
    title: "Office Location",
    details: "West Yorkshire, United Kingdom",
    subtext: "By appointment only for Enterprise clients",
    color: "from-purple-400 to-violet-500",
    premium: true,
    comingSoon: false
  },
  {
    icon: FileText,
    title: "Documentation",
    details: "24/7 Self-Service Portal",
    subtext: "Comprehensive guides and tutorials",
    color: "from-blue-400 to-indigo-500",
    href: "/documentation",
    premium: false,
    comingSoon: false
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    details: "Premium Feature - Coming Soon",
    subtext: "Real-time assistance for Premium users",
    color: "from-pink-400 to-rose-500",
    premium: true,
    comingSoon: true
  },
  {
    icon: Calendar,
    title: "Schedule Call",
    details: "Book a consultation",
    subtext: "Available for Premium and Enterprise plans",
    color: "from-teal-400 to-cyan-500",
    href: "/pricing",
    premium: true,
    comingSoon: true
  },
  {
    icon: Users,
    title: "Community Forum",
    details: "Coming soon",
    subtext: "Get help from other users and experts",
    color: "from-indigo-400 to-blue-500",
    href: "/help",
    premium: false,
    comingSoon: true
  },
  {
    icon: Headphones,
    title: "Premium Support",
    details: "24/7 Priority Assistance",
    subtext: "Included with Premium and Enterprise plans",
    color: "from-yellow-400 to-amber-500",
    href: "/pricing",
    premium: true,
    comingSoon: true
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
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
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
    },
  },
}

export function ContactInfo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
      <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 mb-8">
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="text-2xl font-bold text-gray-900">Support & Contact Options</CardTitle>
            <p className="text-gray-600 mt-2">
              Choose the support option that works best for you. Premium features are available with our paid plans.
            </p>
          </motion.div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contactInfo.map((info, index) => {
            const content = (
              <motion.div
                key={index}
                className={cn(
                  "flex items-start space-x-4 p-4 rounded-lg transition-colors group relative overflow-hidden",
                  info.premium 
                    ? "bg-gradient-to-r from-yellow-50 to-amber-50 border border-amber-100" 
                    : "hover:bg-gray-50 border border-gray-100"
                )}
                variants={itemVariants}
                whileHover={{ x: info.comingSoon ? 0 : 5, scale: info.comingSoon ? 1 : 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {info.premium && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-gradient-to-r from-amber-400 to-yellow-400 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center">
                      <Star className="h-3 w-3 mr-1" />
                      <span>Premium</span>
                    </div>
                  </div>
                )}
                
                <motion.div
                  className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
                    info.comingSoon 
                      ? "bg-gradient-to-r from-gray-300 to-gray-400" 
                      : `bg-gradient-to-r ${info.color}`
                  )}
                  whileHover={{ rotate: info.comingSoon ? 0 : 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <info.icon className={cn(
                    "h-6 w-6",
                    info.comingSoon ? "text-gray-500" : "text-white"
                  )} />
                </motion.div>
                
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {info.title}
                    </h3>
                    {info.comingSoon && (
                      <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 font-medium">
                    {info.details}
                    {info.premium && !info.comingSoon && (
                      <span className="ml-2 text-amber-600">
                        <Lock className="h-3.5 w-3.5 inline" />
                      </span>
                    )}
                  </p>
                  <p className="text-gray-500 text-sm">{info.subtext}</p>
                </div>
              </motion.div>
            );

            if (info.href) {
              return (
                <Link 
                  href={info.comingSoon ? '#' : info.href} 
                  key={index}
                  className={info.comingSoon ? 'cursor-not-allowed' : 'cursor-pointer'}
                  onClick={(e) => info.comingSoon && e.preventDefault()}
                >
                  {content}
                </Link>
              );
            }

            return content;
          })}
        </CardContent>
      </Card>

      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(59, 130, 246, 0.4)",
                    "0 0 0 20px rgba(59, 130, 246, 0)",
                    "0 0 0 0 rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Mail className="h-8 w-8 text-white" />
              </motion.div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Prefer Direct Email Communication?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Send us a detailed message about your project requirements and we'll get back to you as soon as possible
                with personalized assistance.
              </p>
              <motion.a
                href="mailto:jamescroanin@gmail.com"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Fluxedita Directly
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                  <Mail className="ml-2 h-4 w-4" />
                </motion.div>
              </motion.a>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
