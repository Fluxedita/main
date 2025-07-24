import { Users, Briefcase, Code, Palette, Building } from "lucide-react"

const userTypes = [
  {
    icon: Users,
    type: "Beginners",
    benefit: "Full site control with no coding required",
  },
  {
    icon: Briefcase,
    type: "Freelancers",
    benefit: "Build stunning, client-editable websites",
  },
  {
    icon: Code,
    type: "Developers",
    benefit: "Extend and customize without limitations",
  },
  {
    icon: Palette,
    type: "Creators",
    benefit: "Publish, manage, and monetize content",
  },
  {
    icon: Building,
    type: "Agencies",
    benefit: "Scale projects with repeatable structure",
  },
]

export function ForEveryone() {
  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Designed for Everyone</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're just starting out or scaling a content platform, FluxEdita adapts to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {userTypes.map((user, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <user.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{user.type}</h3>
              <p className="text-gray-600 text-sm">{user.benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
