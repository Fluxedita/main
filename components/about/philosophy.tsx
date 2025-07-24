import { Globe, Zap, Sparkles } from "lucide-react"

const philosophies = [
  {
    icon: Globe,
    title: "Democratize Web Development",
    description:
      "We believe that creating beautiful, functional websites shouldn't require years of technical training. Our platform bridges the gap between simplicity and power.",
  },
  {
    icon: Zap,
    title: "Embrace Real-Time",
    description:
      "The future of web development is immediate. Why wait for builds, deployments, or page refreshes when you can see your changes instantly?",
  },
  {
    icon: Sparkles,
    title: "Empower Creativity",
    description:
      "Technology should amplify human creativity, not constrain it. We provide the tools and freedom to bring any vision to life.",
  },
]

export function Philosophy() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Philosophy</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {philosophies.map((philosophy, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <philosophy.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{philosophy.title}</h3>
              <p className="text-gray-600 leading-relaxed">{philosophy.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">The Future is Live</h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We're not just building another website builder. We're creating a new paradigm where the line between
              design and development disappears, where ideas become reality in real-time, and where anyone can be a web
              creator.
            </p>
            <p className="text-gray-700 font-medium">
              This isn't just a site editor — it's a creative ecosystem that removes friction, empowers non-technical
              users, and gives developers room to expand. One platform. Four packages. Full freedom.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center mt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Our Commitment</h3>
          <p className="text-gray-600 leading-relaxed">
            We're committed to continuous innovation, listening to our community, and pushing the boundaries of what's
            possible in web development. Your success is our success.
          </p>
        </div>
      </div>
    </section>
  )
}
