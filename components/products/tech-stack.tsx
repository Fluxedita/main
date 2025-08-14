"use client"

import { Code, Database, Palette, Zap, CreditCard, ImageIcon, TrendingUp, Repeat, Server, Lock, Route, GitBranch } from "lucide-react"

const technologies = [
  {
    icon: Code,
    name: "Next.js",
    description: "Fast routing, dynamic rendering, and production-grade performance optimization",
    letter: "N",
  },
  {
    icon: Code,
    name: "React",
    description: "Componentized architecture with reactive UI and modern development patterns",
    letter: "R",
  },
  {
    icon: Palette,
    name: "Tailwind CSS",
    description: "Modern utility-first styling with responsive design and customization",
    letter: "T",
  },
  {
    icon: Zap,
    name: "Framer Motion",
    description: "Smooth animations, transitions, and interactive user experience elements",
    letter: "F",
  },
  {
    icon: Database,
    name: "Supabase",
    description: "Authentication and database management, self-hosted or fully managed",
    letter: "S",
  },
  {
    icon: CreditCard,
    name: "Stripe",
    description: "Payment processing and subscription management, ready for integration",
    letter: "S",
  },
  {
    icon: ImageIcon,
    name: "Cloudinary",
    description: "Smart media storage, processing, optimization, and delivery solutions",
    letter: "C",
  },
  {
    icon: Repeat,
    name: "Unlimited Reusability",
    description: "Deploy your purchased packages across any number of projects without limitations.",
    letter: "U",
  },
  {
    icon: Server,
    name: "Flexible Hosting",
    description: "Flexible deployment with CI/CD integration for blazing-fast hosting and automatic builds",
    letter: "V",
  },
  {
    icon: GitBranch,
    name: "Environment Variables",
    description: "Secure configuration of API keys and service credentials across environments",
    letter: "E",
  },
  {
    icon: Lock,
    name: "Auth Guards & RLS",
    description: "Row Level Security for secure access control",
    letter: "A",
  },
  {
    icon: Route,
    name: "Dynamic Routing",
    description: "Automatic route generation and custom slugs for scalable content structures",
    letter: "D",
  },
]

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast Performance",
    description: "Optimized for speed and performance with modern web standards",
  },
  {
    icon: Code,
    title: "Developer Ready Stack",
    description: "Modern development tools and frameworks for extensibility",
  },
  {
    icon: TrendingUp,
    title: "Fully Scalable Architecture",
    description: "Grows seamlessly with your business and user demands",
  },
]

export function TechStack() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All‑in‑One, Full‑Stack Foundations</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built on modern tech to deliver performance and scalability — fully guided from beginner → expert with a reusable license,
            client handover & editability, and 12 months of safe app‑code updates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold text-lg">{tech.letter}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{tech.name}</h3>
              </div>
              <p className="text-gray-600 text-sm">{tech.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">All‑in‑One, Fully Guided Tools</h3>
          <p className="text-xl text-gray-600">
            Create, manage, and scale—guided at every step. Reusable license, client handover & editability, and safe app‑code updates included.
          </p>
        </div>
      </div>
    </section>
  )
}
