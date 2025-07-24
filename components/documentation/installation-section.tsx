"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // Import Card components
import {
  FolderOpen,
  FileText,
  GitBranch,
  Github,
  Database,
  Cloud,
  LogIn,
  Mail,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Code,
  Sparkles,
  HelpCircle,
  ArrowDown,
  ArrowUp,
  Zap,
  TrendingUp,
} from "lucide-react"

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.7, 
      ease: [0.16, 1, 0.3, 1] // easeOutExpo
    } 
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
    },
  },
}

const introHighlights = [
  {
    icon: Zap,
    title: "Effortless Setup",
    description: "Go from download to live website in minutes, no coding experience required.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Cloud,
    title: "Essential Integrations",
    description: "Seamlessly connect with free tiers of Gmail, GitHub, Supabase, Cloudinary, and Vercel.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: TrendingUp,
    title: "Scalable & Future-Proof",
    description: "The same streamlined process works for all packages, ensuring long-term growth.",
    color: "from-purple-500 to-violet-600",
  },
]

const installationSteps = [
  {
    id: "intro",
    icon: Sparkles,
    title: "Welcome to Fluxedita Installation Guide",
    fullContent: (
      <>
        <p>
          Welcome! This guide will walk you through setting up your Fluxedita site from scratch—whether you received a
          zip file or are cloning from GitHub. No coding experience required. If you can follow simple instructions,
          you'll be up and running in no time.
        </p>
        <p className="mt-4">
          Building your website has never been easier — with just a few simple steps, you can go from downloading your
          Fluxedita package to having a live, editable website ready to go. Whether you're using a basic landing page or
          a premium package, the installation process is the same — making it scalable and future-proof for all your
          needs.
        </p>
        <p className="mt-4">
          This guide will walk you through the entire process of setting up your Fluxedita site. No coding experience
          required — if you can follow simple instructions, you'll be up and running in no time.
        </p>
      </>
    ),
  },
  {
    id: "what-you-need",
    icon: CheckCircle,
    title: "What You’ll Need Before You Start",
    fullContent: (
      <>
        <p>
          To get your Fluxedita site up and running, you’ll need free accounts on a few platforms. These services power
          different aspects of your site:
        </p>
        <div className="overflow-x-auto my-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Platform
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Purpose
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <strong>Gmail</strong>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  For sending contact form emails (via SMTP)
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <strong>GitHub</strong>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  For code storage and linking with Vercel
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <strong>Supabase</strong>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  For user login, admin access, and storage
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <strong>Cloudinary</strong>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  For image/video hosting and optimization
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <strong>Vercel</strong>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  For hosting your site and deploying from GitHub
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="italic text-sm text-gray-500">
          *All of these platforms have free tiers—perfect for personal projects, portfolios, and small businesses.
        </p>
      </>
    ),
  },
  {
    id: "unzip",
    icon: FolderOpen,
    title: "1. Unzip Your Fluxedita Package (If Applicable)",
    fullContent: (
      <>
        <p>If you received a `.zip` file (e.g., after purchase):</p>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>Unzip it to a folder of your choice.</li>
          <li>Open the folder in VS Code (or any code editor).</li>
        </ul>
        <p className="mt-4">
          If you are <strong>cloning from GitHub</strong>:
        </p>
        <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
          <code className="language-bash">
            {"git clone https://github.com/jamescroanin/fluxedita.git\ncd fluxedita"}
          </code>
        </pre>
      </>
    ),
  },
  {
    id: "env-file",
    icon: FileText,
    title: "2. Prepare Your Environment File (.env.local)",
    fullContent: (
      <>
        <p>
          Fluxedita needs to communicate with third-party services like Supabase, Cloudinary, and Gmail. You’ll
          configure these services in a secure `.env.local` file:
        </p>
        <ol className="list-decimal list-inside ml-4 mt-2">
          <li>
            In your project folder, locate `.env.example` and rename it to `.env.local`:
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
              <code className="language-bash">{"cp env.example .env.local"}</code>
            </pre>
          </li>
          <li>
            Open `.env.local` in a text editor. Replace the placeholders with your credentials:
            <ul className="list-disc list-inside ml-8 mt-2">
              <li>
                <strong>Supabase:</strong> `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
                `SUPABASE_SERVICE_ROLE_KEY`
              </li>
              <li>
                <strong>Cloudinary:</strong> `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_CLOUDINARY_API_KEY`,
                `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
              </li>
              <li>
                <strong>Gmail:</strong> `GMAIL_APP_PASSWORD` (see Contact Form Setup below)
              </li>
              <li>
                <strong>Other SMTP:</strong> (Optional) If not using Gmail, use your provider's SMTP credentials
              </li>
              <li>
                <strong>Stripe:</strong> (Optional, for payments)
              </li>
            </ul>
          </li>
        </ol>
        <p className="text-red-600 font-semibold mt-4">
          Important: Keep your credentials private and do not share them.
        </p>
      </>
    ),
  },
  {
    id: "init-git",
    icon: GitBranch,
    title: "3. Initialize Git (Locally)",
    fullContent: (
      <>
        <p>If you started from a zip file, initialize git:</p>
        <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
          <code className="language-bash">{'git init\ngit add .\ngit commit -m "Initial commit"'}</code>
        </pre>
        <p className="mt-4">
          Your project is now under Git version control. The Fluxedita package already includes a `.gitignore` file.
        </p>
      </>
    ),
  },
  {
    id: "github-repo",
    icon: Github,
    title: "4. Create a GitHub Repository",
    fullContent: (
      <>
        <ol className="list-decimal list-inside ml-4 mt-2">
          <li>Go to GitHub and create a new empty repository (don’t add any files).</li>
          <li>
            Link your local project folder to GitHub:
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
              <code className="language-bash">
                {
                  "git branch -M main\ngit remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git\ngit push -u origin main"
                }
              </code>
            </pre>
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "install-node",
    icon: Code,
    title: "5. Install Node.js and Project Dependencies",
    fullContent: (
      <>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>
            Download and install Node.js (LTS version recommended) from{" "}
            <a
              href="https://nodejs.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              nodejs.org
            </a>
            .
          </li>
          <li>
            After installation, check your version:
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
              <code className="language-bash">{"node -v\nnpm -v"}</code>
            </pre>
            <p className="mt-2">You should see Node.js v18+ and npm v9+ (or similar).</p>
          </li>
          <li>
            In your project folder, run:
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
              <code className="language-bash">{"npm install"}</code>
            </pre>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "supabase-setup",
    icon: Database,
    title: "6. Set Up Your Supabase Project",
    fullContent: (
      <>
        <ol className="list-decimal list-inside ml-4 mt-2">
          <li>
            Go to your{" "}
            <a
              href="https://app.supabase.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Supabase dashboard
            </a>{" "}
            and create a new project.
          </li>
          <li>
            In your project, go to the SQL editor and run the following scripts (found in the `supabase` folder):
            <ul className="list-disc list-inside ml-8 mt-2">
              <li>`supabase_first_init_script.sql` (or `init.sql`)</li>
              <li>`combined_rls_policies.sql` (or `rls_policies.sql`)</li>
            </ul>
          </li>
          <li>Create your first user in Supabase (see `supabase/FIRST_USER_SETUP.md`).</li>
          <li>
            Apply the `promote_to_admin.sql` script to promote the user to an 'admin' role with a 'premium' membership.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "deploy-vercel",
    icon: Cloud,
    title: "7. Deploy to Vercel",
    fullContent: (
      <>
        <ol className="list-decimal list-inside ml-4 mt-2">
          <li>
            Go to{" "}
            <a
              href="https://vercel.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Vercel
            </a>{" "}
            and log in with GitHub.
          </li>
          <li>Import your GitHub repository into Vercel.</li>
          <li>
            When prompted, enter your `.env.local` values (Supabase, Cloudinary, Gmail, etc.) in the Vercel environment
            variables section.
          </li>
          <li>Click Deploy.</li>
        </ol>
        <p className="mt-4">
          Within a couple of minutes, your site will be live at:{" "}
          <span className="font-semibold text-blue-600">`https://your-project-name.vercel.app`</span>
        </p>
      </>
    ),
  },
  {
    id: "login-edit",
    icon: LogIn,
    title: "8. Log In and Start Editing",
    fullContent: (
      <>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>Open your live site.</li>
          <li>Log in as the admin user you created in Supabase.</li>
          <li>
            You’re now in full control! Start editing pages, managing content, and customizing your site right from your
            browser.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "contact-form",
    icon: Mail,
    title: "9. Contact Form Setup (Gmail SMTP)",
    fullContent: (
      <>
        <p>
          Fluxedita includes a built-in contact form powered by Gmail’s SMTP service. When users fill out the form,
          you’ll get notifications directly in your Gmail inbox.
        </p>
        <h4 className="font-semibold text-gray-900 mt-4 mb-2">To set up Gmail SMTP:</h4>
        <ol className="list-decimal list-inside ml-4 mt-2">
          <li>Enable 2-Step Verification on your Gmail account.</li>
          <li>
            Generate an App Password (see{" "}
            <a href="./CONFIGURE_CONTACT_FORM_GMAIL.md" className="text-blue-600 hover:underline">
              Configure Contact Form Gmail Guide
            </a>
            ).
          </li>
          <li>Add the app password to your `.env.local` as `GMAIL_APP_PASSWORD`.</li>
        </ol>
        <h4 className="font-semibold text-gray-900 mt-4 mb-2">
          Want to use another mail service (e.g., Outlook, Zoho, SendGrid)?
        </h4>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>Just update the SMTP fields in your `.env.local` file and redeploy through Vercel.</li>
        </ul>
      </>
    ),
  },
  {
    id: "updating-site",
    icon: RefreshCw,
    title: "10. Updating Your Site",
    fullContent: (
      <>
        <p>To push any updates to your live site:</p>
        <ol className="list-decimal list-inside ml-4 mt-2">
          <li>Make your changes locally.</li>
          <li>
            Run the following commands:
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
              <code className="language-bash">
                {'git add .\ngit commit -m "Update page or section"\ngit push origin main'}
              </code>
            </pre>
          </li>
          <li>Vercel will automatically redeploy your site with the changes.</li>
        </ol>
      </>
    ),
  },
  {
    id: "troubleshooting",
    icon: AlertTriangle,
    title: "11. Troubleshooting & Common Issues",
    fullContent: (
      <>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>
            <strong>Missing or invalid environment variables:</strong> Double-check your `.env.local` file. Make sure
            there are no extra spaces or missing values.
          </li>
          <li>
            <strong>Supabase/Cloudinary errors:</strong> Ensure your keys are correct and your Supabase/Cloudinary
            projects are active.
          </li>
          <li>
            <strong>Port already in use:</strong> If `localhost:3000` is busy, stop other apps or change the port in
            `package.json` or with `PORT=3001 npm run dev`.
          </li>
          <li>
            <strong>Database connection issues:</strong> Make sure your Supabase project is running and accessible.
          </li>
          <li>
            <strong>Other errors:</strong> Check the terminal output and browser console for details. Most issues are
            due to misconfigured environment variables.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "get-help",
    icon: HelpCircle,
    title: "12. Where to Get Help",
    fullContent: (
      <>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>
            Check the main{" "}
            <a href="./README.md" className="text-blue-600 hover:underline">
              README.md
            </a>{" "}
            for more details on features and architecture.
          </li>
          <li>
            See{" "}
            <a href="./supabase/SETUP_README.md" className="text-blue-600 hover:underline">
              `supabase/SETUP_README.md`
            </a>{" "}
            for advanced database setup.
          </li>
          <li>
            <strong>
              For first user and admin setup, see{" "}
              <a href="./supabase/FIRST_USER_SETUP.md" className="text-blue-600 hover:underline">
                `supabase/FIRST_USER_SETUP.md`
              </a>
              .
            </strong>
          </li>
          <li>
            <strong>
              For details on API routes, access control, and user roles, see the{" "}
              <a href="./README.md" className="text-blue-600 hover:underline">
                README.md
              </a>{" "}
              and{" "}
              <a href="./supabase/SETUP_README.md" className="text-blue-600 hover:underline">
                `supabase/SETUP_README.md`
              </a>
              .
            </strong>
          </li>
          <li>
            See{" "}
            <a href="./CONFIGURE_CONTACT_FORM_GMAIL.md" className="text-blue-600 hover:underline">
              Configure Contact Form Gmail Guide
            </a>{" "}
            for email setup.
          </li>
          <li>
            Open an issue on{" "}
            <a
              href="https://github.com/jamescroanin/fluxedita/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub
            </a>{" "}
            if you get stuck.
          </li>
          <li>Contact the development team at support@your-domain.com (if available).</li>
          <li>
            (Optional) Join our Discord community, watch setup tutorials on our YouTube Channel, or check for an
            installation video if available.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "summary-checklist",
    icon: CheckCircle,
    title: "13. Summary Checklist",
    fullContent: (
      <>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>Create free accounts on Gmail, GitHub, Supabase, Cloudinary, and Vercel.</li>
          <li>Unzip and open your project in VS Code (or clone from GitHub).</li>
          <li>Set up your `.env.local` file with the required API keys.</li>
          <li>Initialize Git and push to GitHub.</li>
          <li>Install Node.js and run `npm install`.</li>
          <li>Populate your Supabase project with the SQL scripts and create your admin user.</li>
          <li>Deploy via Vercel, entering your environment variables during setup.</li>
          <li>Log in and start editing your website.</li>
          <li>Set up Gmail SMTP for the contact form (or another provider).</li>
        </ul>
        <p className="mt-4">
          <strong>You're ready to start building! 🎉</strong>
        </p>
      </>
    ),
  },
]

export function InstallationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [showFullContent, setShowFullContent] = useState(false)

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Installation Process</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A quick overview of the steps to get your Fluxedita site up and running.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showFullContent ? (
            <motion.div
              key="highlights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            >
              {introHighlights.map((item, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.08)" }}
                >
                  <Card className="h-full flex flex-col items-center text-center p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardHeader className="pb-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                      >
                        <item.icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="full-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-12"
            >
              {installationSteps.map((item, index) => (
                <div key={item.id} className="flex flex-col md:flex-row items-start gap-8">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-2xl font-bold">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">{item.title}</h3>
                    <div className="text-lg text-gray-700">{item.fullContent}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => setShowFullContent(!showFullContent)}
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            {showFullContent ? (
              <>
                Show Less <ArrowUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Show More <ArrowDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  )
}
