import { Button } from "@/components/ui/button"
import { Code, Zap } from "lucide-react"

const technologies = [
  { name: "Next.js", description: "for lightning-fast performance and SEO" },
  { name: "React", description: "for modern, component-based architecture" },
  { name: "Supabase", description: "for scalable backend and authentication" },
]

export function ModernArchitecture() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Code className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Built on Modern Technology</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Every Fluxedita package is powered by the latest web technologies, ensuring your website is fast, secure,
            and ready for the future. We use industry-leading tools and frameworks to deliver exceptional performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {technologies.map((tech, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{tech.name}</h3>
              <p className="text-gray-300 text-sm">{tech.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
          >
            View Tech Stack
          </Button>
        </div>
      </div>
    </section>
  )
}
