import { Heart, Code, Zap } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Simplicity First",
    description:
      "We believe powerful tools should be simple to use. Every feature is designed with user experience at its core.",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: Code,
    title: "Developer Freedom",
    description:
      "Built by developers, for developers. We provide the foundation while giving you complete creative control.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Zap,
    title: "Real-Time Everything",
    description:
      "Why wait? See your changes instantly with our live editing capabilities that make website building feel magical.",
    color: "from-yellow-500 to-orange-600",
  },
]

export function CoreValues() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The principles that guide everything we build and every decision we make.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div
                className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center mb-6`}
              >
                <value.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
