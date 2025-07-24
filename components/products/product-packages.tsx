"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Check, Eye, ArrowRight, DollarSign } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { easeOut } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useState } from "react"
import { plans, Plan } from "../pricing/pricing-plans"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOut,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.8,
      ease: easeOut,
    },
  },
}

export function ProductPackages() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState<string | null>(null)

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="space-y-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {plans.map((plan, index) => (
            <motion.div key={plan.id} className="flex flex-col gap-12" variants={itemVariants}>
              <div
                className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}
              >
                {/* Content Side */}
                <motion.div
                  className="flex-1 space-y-6"
                  initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <motion.div
                    className="flex items-center gap-3 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => { setSelectedPlan(plan); setModalOpen(true); }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Select ${plan.name} package`}
                  >
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${plan.color} flex items-center justify-center`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <plan.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    {plan.badge && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 + 0.3 }}
                      >
                        <Badge variant={plan.badge === "Most Popular" ? "default" : "secondary"} className="text-xs">
                          {plan.badge}
                        </Badge>
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
                  >
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{plan.name}</h2>
                    <h3 className="text-xl text-blue-600 font-semibold mb-4">{plan.subtitle}</h3>
                  </motion.div>

                  <motion.div
                    className="grid md:grid-cols-2 gap-8"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                  >
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, delay: index * 0.2 + featureIndex * 0.05 + 0.6 }}
                          >
                            <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
                              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            </motion.div>
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Perfect For:</h4>
                      <ul className="space-y-2">
                        {plan.perfectFor.map((use, useIndex) => (
                          <motion.li
                            key={useIndex}
                            className="flex items-center"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, delay: index * 0.2 + useIndex * 0.05 + 0.8 }}
                          >
                            <motion.div
                              className="w-2 h-2 bg-blue-500 rounded-full mr-3"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: useIndex * 0.2 }}
                            />
                            <span className="text-gray-700">{use}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 1.0 }}
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="lg"
                        className={`bg-gradient-to-r ${plan.color} hover:opacity-90 relative overflow-hidden group`}
                        onClick={() => { setSelectedPlan(plan); setModalOpen(true); }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.5 }}
                        />
                        <span className="relative z-10 flex items-center">
                          Learn More
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          >
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </motion.div>
                        </span>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="hover:bg-gray-50 bg-transparent"
                        asChild
                      >
                        <a 
                          href={plan.id === 'landing-page-package' 
                            ? 'https://custom-landingpage-package.vercel.app/'
                            : plan.id === 'root-page-package'
                            ? 'https://custom-rootpage-package.vercel.app/'
                            : plan.id === 'multi-page-package'
                            ? 'https://custom-multipage-package.vercel.app/'
                            : '#'}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Full Preview
                        </a>
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Preview Side */}
                <motion.div
                  className="flex-1"
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <CardHeader className="bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <motion.div
                            className="w-3 h-3 bg-red-500 rounded-full"
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          />
                          <motion.div
                            className="w-3 h-3 bg-yellow-500 rounded-full"
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-3 h-3 bg-green-500 rounded-full"
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                          />
                        </div>
                        <div className="text-xs text-gray-500">Package Preview</div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <motion.div
                        className={`h-64 bg-gradient-to-br ${plan.color} flex items-center justify-center relative overflow-hidden`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-center text-white z-10">
                          <motion.div
                            animate={{
                              y: [0, -10, 0],
                              rotate: [0, 5, -5, 0],
                            }}
                            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                          >
                            <plan.icon className="h-16 w-16 mx-auto mb-4 opacity-80" />
                          </motion.div>
                          <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                          <p className="text-sm opacity-90 max-w-xs">{plan.previewDescription}</p>
                        </div>
                        <div className="absolute inset-0 bg-black/10" />
                        <motion.div
                          className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                        <motion.div
                          className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full"
                          animate={{ rotate: -360 }}
                          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                      </motion.div>
                    </CardContent>
                    <div className="w-full flex justify-center bg-white pb-6 pt-2">
                      <img
                        src={plan.imagePlaceholder}
                        alt={plan.name + ' visual placeholder'}
                        className="rounded-lg shadow-md max-w-xs w-full h-auto object-cover cursor-pointer"
                        onClick={() => setLightboxOpen(plan.id)}
                      />
                      <Dialog open={lightboxOpen === plan.id} onOpenChange={(open) => setLightboxOpen(open ? plan.id : null)}>
                        <DialogContent className="w-screen h-screen max-w-full max-h-screen flex flex-col items-center justify-center p-2 sm:p-8 bg-black">
                          <button
                            type="button"
                            onClick={() => setLightboxOpen(null)}
                            className="fixed top-6 right-6 z-50 bg-white text-black rounded-full border border-gray-300 shadow-lg p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            style={{ fontSize: 32, lineHeight: 1, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            aria-label="Close image preview"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                          </button>
                          <DialogTitle className="sr-only">{plan.name} image preview</DialogTitle>
                          {plan.id === 'premium' ? (
                            <img
                              src={plan.imagePlaceholder}
                              alt={plan.name + ' visual large'}
                              className="rounded-lg object-contain w-full h-full max-w-screen max-h-screen cursor-pointer"
                              style={{ background: 'white' }}
                              onClick={() => setLightboxOpen(null)}
                            />
                          ) : (
                            <a
                              href={plan.exampleUrl || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full h-full"
                            >
                              <img
                                src={plan.imagePlaceholder}
                                alt={plan.name + ' visual large'}
                                className="rounded-lg object-contain w-full h-full max-w-screen max-h-screen"
                                style={{ background: 'white' }}
                              />
                            </a>
                          )}
                          {plan.id === 'premium' && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
                              <span className="bg-blue-400/90 text-white text-2xl font-extrabold rounded-xl px-8 py-5 shadow-2xl border-4 border-blue-500 drop-shadow-lg pointer-events-auto">
                                External URL TBA
                              </span>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* Value Proposition - now placed below the main flex row */}
              {plan.valueProposition && (
                <motion.div
                  className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 1.2 }}
                >
                  <DollarSign className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-1">{plan.valueProposition.title}</h4>
                    <p
                      className="text-blue-700 text-sm"
                      dangerouslySetInnerHTML={{ __html: plan.valueProposition.text }}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal Dialog for Plan Confirmation (shared with pricing page) */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg">
          {selectedPlan && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold mb-2">{selectedPlan.name} Package</DialogTitle>
                <div className="text-gray-600 mb-2">{selectedPlan.subtitle}</div>
                <div className="text-3xl font-bold text-gray-900 mb-4">{selectedPlan.price}</div>
              </DialogHeader>
              <div className="mb-4">
                <h4 className="font-semibold text-green-700 mb-2 text-sm">Included Features:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                  {selectedPlan.included.map((feature: string, i: number) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
              {selectedPlan.notIncluded && (
                <div className="mb-4">
                  <h4 className="font-semibold text-red-700 mb-2 text-sm">Not Included:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-500 text-sm">
                    {selectedPlan.notIncluded.map((feature: string, i: number) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              <DialogFooter>
                <Button asChild className="w-full" onClick={() => setModalOpen(false)}>
                  <a href={selectedPlan.paymentLink} target="_blank" rel="noopener noreferrer">
                    Proceed to Payment
                  </a>
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
