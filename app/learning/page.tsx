import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle, Code, Terminal, Cpu, Layers, Zap } from "lucide-react"

export default function LearningPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Learning With <span className="text-blue-600">Fluxedita</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Your launchpad into the world of modern web development
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Just Starting Out? Fluxedita Is Your Launchpad
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Whether you're dreaming of becoming a web developer or just starting to learn, 
              Fluxedita gives you more than a template — it gives you a working foundation to build your skills.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What You'll Learn
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="w-8 h-8 text-blue-600" />,
                title: "Code Editors & Project Setup",
                description: "Learn how to install dependencies, run a local dev server, and structure a professional app."
              },
              {
                icon: <Terminal className="w-8 h-8 text-blue-600" />,
                title: "Terminal & Git",
                description: "Understand how to use the command line and version control — key skills for any dev."
              },
              {
                icon: <Cpu className="w-8 h-8 text-blue-600" />,
                title: "Modern Frameworks",
                description: "Build with tools used by professionals: React, Next.js, Tailwind CSS."
              },
              {
                icon: <Layers className="w-8 h-8 text-blue-600" />,
                title: "Third-Party Services",
                description: "Integrate real services like Supabase, Stripe, and Cloudinary."
              },
              {
                icon: <Zap className="w-8 h-8 text-blue-600" />,
                title: "Modular Architecture",
                description: "Understand scalable design patterns from day one."
              },
              {
                icon: <Code className="w-8 h-8 text-blue-600" />,
                title: "Custom Code Creation",
                description: "Understand the power of custom code creation."
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Value Proposition */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <p className="text-yellow-700 font-medium">
              🧠 No course, tutorial, or bootcamp gives you this much real-world context in one place — and at a fraction of the cost.
            </p>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            From Zero to Dev in One Afternoon — With Fluxedita
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto mt-12">
            {[
              "Opening the code in VS Code",
              "Connecting Supabase",
              "Adding your first section or page",
              "Pushing to GitHub or deploying"
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            💡 Beginner-Friendly. Developer-Ready.
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            When you purchase any Fluxedita package, you're not just getting a website — you're stepping into the world of real app development.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left max-w-3xl mx-auto mb-10">
            <h3 className="text-xl font-semibold mb-4">For aspiring developers, career switchers, and curious learners, Fluxedita is a hands-on crash course in modern web development:</h3>
            <ul className="space-y-3">
              {[
                "Use real tools (VS Code, Git, CLI, etc.)",
                "Deploy and manage a full-stack app",
                "Work with APIs like Supabase, Stripe, and Cloudinary",
                "Understand modern frameworks like React, Next.js, and Tailwind CSS",
                "Learn the building blocks of scalable app architecture"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-300 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <p className="text-xl font-medium italic mt-12">
            "Fluxedita doesn't just help you build websites — it helps you become a developer."
          </p>
          <p className="text-xl font-medium mt-8">Where else can you learn full-stack development, launch your first site, and get a premium-grade app — all starting at just <a href="/pricing"><b></b>£99</a>?</p>
          
          <div className="mt-10">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-6 text-lg">
                <a href="/pricing">
              Start Your Development Journey
                </a>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
