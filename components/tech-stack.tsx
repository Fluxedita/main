import { Code, Database, Palette, Zap, CreditCard, ImageIcon, TrendingUp } from "lucide-react"

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
]

export function TechStack() {
  return (
    <section id="tech" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Built with Modern Tech Stack</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Powered by cutting-edge technologies that ensure performance, scalability, and developer experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <div key={index} className="p-6 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <tech.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{tech.name}</h3>
              <p className="text-gray-300 text-sm">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
