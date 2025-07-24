import { Target } from "lucide-react"

export function Mission() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Target className="h-8 w-8 text-blue-600" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            We believe that creating and managing a website should be as intuitive as editing a document. That's why we
            built Fluxedita — a revolutionary platform that puts the power of modern web development directly into your
            hands.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-left">
            <p className="text-lg text-gray-700 leading-relaxed">
              No more skills gap. No more hidden interfaces. No more switching between countless tools. Just you, your
              site, and your vision — brought to life in real time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
