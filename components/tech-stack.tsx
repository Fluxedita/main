"use client"

import {
  Code,
  Database,
  Palette,
  Zap,
  CreditCard,
  ImageIcon,
  TrendingUp,
  Server,
  Shield,
  Globe,
  Cpu,
  Layers,
  GitBranch,
  Github,
  FileCode,
} from "lucide-react"
import type { CSSProperties } from "react"

const technologies = [
  {
    icon: Code,
    name: "Next.js",
    description: "Fast routing, dynamic rendering, production-grade",
  },
  {
    icon: Code,
    name: "React",
    description: "Componentized, reactive UI",
  },
  {
    icon: Palette,
    name: "Tailwind CSS",
    description: "Modern utility-first styling",
  },
  {
    icon: Zap,
    name: "Framer Motion",
    description: "Smooth animations and transitions",
  },
  {
    icon: Database,
    name: "Supabase",
    description: "Auth + DB, self-hosted or managed",
  },
  {
    icon: CreditCard,
    name: "Stripe",
    description: "Payments and subscription-ready",
  },
  {
    icon: ImageIcon,
    name: "Cloudinary",
    description: "Smart media storage, processing, and delivery",
  },
  {
    icon: TrendingUp,
    name: "Fully Scalable",
    description: "All packages are fully scalable",
  },
  {
    icon: Github,
    name: "GitHub",
    description: "Repo hosting, issues, and CI-friendly",
  },
  {
    icon: GitBranch,
    name: "Git",
    description: "Version control for collaboration",
  },
  {
    icon: Server,
    name: "Edge Ready",
    description: "Serverless/edge-first deployment",
  },
  {
    icon: Shield,
    name: "Security",
    description: "Auth, RLS, and secure defaults",
  },
  {
    icon: Globe,
    name: "i18n",
    description: "Internationalization-ready UX",
  },
  {
    icon: Cpu,
    name: "AI Hooks",
    description: "Ready for AI features & tools",
  },
  {
    icon: Layers,
    name: "Design System",
    description: "Composable, scalable components",
  },
  {
    icon: FileCode,
    name: "TypeScript",
    description: "Safer, predictable DX",
  },
]

function Card({ icon: Icon, name, description }: { icon: any; name: string; description: string }) {
  return (
    <div className="p-6 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors w-64 shrink-0">
      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  )
}

function MarqueeRow({ items, direction = "left", duration = 30 }: { items: typeof technologies; direction?: "left" | "right"; duration?: number }) {
  const dirClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
  const style = { ['--marquee-duration' as any]: `${duration}s` } as CSSProperties
  return (
    <div className="relative overflow-hidden">
      <div className={`flex gap-6 w-max ${dirClass}`} style={style}>
        {[...items, ...items].map((t, i) => (
          <Card key={i} icon={t.icon} name={t.name} description={t.description} />
        ))}
      </div>
    </div>
  )
}

export function TechStack() {
  const top = technologies.slice(0, 8)
  const bottom = technologies.slice(8, 16)
  return (
    <>
      {/* White header section with title and tagline */}
      <section id="tech" className="py-16 bg-white text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">All‑in‑One, Full‑Stack Foundations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on modern tech for performance and scalability — fully guided from beginner → expert with a reusable license,
              client handover & editability, and 12 months of safe app‑code updates.
            </p>
          </div>
        </div>
      </section>

      {/* Dark full-bleed marquee section */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <MarqueeRow items={top} direction="left" duration={180} />
            <MarqueeRow items={bottom} direction="right" duration={180} />
          </div>
        </div>
        <style jsx global>{`
          @keyframes marqueeLeft { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          @keyframes marqueeRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }
          .animate-marquee-left { animation: marqueeLeft var(--marquee-duration, 30s) linear infinite; }
          .animate-marquee-right { animation: marqueeRight var(--marquee-duration, 30s) linear infinite; }
        `}</style>
      </section>
    </>
  )
}
