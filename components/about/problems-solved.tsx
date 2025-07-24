import { AlertCircle, Zap, Shield, TrendingUp, Palette, DollarSign, Wrench, Server, Folder, Users } from "lucide-react"

const problems = [
  {
    icon: AlertCircle,
    title: "Tool Overload & Workflow Fragmentation",
    detailedPainPoint:
      "Constantly switching between website builders, code editors, CMS dashboards, media platforms, and analytics tools.",
    detailedSolution:
      "Fluxedita consolidates all tools into a single live-editable platform — everything happens in-browser, on the site.",
    color: "from-red-500 to-pink-600",
  },
  {
    icon: Zap,
    title: "Confusing & Bloated CMS Interfaces",
    detailedPainPoint:
      "Traditional CMSs (e.g., WordPress) can be overwhelming, with nested menus and non-intuitive controls.",
    detailedSolution: "A clean, minimal admin interface and visual editing experience simplify the entire process.",
    color: "from-yellow-500 to-orange-600",
  },
  {
    icon: Shield,
    title: "Lack of Technical Skills",
    detailedPainPoint: "Many users cannot code or navigate developer-centric tools.",
    detailedSolution:
      "Intuitive, WYSIWYG-style live editing makes building and updating websites accessible to anyone who can click and type.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Palette,
    title: "Limited Creative Control",
    detailedPainPoint: "Drag-and-drop builders or rigid templates limit layout freedom and scalability.",
    detailedSolution:
      "Full layout control, reusable components, custom page routing, and dynamic content support enable true creative flexibility.",
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: Users,
    title: "No Built-In User or Media Management",
    detailedPainPoint: "Managing members and media often requires plugins, integrations, or third-party platforms.",
    detailedSolution:
      "Built-in CRUD interfaces for members and media, including role-based access and Cloudinary-powered uploads.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: TrendingUp,
    title: "Poor Audience Insight & Feedback Tools",
    detailedPainPoint: "Understanding site performance and user behavior typically involves external analytics tools.",
    detailedSolution:
      "Real-time analytics dashboard and (for premium users) comment systems integrated directly into the admin console.",
    color: "from-cyan-500 to-teal-600",
  },
  {
    icon: DollarSign,
    title: "Difficulty Monetizing Content",
    detailedPainPoint: "Setting up payments or membership gates can be complex and risky.",
    detailedSolution:
      "Stripe-ready payment integration and Supabase-managed membership authentication make it easy to launch paid services.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Wrench,
    title: "Developer Bottlenecks",
    detailedPainPoint: "Non-technical teams depend on developers for every small site change or content update.",
    detailedSolution:
      "Non-devs can manage pages and media live, while devs still have the freedom to extend and customize the platform.",
    color: "from-gray-500 to-gray-600",
  },
  {
    icon: Server,
    title: "Scalability Concerns",
    detailedPainPoint: "Sites built with lightweight tools often can't scale to meet business or content demands.",
    detailedSolution:
      "Modular architecture with unlimited page support, dynamic routing, and tiered packages for growing needs.",
    color: "from-lime-500 to-green-600",
  },
  {
    icon: Folder,
    title: "Disconnected Content & Media Handling",
    detailedPainPoint: "Media is often uploaded through separate interfaces or poorly optimized for web.",
    detailedSolution:
      "Integrated Cloudinary support with optimized previews, lightbox viewers, and auto-generated media pages.",
    color: "from-indigo-500 to-purple-600",
  },
]

export function ProblemsSolved() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Real Problems We Solve</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've identified the pain points that hold creators back and built solutions directly into our platform.
          </p>
        </div>

        <div className="space-y-6">
          {problems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mb-4 md:mb-0 md:mr-6 flex-shrink-0`}
              >
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-700 font-medium mb-2">❌ Pain Point:</p>
                <p className="text-gray-600">{item.detailedPainPoint}</p>
                <p className="text-gray-700 font-medium mt-3 mb-2">✅ Fluxedita Solution:</p>
                <p className="text-gray-600">{item.detailedSolution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
