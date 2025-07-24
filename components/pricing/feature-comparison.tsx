import { Check, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const featureCategories = [
  {
    name: "Core Features & Functionality",
    features: [
      { name: "Live page editing with real-time preview", standard: true, root: true, multi: true, premium: true },
      { name: "Page Editor & Sidebar for easy management", standard: true, root: true, multi: true, premium: true },
      { name: "Cloudinary integration for media optimization", standard: true, root: true, multi: true, premium: true },
      { name: "Responsive design for all device types", standard: true, root: true, multi: true, premium: true },
      { name: "SEO optimized structure and meta tags", standard: true, root: true, multi: true, premium: true },
      { name: "Basic support with email assistance", standard: true, root: true, multi: true, premium: true },
      { name: "Comprehensive documentation and guides", standard: true, root: true, multi: true, premium: true },
    ],
  },
  {
    name: "Admin & Management Tools",
    features: [
      { name: "Admin console and dashboard access (admin only for Landing)", standard: true, root: true, multi: true, premium: true },
      { name: "Member management and user controls (admin only for Landing)", standard: true, root: true, multi: true, premium: true },
      { name: "Analytics dashboard and reporting tools (admin only for Landing)", standard: true, root: true, multi: true, premium: true },
    ],
  },
  {
    name: "Pages & Content Management",
    features: [
      { name: "Multiple pages and navigation systems", standard: true, root: true, multi: true, premium: true },
      { name: "Custom routing and advanced navigation", standard: true, root: true, multi: true, premium: true },
      { name: "Media library with CRUD functionality", standard: true, root: true, multi: true, premium: true },
      { name: "Member management with full CRUD operations (public/member-facing)", standard: true, root: true, multi: true, premium: true },
      { name: "Analytics dashboard with detailed insights", standard: true, root: true, multi: true, premium: true },
      { name: "Supabase integration with authentication system", standard: true, root: true, multi: true, premium: true },
      { name: "Stripe integration ready for payment processing", standard: true, root: true, multi: true, premium: true },
      { name: "Unlimited custom pages with dynamic content", standard: false, root: true, multi: true, premium: true },
      { name: "Custom slugs and advanced routing system", standard: false, root: true, multi: true, premium: true },
      { name: "Advanced page management tools and controls", standard: false, root: true, multi: true, premium: true },
      { name: "Enhanced analytics with comprehensive reporting", standard: false, root: true, multi: true, premium: true },
      { name: "Priority support with dedicated assistance", standard: false, root: true, multi: true, premium: true },
      { name: "Custom integrations and API access", standard: false, root: true, multi: true, premium: true },
      { name: "Advanced SEO tools and optimization features", standard: false, root: true, multi: true, premium: true },
    ],
  },
  {
    name: "Support & Assistance",
    features: [
      { 
        name: "Email support", 
        description: "Response time",
        standard: "48h", 
        root: "24h", 
        multi: "12h", 
        premium: "4h" 
      },
      { 
        name: "Support channels", 
        description: "Available support methods",
        standard: "Email only", 
        root: "Email + Community", 
        multi: "Email, Live Chat", 
        premium: "24/7 Phone & Email" 
      },
      { 
        name: "Dedicated support", 
        description: "Assigned account manager",
        standard: false, 
        root: false, 
        multi: false, 
        premium: true 
      },
      { 
        name: "Onboarding & Training", 
        description: "Included training sessions",
        standard: "Self-serve", 
        root: "1-hour session", 
        multi: "2-hour session", 
        premium: "Custom onboarding" 
      },
      { 
        name: "SLA & Uptime", 
        description: "Guaranteed uptime",
        standard: "Best effort", 
        root: "99.5%", 
        multi: "99.7%", 
        premium: "99.9%" 
      },
      { 
        name: "Business Reviews", 
        description: "Quarterly performance reviews",
        standard: false, 
        root: false, 
        multi: true, 
        premium: true 
      }
    ]
  },
  {
    name: "Premium & Media Features",
    features: [
      { name: "Media root pages (/gallery, /exclusive, /behind-the-scenes)", standard: false, root: false, multi: false, premium: true },
      { name: "Unlimited Media Sets with advanced organization", standard: false, root: false, multi: false, premium: true },
      { name: "Auto-generated media pages with dynamic content", standard: false, root: false, multi: false, premium: true },
      { name: "Lightbox & fullscreen viewing for all media", standard: false, root: false, multi: false, premium: true },
      { name: "Member commenting system with moderation tools", standard: false, root: false, multi: false, premium: true },
      { name: "Admin comments console for community management", standard: false, root: false, multi: false, premium: true },
      { name: "Advanced Cloudinary features with optimization", standard: false, root: false, multi: false, premium: true },
    ],
  },
]

const plans = [
  { id: "standard", name: "Standard", letter: "S", color: "bg-green-500" },
  { id: "root", name: "Root", letter: "R", color: "bg-blue-500" },
  { id: "multi", name: "Multi", letter: "M", color: "bg-purple-500" },
  { id: "premium", name: "Premium", letter: "P", color: "bg-orange-500" },
]

export function FeatureComparison() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive Feature Comparison</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare all features across our packages to find the perfect fit for your specific needs and requirements.
          </p>
        </div>

        <div className="space-y-8">
          {featureCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="overflow-hidden">
              <CardHeader className="bg-gray-100">
                <CardTitle className="text-xl font-bold text-gray-900">{category.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-4 px-6 font-semibold text-gray-900 min-w-[300px]">Feature</th>
                        {plans.map((plan) => (
                          <th key={plan.id} className="text-center py-4 px-4 min-w-[120px]">
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-8 h-8 ${plan.color} rounded-full flex items-center justify-center text-white font-bold text-sm mb-1`}
                              >
                                {plan.letter}
                              </div>
                              <span className="text-sm font-semibold text-gray-900">{plan.name}</span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {category.features.map((feature, featureIndex) => (
                        <tr key={featureIndex} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-6 font-medium text-gray-900">{feature.name}</td>
                          <td className="py-4 px-4 text-center">
                            {feature.standard ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-red-400 mx-auto" />
                            )}
                          </td>
                          <td className="py-4 px-4 text-center">
                            {feature.root ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-red-400 mx-auto" />
                            )}
                          </td>
                          <td className="py-4 px-4 text-center">
                            {feature.multi ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-red-400 mx-auto" />
                            )}
                          </td>
                          <td className="py-4 px-4 text-center">
                            {feature.premium ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-red-400 mx-auto" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
