"use client"

import {
  AlertTriangle,
  FileSearch,
  Key,
  Mail,
  GitBranch,
  Bot,
  CloudOff,
  UserCheck,
  LifeBuoy,
  BookOpen,
  Lightbulb,
  CheckCircle,
  Code,
  Layout,
  Settings,
  X,
  Info,
  Phone,
  MessageCircle,
  Users,
  Star
} from "lucide-react"
import { motion, AnimatePresence, easeOut } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { JSX } from "react/jsx-runtime"
import { InstallationGuide } from "@/components/installation-guide" // Import the full component

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easeOut } },
}

const dialogContentVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
  exit: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.3, ease: easeOut } },
}

interface SupportOption {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  premium: boolean;
  action: () => void;
}

export function HelpPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [openDialog, setOpenDialog] = useState(false)
  const supportOptions: SupportOption[] = [
    {
      title: "Community Forum",
      description: "Connect with other users and find answers to common questions",
      icon: Users,
      premium: false,
      action: () => window.open("https://community.fluxedita.com", "_blank")
    },
    {
      title: "Documentation",
      description: "Browse our comprehensive guides, tutorials, and API references",
      icon: BookOpen,
      premium: false,
      action: () => window.location.href = "/documentation"
    },
    {
      title: "Email Support",
      description: "Get help from our support team (response time varies by plan)",
      icon: Mail,
      premium: false,
      action: () => window.location.href = "/contact"
    },
    {
      title: "Live Chat",
      description: "Real-time assistance during business hours (Premium only)",
      icon: MessageCircle,
      premium: true,
      action: () => setDialogContent({
        title: "Premium Support Required",
        content: (
          <div className="space-y-4">
            <p>Live chat support is available to Multi-page and Premium package subscribers.</p>
            <div className="flex gap-2">
              <Button onClick={() => window.location.href = "/pricing"}>
                View Plans
              </Button>
              <Button variant="outline" onClick={() => setOpenDialog(false)}>
                Close
              </Button>
            </div>
          </div>
        )
      })
    },
    {
      title: "Phone Support",
      description: "24/7 emergency support (Premium only)",
      icon: Phone,
      premium: true,
      action: () => setDialogContent({
        title: "Premium Support Required",
        content: (
          <div className="space-y-4">
            <p>24/7 phone support is available to Premium package subscribers.</p>
            <div className="flex gap-2">
              <Button onClick={() => window.location.href = "/pricing"}>
                Upgrade to Premium
              </Button>
              <Button variant="outline" onClick={() => setOpenDialog(false)}>
                Close
              </Button>
            </div>
          </div>
        )
      })
    }
  ]

  const [dialogContent, setDialogContent] = useState<{ title: string; content: JSX.Element | null }>({
    title: "",
    content: null,
  })

  const handleOpenGuide = (title: string, content: JSX.Element) => {
    setDialogContent({ title, content })
    setOpenDialog(true)
  }

  const troubleshootingItems = [
    {
      icon: AlertTriangle,
      title: "Incorrect or broken .env values",
      symptoms: "Errors during Vercel deployment or app crashes on load.",
      causes: [
        "Extra spaces around keys (e.g., `SUPABASE_URL = https://...` instead of `SUPABASE_URL=https://...`)",
        "Missing variables entirely",
        "Using regular Gmail password instead of an App Password",
      ],
      fix: [
        "Always copy/paste .env values with no spaces around the equals sign",
        'Use double quotes (`""`) only if your value contains special characters or spaces',
        "Use the `.env.example` file as your checklist",
        "Double-check you’re pasting values into both the local `.env` file AND Vercel’s Environment Variables section",
      ],
      proTip:
        "If the site breaks on Vercel but works locally, check for missing or mistyped .env values in your Vercel project dashboard.",
      relatedGuides: [
        { text: "INSTALLATION_GUIDE.md", type: "link", link: "/documentation#installation" },
        { text: "CONFIGURE_CONTACT_FORM_GMAIL.md", type: "link", link: "/documentation#configure-contact-form-gmail" },
      ],
    },
    {
      icon: FileSearch,
      title: "Can’t find a file or folder in the code editor",
      symptoms: "“Where is .env?” “Where are the SQL scripts?” “I can’t find pages/index.tsx…”",
      fix: [
        "Use the file search shortcut in your code editor (e.g., VS Code): `Ctrl + P` (Windows/Linux) or `Cmd + P` (Mac)",
        "Then start typing the file name: `.env`, `supabase.sql`, `admin_promotion.sql`",
      ],
      proTip: "Don’t dig through folders — search is faster!",
      relatedGuides: [
        { text: "Initialize Local Repo + Optional Remote", type: "link", link: "/documentation#repo-initialization-optional-remote" },
        { text: "EDITABLE_PAGES_AND_SECTIONS_GUIDE.md", type: "link", link: "/documentation#editable-pages" },
      ],
    },
    {
      icon: Key,
      title: "Supabase or Cloudinary API keys not found",
      symptoms: "Auth errors, broken images, user creation fails, etc.",
      fix: [
        "In Supabase: Go to your project → ⚙️ Settings → API. Copy anon key and project URL",
        "In Cloudinary: Dashboard → Account Details → Copy cloud_name, api_key, and api_secret",
      ],
      proTip: "If your images or videos don’t load, double-check your Cloudinary URL setup and that media is uploaded.",
      relatedGuides: [
        { text: "SUPABASE_SETUP_GUIDE.md", type: "link", link: "/documentation#supabase-setup-guide" },
        { text: "CLOUDINARY_SETUP_GUIDE.md", type: "link", link: "/documentation#cloudinary-setup-guide" },
        { text: "CONFIGURE_CONTACT_FORM_GMAIL.md", type: "link", link: "/documentation#configure-contact-form-gmail" },
      ],
    },
    {
      icon: Mail,
      title: "Email/SMTP not working",
      symptoms: "The contact form doesn’t send messages.",
      fix: [
        "Use Gmail App Passwords — not your Gmail login password",
        "Enable 2FA on your Gmail account before you can generate an app password",
        "Use the following .env setup:",
        "```ini\nSMTP_HOST=smtp.gmail.com\nSMTP_PORT=465\nSMTP_USER=your@gmail.com\nSMTP_PASS=your_app_password\n```",
      ],
      proTip: "You can test SMTP locally with a tool like Mailtrap if you're not ready for Gmail setup.",
      relatedGuides: [{ text: "CONFIGURE_CONTACT_FORM_GMAIL.md", type: "link", link: "/documentation#configure-contact-form-gmail" }],
    },
    {
      icon: GitBranch,
      title: "Git push fails or authentication errors",
      symptoms: "`fatal: repository not found`, `Permission denied`, Push fails silently",
      fix: [
        "If using a remote (e.g., GitHub), ensure it has no README or .gitignore if you're pushing an existing project",
        "Run these commands (if starting over):",
        '```bash\ngit init\ngit add .\ngit commit -m "First commit"\ngit branch -M main\n# Optional remote example (GitHub)\ngit remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git\ngit push -u origin main\n```',
      ],
      proTip: "If Git keeps asking for a username/password, consider setting up SSH keys.",
      relatedGuides: [{ text: "Initialize Local Repo + Optional Remote", type: "link", link: "/documentation#repo-initialization-optional-remote" }],
    },
    {
      icon: Bot,
      title: "Overwhelmed by command line? Use GitHub Copilot",
      symptoms: "“I’m new to Git.” “I don’t know how to fix this error.” “I don’t know what this code means.”",
      fix: [
        "Install GitHub Copilot in VS Code — it can:",
        "Auto-complete Git commands",
        "Suggest .env structure",
        "Help you write queries or modify code",
        "Detect missing or invalid syntax",
      ],
      proTip:
        "Think of Copilot as your personal assistant — type natural language comments like: `// create a section with a hero and slider component`",
      relatedGuides: [],
    },
    {
      icon: CloudOff,
      title: "Vercel Deployment Fails Unexpectedly",
      symptoms: "App won’t deploy, White screen or generic 500 error on first visit",
      fix: [
        "If importing from GitHub, confirm the repo is accessible/connected; otherwise use Vercel CLI for local deploy",
        "Ensure all required .env variables are set correctly",
        "Verify that “Root Directory” in Vercel is empty unless your code is nested",
      ],
      proTip: "Check Vercel’s Logs tab for exact error messages. It’s very helpful.",
      relatedGuides: [],
    },
    {
      icon: UserCheck,
      title: "Forgot to Promote Supabase User to Admin",
      symptoms: "You can log in, but don’t have admin editing rights",
      fix: [
        "Run the third SQL script: `promote_user_to_admin.sql`",
        "Replace the UUID in the query with your user’s UUID from Supabase Auth",
      ],
      proTip: 'Your admin user should have both "admin" role and "premium" membership.',
      relatedGuides: [{ text: "SUPABASE_SETUP_GUIDE.md", type: "link", link: "/documentation#supabase-setup-guide" }],
    },
    {
      icon: Layout,
      title: "Unsure How to Build/Edit Sections",
      symptoms: "You’re logged in, but don’t know how to use the page editor or add content.",
      fix: ["Use the Page Editor and Sidebar to add new section components.", "All sections are modular and reusable."],
      relatedGuides: [
        { text: "EDITABLE_PAGES_AND_SECTIONS_GUIDE.md", type: "link", link: "/documentation#editable-pages" },
        { text: "EDITABLE_SECTION_COMPONENT_GUIDE.md", type: "link", link: "/documentation#editable-section-components" },
        { text: "SECTION_COMPONENT_QUICK_REFERENCE.md", type: "link", link: "/documentation#section-component-quick-reference" },
      ],
    },
    {
      icon: Code,
      title: "Want to Customize Layout or Add Code?",
      symptoms: null,
      fix: ["Use the Custom Code Section to add HTML/CSS/JS directly via JSX."],
      relatedGuides: [{ text: "CUSTOM_CODE_GUIDE.md", type: "link", link: "/documentation#custom-code-guide" }],
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
              <LifeBuoy className="h-4 w-4" />
              <span>Need a Hand?</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Common Issues
            </span>
            <br />
            When Installing Fluxedita
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Here you'll find solutions to common problems encountered during the Fluxedita installation process, along
            with helpful tips and friendly reminders to get you back on track.
          </p>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            We've got your back! If you can't find your answer here, check out our other support options below.
          </p>
        </motion.div>

        {/* Onboarding Services Section */}
        <motion.div
          className="mb-16"
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            One-Time Setup & Customization — $1,000–$2,500
          </h2>
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-2">
                  <p className="text-lg text-gray-700 mb-4">
                    Launch your Fluxedita site fully branded and ready to go. Perfect for teams who want a
                    done-for-you start.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Brand styling (colors, fonts, logos, layouts)</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Full onboarding & guided walkthrough</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Custom tweaks to match your workflow</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Content preload (sample or supplied)</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Integration setup (Cloudinary, Stripe, analytics, etc.)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="rounded-lg border border-gray-200 p-5 bg-gray-50">
                    <div className="text-center">
                      <p className="text-sm uppercase tracking-wide text-gray-500">One-Time Setup Fee</p>
                      <p className="text-3xl font-extrabold text-gray-900 mt-1">$1,000–$2,500</p>
                      <p className="text-sm text-gray-600 mt-2">Then $149–$199/mo ongoing</p>
                    </div>
                    <div className="mt-5 flex flex-col sm:flex-row gap-3">
                      <Button className="flex-1" onClick={() => (window.location.href = "/contact")}>
                        Request Onboarding
                      </Button>
                      <Button variant="outline" className="flex-1" onClick={() => (window.location.href = "/pricing")}>
                        See Plans
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      Works especially well for businesses that prefer a fully managed, guided start.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Troubleshooting Sections */}
        <div className="space-y-16">
          {troubleshootingItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col md:flex-row items-start gap-8"
              variants={sectionVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-2xl font-bold">
                <item.icon className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{item.title}</h2>
                {item.symptoms && (
                  <>
                    <p className="text-gray-700 font-medium mb-2">Symptoms:</p>
                    <p className="text-lg text-gray-600 mb-4">{item.symptoms}</p>
                  </>
                )}
                {item.causes && (
                  <>
                    <p className="text-gray-700 font-medium mb-2">Most common causes:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                      {item.causes.map((cause, i) => (
                        <li key={i}>{cause}</li>
                      ))}
                    </ul>
                  </>
                )}
                <p className="text-gray-700 font-medium mb-2">Fix:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                  {item.fix.map((fix, i) => (
                    <li key={i}>
                      {fix.startsWith("```") ? (
                        <pre className="bg-gray-800 text-white p-3 rounded-md overflow-x-auto my-2">
                          <code className="language-bash">{fix.replace(/```[a-z]*\n|\n```/g, "")}</code>
                        </pre>
                      ) : (
                        fix
                      )}
                    </li>
                  ))}
                </ul>
                {item.proTip && (
                  <p className="text-green-600 font-semibold flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2" />
                    Pro Tip: <span className="ml-1 font-normal text-gray-700">{item.proTip}</span>
                  </p>
                )}
                {item.relatedGuides && item.relatedGuides.length > 0 && (
                  <div className="mt-4">
                    <p className="text-gray-700 font-medium mb-2">Related Guides:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {item.relatedGuides.map((guide, idx) => (
                        <li key={idx}>
                          {guide.type === "link" ? (
                            <a
                              href={guide.link}
                              className="text-blue-600 underline hover:text-blue-800"
                              target="_self"
                              rel="noopener noreferrer"
                            >
                              {guide.text}
                            </a>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final Troubleshooting Tips */}
        <motion.div
          className="mb-16 mt-20"
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
            <Settings className="h-8 w-8 text-blue-600 mr-3" />
            Final Troubleshooting Tips
          </h2>
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {supportOptions.map((option, index) => (
                  <motion.div
                    key={index}
                    className={`p-6 rounded-lg border ${option.premium ? 'bg-amber-50 border-amber-200' : 'bg-white border-gray-200'} hover:shadow-md transition-shadow`}
                    whileHover={{ y: -2 }}
                    onClick={option.action}
                  >
                    <div className="flex items-start">
                      <div className={`p-3 rounded-lg ${option.premium ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'} mr-4`}>
                        <option.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg flex items-center">
                          {option.title}
                          {option.premium && (
                            <span className="ml-2 bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                              Premium
                            </span>
                          )}
                        </h3>
                        <p className="text-gray-600 mt-1">{option.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <Info className="h-4 w-4 mr-2" />
                  Support Availability
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Email Support: 24-48h response (all plans)</li>
                  <li>• Priority Support: 4h response (Premium plan)</li>
                  <li>• Phone Support: 24/7 (Premium plan only)</li>
                  <li>• Live Chat: Business hours (Multi-page plan and above)</li>
                </ul>
                <div className="mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-blue-600 border-blue-300"
                    onClick={() => window.location.href = "/pricing"}
                  >
                    Compare Support Plans
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bonus: See All Available Docs */}
        <motion.div
          className="mb-16"
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
            Bonus: See All Available Docs
          </h2>
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <p className="text-lg text-gray-700 mb-4 text-center">
                For the full list of guides, including media upload tools, gallery setup, and disaster recovery:
              </p>
              <div className="text-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90" asChild>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      alert("Documentation Index coming soon!")
                    }}
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Documentation Index: Project Documentation & Guide Summary
                  </a>
                </Button>
              </div>
              <p className="text-lg text-gray-700 mt-6 text-center">
                <span className="font-semibold text-blue-600">✅ Pro Tip:</span> You don’t have to memorize everything.
                Our guides are built for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mt-4 max-w-md mx-auto text-left">
                <li>Beginners looking for step-by-step walkthroughs</li>
                <li>Intermediate users ready to explore structure</li>
                <li>Advanced devs customizing deeply with editable sections</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Dialog for Lightbox */}
      <AnimatePresence>
        {openDialog && (
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-white rounded-lg shadow-xl relative flex flex-col max-h-[90vh] border border-gray-200">
              <DialogHeader className="p-6 pb-4 border-b border-gray-200 flex flex-row items-center justify-between">
                <DialogTitle className="text-2xl font-bold text-gray-900">{dialogContent.title}</DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpenDialog(false)}
                  className="text-gray-500 hover:text-gray-900"
                >
                  <X className="h-6 w-6" />
                </Button>
              </DialogHeader>
              {/* The content is rendered directly here, not wrapped in DialogDescription */}
              <div className="p-6 overflow-y-auto flex-1 text-gray-700">
                <motion.div
                  variants={dialogContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {dialogContent.content}
                </motion.div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  )
}
