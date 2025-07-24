import { Button } from "@/components/ui/button"
import { Play, Edit3, Zap } from "lucide-react"

const features = [
  "Edit directly in the browser with zero latency",
  "See changes instantly without page refreshes",
  "Intuitive visual controls for every element",
]

export function LiveEditingRevolution() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Live Editing Revolution</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Experience the future of web development with our revolutionary live editing platform. No more switching
              between tools, no more waiting for builds - just instant, real-time updates that bring your vision to
              life.
            </p>

            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Zap className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90">
              <Play className="mr-2 h-5 w-5" />
              Experience Live Editing
            </Button>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 relative overflow-hidden">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Edit3 className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Live Editing in Action</h3>
                <p className="text-gray-600 mb-6">
                  Watch your changes come to life instantly with our intuitive live editing interface
                </p>
                <div className="flex justify-center space-x-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-75" />
                  <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse delay-150" />
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/20 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
