import { Users, Briefcase, Code, Palette, Building } from "lucide-react"

const userTypes = [
  {
    icon: Users,
    type: "Beginners",
    features: [
      "Full site control, no code required",
      "Intuitive visual editing",
      "No technical skills needed",
      "Real-time preview",
      "Guided setup process",
    ],
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Briefcase,
    type: "Freelancers",
    features: [
      "Craft stunning, client-editable sites",
      "Client-friendly interfaces",
      "Professional templates",
      "Easy handoff process",
      "Recurring revenue potential",
    ],
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Code,
    type: "Developers",
    features: [
      "Extend and customize without limits",
      "Modern tech stack",
      "Extensible architecture",
      "API integrations",
      "Custom component support",
    ],
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: Palette,
    type: "Creators",
    features: [
      "Effortlessly publish and monetize content",
      "Media-rich galleries",
      "Member engagement tools",
      "Monetization features",
      "Analytics insights",
    ],
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: Building,
    type: "Agencies",
    features: [
      "Scale projects with a repeatable structure",
      "White-label solutions",
      "Scalable architecture",
      "Client management tools",
      "Team collaboration",
    ],
    color: "from-orange-500 to-red-600",
  },
]

export function BuiltForEveryone() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Built for Everyone</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're just starting out or scaling a content platform, Fluxedita adapts to your needs and grows
            with your ambitions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userTypes.map((user, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div
                className={`w-16 h-16 bg-gradient-to-r ${user.color} rounded-full flex items-center justify-center mb-6`}
              >
                <user.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{user.type}</h3>
              <ul className="space-y-2">
                {user.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
