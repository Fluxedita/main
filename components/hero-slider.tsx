"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Code, Palette, Unlink, Shield, Users, Star } from "lucide-react"
import Link from "next/link" // For linking to other pages

const slides = [
  // Slide 0: New First Slide (User-provided)
  {
    id: 4,
    type: "hero",
    title: (
      <>
        <span className="text-gray-900">Imagine if you could create a full-stack community platform</span>
        <br />
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          — complete with memberships, media, and interactivity — in hours, not months.
        </span>
      </>
    ),
    description:
      "Fluxedita makes it possible: live messaging, dynamic media sets, premium content, and powerful admin tools — all fully guided, all in one platform.",
    badge: {
      icon: Zap,
      text: "Fully Guided • All‑in‑One",
    },
    ctaButtons: [
      { text: "Get Started Today — Fully Guided From Day One", link: "/pricing", variant: "default" },
    ],
    techIcons: [
      { icon: Code, text: "Next.js & React" },
      { icon: Palette, text: "Tailwind CSS" },
      { icon: Zap, text: "Framer Motion" },
    ],
  },
  // Slide 1: Original Hero Content
  {
    id: 1,
    type: "hero",
    title: (
      <>
        <span className="text-gray-900">Guided, All‑in‑One</span>
        <br />
        <motion.span
          className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% 200%" }}
        >
          Full‑Stack Developer Platform
        </motion.span>
      </>
    ),
    description:
      "All packages are fully guided (beginner → expert), include a reusable license for the purchaser, client handover & editability, and 12 months of app‑code updates that never overwrite your content or database. Build and manage live, right in the browser.",
    badge: {
      icon: Zap,
      text: "All‑in‑One • Fully Guided",
    },
    ctaButtons: [
      { text: "See Plans", link: "/pricing", variant: "default" },
      { text: "Explore Packages", link: "/products", variant: "outline" },
    ],
    techIcons: [
      { icon: Code, text: "Next.js & React" },
      { icon: Palette, text: "Tailwind CSS" },
      { icon: Zap, text: "Framer Motion" },
    ],
  },
  // Slide 2: Real-World Pain Points Solved (simplified)
  {
    id: 2,
    type: "problems",
    title: "Guided Solutions to Real Pain Points",
    description:
      "From onboarding to handover, FluxEdita guides you at every step. Reusable packages, built‑in admin tools, and safe app‑code updates remove common blockers for teams and clients alike.",
    points: [
      {
        icon: Shield,
        shortProblem: "Worried about lacking the necessary technical skills?",
        shortSolution: "Guided onboarding: if you can click and type, you can manage your site.",
      },
      {
        icon: Users,
        shortProblem: "Struggling with disconnected user or media management systems?",
        shortSolution: "Built‑in CRUD for members and media, ready out of the box.",
      },
      {
        icon: Star,
        shortProblem: "Are developer bottlenecks slowing down your content updates?",
        shortSolution: "Client handover & live editability for non‑devs; developers extend code safely.",
      },
    ],
    ctaButtons: [
      { text: "Learn More About Solutions", link: "/products", variant: "default" }, // Link to the problems section on the home page
    ],
  },
  // Slide 3: More Than Just a Template (simplified)
  {
    id: 3,
    type: "packages",
    title: "More Than Just a Template",
    description:
      "Unlock an endlessly reusable design system — each package is a launchpad for any number of unique, fully editable sites. Includes a reusable license, client handover & editability, and 12 months of safe app‑code updates.",
    points: [
      {
        icon: Unlink,
        text: "You're not purchasing a fixed template, regardless of your starting package.",
      },
      {
        icon: Palette,
        text: "Gain total design freedom to bring any vision to life.",
      },
      {
        icon: Star,
        text: "Create as many unique sites as you need, without limitations.",
      },
      {
        icon: Zap,
        text: "Achieve a massive time advantage over traditional web development workflows.",
      },
    ],
    ctaButtons: [{ text: "Explore Our Packages", link: "/products", variant: "default" }],
  },
]

const sliderVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring' as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    transition: {
      x: { type: 'spring' as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
}

export function HeroSlider() {
  const [[page, direction], setPage] = useState([0, 0])
  const slideIndex = ((page % slides.length) + slides.length) % slides.length
  const currentSlide = slides[slideIndex]
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [rememberPlay, setRememberPlay] = useState(false)

  // Per-word stagger variants for the first slide headline
  const wordContainer = {
    hidden: {},
    visible: {
      transition: { delayChildren: 0.5, staggerChildren: 0.15 }, // Headline starts at 0.5s, 0.15s per word
    },
  }
  const wordItem = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  // Load persisted preference
  useEffect(() => {
    try {
      const v = localStorage.getItem('heroVideoPlayPreferred')
      if (v === '1') setRememberPlay(true)
    } catch {}
  }, [])

  // Manual video controls
  const startVideo = async () => {
    try {
      const isCoarse = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(pointer: coarse)").matches
      if (videoRef.current) {
        if (isCoarse) {
          // Mobile: keep video muted, play separate audio track
          videoRef.current.muted = true
          await videoRef.current.play()
          if (audioRef.current) {
            audioRef.current.currentTime = 0
            await audioRef.current.play()
          }
        } else {
          // Desktop: unmute video audio and play
          videoRef.current.muted = false
          await videoRef.current.play()
        }
        setVideoPlaying(true)
        // Persist preference to auto-play when slide returns
        try {
          localStorage.setItem('heroVideoPlayPreferred', '1')
        } catch {}
        setRememberPlay(true)
      }
    } catch {}
  }
  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      setVideoPlaying(false)
    }
    if (audioRef.current) {
      audioRef.current.pause()
    }
    // Persist preference as not auto-play
    try {
      localStorage.setItem('heroVideoPlayPreferred', '0')
    } catch {}
    setRememberPlay(false)
  }

  // Ensure media behavior on slide changes:
  // - If user prefers play, auto-play with audio when slide 0 appears.
  // - Otherwise, briefly play then pause to show a motion frame.
  useEffect(() => {
    let pauseTimer: ReturnType<typeof setTimeout> | null = null
    if (slideIndex === 0) {
      if (videoRef.current) {
        const isCoarse = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(pointer: coarse)").matches
        if (rememberPlay) {
          // Auto-play with audio according to device
          try {
            videoRef.current.currentTime = 0
            if (isCoarse) {
              videoRef.current.muted = true
              const vp = videoRef.current.play()
              if (vp && typeof vp.then === 'function') {
                vp.then(() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = 0
                    const ap = audioRef.current.play()
                    if (ap && typeof ap.then === 'function') {
                      ap.catch(() => {})
                    }
                  }
                  setVideoPlaying(true)
                }).catch(() => {
                  videoRef.current?.pause()
                  setVideoPlaying(false)
                })
              } else {
                // Non-promise play fallback
                if (audioRef.current) {
                  audioRef.current.currentTime = 0
                  const ap = audioRef.current.play()
                  if (ap && typeof ap.then === 'function') {
                    ap.catch(() => {})
                  }
                }
                setVideoPlaying(!videoRef.current.paused)
              }
            } else {
              videoRef.current.muted = false
              const vp = videoRef.current.play()
              if (vp && typeof vp.then === 'function') {
                vp.then(() => setVideoPlaying(true)).catch(() => {
                  videoRef.current?.pause()
                  setVideoPlaying(false)
                })
              } else {
                setVideoPlaying(!videoRef.current.paused)
              }
            }
          } catch {
            videoRef.current.pause()
            setVideoPlaying(false)
          }
        } else {
          // Play muted briefly, then pause to show a motion frame
          try {
            videoRef.current.muted = true
            videoRef.current.currentTime = 0
            const p: any = videoRef.current.play()
            if (p && typeof p.then === 'function') {
              p.then(() => {
                setVideoPlaying(true)
                pauseTimer = setTimeout(() => {
                  if (videoRef.current) {
                    videoRef.current.pause()
                    setVideoPlaying(false)
                  }
                }, 250)
              }).catch(() => {
                videoRef.current?.pause()
                setVideoPlaying(false)
              })
            } else {
              setVideoPlaying(!videoRef.current.paused)
              pauseTimer = setTimeout(() => {
                if (videoRef.current) {
                  videoRef.current.pause()
                  setVideoPlaying(false)
                }
              }, 250)
            }
          } catch {
            videoRef.current.pause()
            setVideoPlaying(false)
          }
        }
      }
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    } else {
      // Leaving first slide: stop any media
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
        videoRef.current.muted = true
      }
      setVideoPlaying(false)
    }
    return () => {
      if (pauseTimer) clearTimeout(pauseTimer)
    }
  }, [slideIndex])

  // Advance to next slide when media ends on first slide
  useEffect(() => {
    if (slideIndex !== 0) return

    const handleEnded = () => {
      // Only advance if we are still on the first slide
      paginate(1)
    }

    const v = videoRef.current
    const a = audioRef.current
    v?.addEventListener("ended", handleEnded)
    a?.addEventListener("ended", handleEnded)

    return () => {
      v?.removeEventListener("ended", handleEnded)
      a?.removeEventListener("ended", handleEnded)
    }
  }, [slideIndex])

  // Auto-play functionality
  useEffect(() => {
    const intervalMs = slideIndex === 0 ? 18000 : 14000 // First slide reduced by 16s as requested
    const interval = setInterval(() => {
      paginate(1)
    }, intervalMs)

    return () => clearInterval(interval)
  }, [page, slideIndex]) // Reset when slide changes

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden relative min-h-[700px] flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={sliderVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 flex items-center justify-center text-center p-4"
          >
            {currentSlide.id === 4 && (
              <>
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
                  src="/videos/heroslider_intro/heroslider_intro.mp4"
                  poster="/placeholder.jpg"
                  muted
                  playsInline
                  preload="none"
                  onPlay={() => setVideoPlaying(true)}
                  onPause={() => setVideoPlaying(false)}
                />
                {/* Hidden audio element for mobile soundtrack */}
                <audio ref={audioRef} src="/videos/heroslider_intro/heroslider_intro.mp3" preload="auto" />
                {/* Video Play/Pause control */}
                <div className="absolute right-4 top-4 z-20 flex gap-2">
                  <button
                    onClick={videoPlaying ? pauseVideo : startVideo}
                    className="rounded-full bg-white/70 hover:bg-white text-gray-900 px-3 py-1.5 text-xs shadow"
                    aria-pressed={videoPlaying}
                  >
                    {videoPlaying ? "Pause video" : "Play video"}
                  </button>
                </div>
              </>
            )}
            <div className="relative z-10 max-w-4xl mx-auto">
              {currentSlide.type === "hero" && (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {currentSlide.badge && (
                    <motion.div className="flex justify-center mb-6">
                      <motion.div
                        className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <currentSlide.badge.icon className="h-4 w-4" />
                        </motion.div>
                        <span>{currentSlide.badge.text}</span>
                      </motion.div>
                    </motion.div>
                  )}

                  {currentSlide.id === 4 ? (
                    <div className="mb-6">
                      <motion.h1
                        className="text-4xl md:text-6xl font-bold text-gray-900"
                        variants={wordContainer}
                        initial="hidden"
                        animate="visible"
                      >
                        {"Imagine if you could create a full-stack community platform".split(" ").map((word, idx) => (
                          <motion.span
                            key={idx}
                            variants={wordItem}
                            className="inline-block mr-2"
                          >
                            {word}
                          </motion.span>
                        ))}
                      </motion.h1>
                      <h2 className="mt-3 text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {"— complete with memberships, media, and interactivity — in hours, not months.".split(" ").map((word, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 3.0 + idx * 0.15 }}
                            className="inline-block mr-2"
                          >
                            {word}
                          </motion.span>
                        ))}
                      </h2>
                    </div>
                  ) : (
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">{currentSlide.title}</h1>
                  )}

                  {currentSlide.id === 4 ? (
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                      {String(currentSlide.description)
                        .split(" ")
                        .map((word, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: 6.8 + idx * 0.12 }}
                            className="inline-block mr-2"
                          >
                            {word}
                          </motion.span>
                        ))}
                    </p>
                  ) : (
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                      {currentSlide.description}
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    {currentSlide.ctaButtons?.map((button, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={currentSlide.id === 4 ? { opacity: 0, y: 10 } : undefined}
                        animate={currentSlide.id === 4 ? { opacity: 1, y: 0 } : undefined}
                        transition={currentSlide.id === 4 ? { duration: 0.5, delay: 10.6 } : undefined}
                      >
                        <Button
                          size="lg"
                          className={`text-lg px-8 py-3 relative overflow-hidden group ${
                            button.variant === "default" ? "" : "bg-transparent hover:bg-blue-50"
                          }`}
                          variant={button.variant as "default" | "outline"}
                          asChild
                        >
                          <Link href={button.link}>
                            {button.variant === "default" && (
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "0%" }}
                                transition={{ duration: 0.3 }}
                              />
                            )}
                            <span className="relative z-10 flex items-center">
                              {currentSlide.id === 4 ? (
                                <>
                                  {String(button.text)
                                    .split(" ")
                                    .map((word, i) => (
                                      <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 10.8 + i * 0.1 }}
                                        className="inline-block mr-1"
                                      >
                                        {word}
                                      </motion.span>
                                    ))}
                                </>
                              ) : (
                                button.text
                              )}
                              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                                <ArrowRight className="ml-2 h-5 w-5" />
                              </motion.div>
                            </span>
                          </Link>
                        </Button>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
                    {currentSlide.techIcons?.map((tech, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-2"
                        whileHover={{ scale: 1.1, color: "#3B82F6" }}
                      >
                        <motion.div
                          animate={{ y: [0, -2, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        >
                          <tech.icon className="h-4 w-4" />
                        </motion.div>
                        <span>{tech.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentSlide.type === "problems" && (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{currentSlide.title}</h2>
                  <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                    {currentSlide.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {currentSlide.points?.map((point, index) => (
                      <motion.div
                        key={index}
                        className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
                          <point.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        {"shortProblem" in point && (
                          <h3 className="font-semibold text-gray-900 mb-2">{point.shortProblem}</h3>
                        )}
                        {"shortSolution" in point && (
                          <p className="text-gray-600 text-sm">{point.shortSolution}</p>
                        )}
                        {"text" in point && (
                          <h3 className="font-semibold text-gray-900 mb-2">{point.text}</h3>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  {currentSlide.ctaButtons?.map((button, idx) => (
                    <motion.div key={idx} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" className="text-lg px-8 py-3" asChild>
                        <Link href={button.link}>{button.text}</Link>
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {currentSlide.type === "packages" && (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full text-center mx-auto mb-8 flex items-center justify-center max-w-fit"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      boxShadow: [
                        "0 0 0 0 rgba(59, 130, 246, 0.7)",
                        "0 0 0 10px rgba(59, 130, 246, 0)",
                        "0 0 0 0 rgba(59, 130, 246, 0)",
                      ],
                    }}
                    transition={{
                      opacity: { duration: 0.5, delay: 0.3 },
                      scale: { duration: 0.5, delay: 0.3 },
                      boxShadow: { duration: 2, repeat: Infinity },
                    }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Star className="h-6 w-6 mr-3" />
                    </motion.div>
                    <h3 className="text-xl md:text-2xl font-bold">{currentSlide.title}</h3>
                  </motion.div>
                  <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                    {currentSlide.description}
                  </p>
                  <ul className="space-y-4 text-left max-w-2xl mx-auto mb-12">
                    {currentSlide.points?.map((point, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start text-lg md:text-xl font-medium text-gray-700"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        <point.icon className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        {"text" in point ? <span>{point.text}</span> : null}
                        {"shortProblem" in point ? <span>{point.shortProblem}</span> : null}
                      </motion.li>
                    ))}
                  </ul>
                  {currentSlide.ctaButtons?.map((button, idx) => (
                    <motion.div key={idx} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" className="text-lg px-8 py-3" asChild>
                        <Link href={button.link}>{button.text}</Link>
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <motion.div
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer p-2 rounded-full bg-white/50 hover:bg-white transition-colors shadow-md"
        onClick={() => paginate(-1)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowRight className="h-6 w-6 rotate-180 text-gray-700" />
      </motion.div>
      <motion.div
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer p-2 rounded-full bg-white/50 hover:bg-white transition-colors shadow-md"
        onClick={() => paginate(1)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowRight className="h-6 w-6 text-gray-700" />
      </motion.div>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              slideIndex === index ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setPage([index, index > slideIndex ? 1 : -1])}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </section>
  )
}
