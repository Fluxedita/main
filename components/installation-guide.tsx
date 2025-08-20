"use client"

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
  CheckCircle,
  BookOpen,
  MessageCircle,
  Youtube,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Play,
} from "lucide-react"
import { motion, Variants } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

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

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.16, 1, 0.3, 1] // easeOutExpo
    } 
  },
}

export function InstallationGuide() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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
            <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>Welcome to the Fluxedita Installation Guide!</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Fluxedita Installation Guide
            </span>
            <br />
            From Zip File to Live Website in Minutes
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Building your website has never been easier — with just a few simple steps, you can go from downloading your
            Fluxedita package to having a live, editable website ready to go. Whether you're using a basic landing page
            or a premium package, the installation process is the same — making it scalable and future-proof for all
            your needs.
          </p>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            This guide will walk you through the entire process of setting up your Fluxedita site. No coding experience
            required — if you can follow simple instructions, you'll be up and running in no time.
          </p>
        </motion.div>

        {/* What You'll Need Section */}
        <motion.div
          className="mb-16"
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
            What You’ll Need Before You Start:
          </h2>
          <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
            To get your Fluxedita site up and running, you’ll need a Supabase account. Other services like Gmail (SMTP),
            Cloudinary, GitHub, and a hosting provider (e.g., Vercel) are optional and interchangeable depending on your
            needs. These services power different aspects of your site:
          </p>
          <Card className="shadow-lg">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-xl font-bold text-gray-900">Platforms (what’s required vs optional)</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Gmail (optional)</h3>
                    <p className="text-gray-700 text-sm">For sending contact form emails (via SMTP). You can use any SMTP provider (e.g., Outlook, Zoho, SendGrid).</p>
                    <a
                      href="https://accounts.google.com/signup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm flex items-center mt-1"
                    >
                      Create Gmail <ArrowRight className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Github className="h-6 w-6 text-gray-800 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">GitHub (optional)</h3>
                    <p className="text-gray-700 text-sm">Optional remote for code hosting and Vercel import</p>
                    <a
                      href="https://github.com/join"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm flex items-center mt-1"
                    >
                      Create GitHub <ArrowRight className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Database className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Supabase</h3>
                    <p className="text-gray-700 text-sm">For user login, admin access, and storage</p>
                    <a
                      href="https://supabase.com/dashboard/new"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm flex items-center mt-1"
                    >
                      Create Supabase <ArrowRight className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Cloud className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Cloudinary (optional)</h3>
                    <p className="text-gray-700 text-sm">For image/video hosting and optimization. You can also use static assets or another media CDN.</p>
                    <a
                      href="https://cloudinary.com/users/register/free"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm flex items-center mt-1"
                    >
                      Create Cloudinary <ArrowRight className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <img
                    src="/placeholder.svg?height=24&width=24"
                    alt="Vercel Logo"
                    className="h-6 w-6 flex-shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">Vercel (optional)</h3>
                    <p className="text-gray-700 text-sm">Example hosting provider. Any Next.js-compatible host works (e.g., Netlify, Render, AWS Amplify, Fly.io).</p>
                    <a
                      href="https://vercel.com/signup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm flex items-center mt-1"
                    >
                      Create Vercel <ArrowRight className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-6 italic">
                Tip: All of these platforms have free tiers — perfect for personal projects, portfolios, and small
                businesses.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                You can deploy, manage, and host Fluxedita using any remote services that support Next.js. Pick the providers that fit your workflow.
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <div>&nbsp;</div>
        <div className="flex-1">
            <Play className="h-7 w-7 text-blue-600 mr-3"/>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                Watch the Fluxedita Installation Video
            </h2>
            <p className="text-lg text-gray-700 mb-4">
                Watch the Fluxedita Installation Video to learn how to install your new Fluxedita website in minutes.
            </p>
        </div>
        <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0 }}>
                        <iframe
                          src="https://www.youtube.com/embed/A7EKEwLvKXA"
                          title="Fluxedita Installation Guide"
                          frameBorder="2"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute top-0 left-0 w-full h-full rounded-lg"
                          width="75%"
                          height="75%"
                        />
                      </div>
                      <div>&nbsp;</div>
        {/* Installation Steps */}
        <div className="space-y-16">
          {/* Step 1 */}
          <motion.div
            className="flex flex-col md:flex-row items-start gap-8"
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-2xl font-bold">
              1
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                <FolderOpen className="h-7 w-7 text-blue-600 mr-3" />
                Step 1: Unzip Your Fluxedita Package
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Find the `.zip` file you received after purchase. Unzip it to a folder of your choice. Open the folder
                in VS Code (or any code editor).
              </p>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            className="flex flex-col md:flex-row items-start gap-8"
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-2xl font-bold">
              2
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="h-7 w-7 text-blue-600 mr-3" />
                Step 2: Prepare Your Environment File (.env)
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Fluxedita needs to communicate with third-party services like Supabase and Gmail to run your site.
                You’ll configure these services in a secure `.env` file:
              </p>
              <p className="text-gray-700 mb-2">
                In your project folder, locate `.env.example` and rename it to `.env`:
              </p>
              <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto mb-4">
                <code className="language-bash">mv .env.example .env</code>
              </pre>
              <p className="text-gray-700 mb-2">
                Open the `.env` file and replace the placeholders with your credentials:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                <li>
                  <span className="font-semibold">SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY</span> from
                  Supabase.
                </li>
                <li>
                  <span className="font-semibold">CLOUDINARY_CLOUD_NAME, API_KEY, API_SECRET, URL</span> from
                  Cloudinary.
                </li>
                <li>
                  <span className="font-semibold">GMAIL_APP_PASSWORD</span> (not your regular Gmail password —{" "}
                  <a
                    href="https://support.google.com/accounts/answer/185833?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    follow this guide to create one
                  </a>
                  ).
                </li>
              </ul>
              <p className="text-red-600 font-semibold">
                Important: Keep your credentials private and do not share them.
              </p>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            className="flex flex-col md:flex-row items-start gap-8"
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-2xl font-bold">
              3
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                <GitBranch className="h-7 w-7 text-blue-600 mr-3" />
                Step 3: Initialize Git (Locally)
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Open your terminal in the root folder of your project and run:
              </p>
              <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto mb-4">
                <code className="language-bash">
                  git init <br />
                  git add . <br />
                  git commit -m "Initial commit"
                </code>
              </pre>
              <p className="text-gray-700">
                Your project is now under Git version control. The Fluxedita package already includes a `.gitignore`
                file, so you're all set!
              </p>
            </div>
          </motion.div>

          {/* Step 4 */}
          <motion.div
            className="flex flex-col md:flex-row items-start gap-8"
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-2xl font-bold">
              4
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                <Github className="h-7 w-7 text-blue-600 mr-3" />
                Step 4 (Optional): Connect a Remote Repository (e.g., GitHub)
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                (Optional) Create a new empty repository on your preferred remote (e.g., GitHub). Then link your local
                project folder to the remote:
              </p>
              <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto mb-4">
                <code className="language-bash">
                  git branch -M main <br />
                  git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git <br />
                  git push -u origin main
                </code>
              </pre>
            </div>
          </motion.div>

          {/* Step 5 */}
          <motion.div
            className="flex flex-col md:flex-row items-start gap-8"
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-2xl font-bold">
              5
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                <Database className="h-7 w-7 text-blue-600 mr-3" />
                Step 5: Set Up Your Supabase Project
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Go to your Supabase dashboard and create a new project. Use the supplied SQL scripts to populate the new
                Supabase database:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                <li>`init.sql`</li>
                <li>`rls_policies.sql`</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Create your first user in Supabase. Apply the third script to promote the user to an 'admin' role with a
                'premium' membership.
              </p>
              <p className="text-gray-700">All scripts are located in the `supabase` folder within your project.</p>
            </div>
          </motion.div>

          {/* Step 6 */}
          <motion.div
            className="flex flex-col md:flex-row items-start gap-8"
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-2xl font-bold">
              6
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                <Cloud className="h-7 w-7 text-blue-600 mr-3" />
                Step 6: Deploy to Your Hosting Provider (e.g., Vercel)
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Choose your preferred Next.js-compatible hosting provider. If using Vercel, import your repository from GitHub (optional) or deploy from your local project using the Vercel CLI. Enter your `.env` values (Supabase and any optional services like Cloudinary or SMTP) in your host's environment settings. Deploy when ready.
              </p>
              <p className="text-lg text-gray-700">
                Within a couple of minutes, your site will be live at:{" "}
                <span className="font-semibold text-blue-600">https://your-project-name.vercel.app</span>
              </p>
            </div>
          </motion.div>

          {/* Step 7 */}
          <motion.div
            className="flex flex-col md:flex-row items-start gap-8"
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-2xl font-bold">
              7
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                <LogIn className="h-7 w-7 text-blue-600 mr-3" />
                Step 7: Log In and Start Editing
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Open your live site. Log in as the admin user you created in Supabase. You’re now in full control! Start
                editing pages, managing content, and customizing your site right from your browser.
              </p>
            </div>
          </motion.div>

          {/* Bonus: Contact Form Setup */}
          <motion.div
            className="flex flex-col md:flex-row items-start gap-8"
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-2xl font-bold">
              <Mail className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Bonus: Contact Form Setup</h2>
              <p className="text-lg text-gray-700 mb-4">
                Fluxedita includes a built-in contact form powered by Gmail’s SMTP service. When users fill out the
                form, you’ll get notifications directly in your Gmail inbox.
              </p>
              <p className="text-lg text-gray-700">
                Want to use another mail service (e.g., Outlook, Zoho, SendGrid)? Just update the SMTP fields in your
                `.env` file and redeploy through Vercel.
              </p>
            </div>
          </motion.div>

          {/* Updating Your Site */}
          <motion.div
            className="flex flex-col md:flex-row items-start gap-8"
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-2xl font-bold">
              <RefreshCw className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Updating Your Site</h2>
              <p className="text-lg text-gray-700 mb-4">To push any updates to your live site:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                <li>Make your changes locally.</li>
                <li>Run the following commands:</li>
              </ul>
              <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto mb-4">
                <code className="language-bash">
                  git add . <br />
                  git commit -m "Update page or section" <br />
                  git push origin main
                </code>
              </pre>
              <p className="text-lg text-gray-700">Vercel will automatically redeploy your site with the changes.</p>
            </div>
          </motion.div>

          {/* Summary Checklist */}
          <motion.div
            className="mb-16"
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
              Summary Checklist
            </h2>
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {[
                    "Create a Supabase project (required). Other services like Gmail/SMTP, Cloudinary, GitHub, and hosting (e.g., Vercel) are optional.",
                    "Unzip and open your project in VS Code.",
                    "Set up your .env file with the required API keys.",
                    "Initialize Git and optionally push to a remote (e.g., GitHub).",
                    "Populate your Supabase project with the SQL scripts and create your admin user.",
                    "Deploy to your preferred Next.js host (e.g., Vercel, Netlify, Render).",
                    "Log in and start editing your website.",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start text-lg text-gray-700"
                      variants={itemVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Need Help? Section */}
          <motion.div
            className="mb-16"
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
              <HelpCircle className="h-8 w-8 text-blue-600 mr-3" />
              <a href="/contact">Need Help?</a>
            </h2>
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <ul className="space-y-3">
                  <motion.li
                    className="flex items-start text-lg text-gray-700"
                    variants={itemVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ delay: 0.1 }}
                  >
                    <BookOpen className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                    <span>
                      <span className="font-semibold">Docs</span> (coming soon)
                    </span>
                  </motion.li>
                  <motion.li
                    className="flex items-start text-lg text-gray-700"
                    variants={itemVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ delay: 0.2 }}
                  >
                    <MessageCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                    <span>
                      Join our{" "}
                      <a
                        href="#"
                        className="text-blue-600 hover:underline"
                        onClick={(e) => {
                          e.preventDefault()
                          alert("Discord link coming soon!")
                        }}
                      >
                        Discord community
                      </a>
                    </span>
                  </motion.li>
                  <motion.li
                    className="flex items-start text-lg text-gray-700"
                    variants={itemVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ delay: 0.3 }}
                  >
                    <Mail className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                    <span>
                      <a href="/contact" className="text-blue-600 hover:underline">
                        Email support
                      </a>
                    </span>
                  </motion.li>
                  <motion.li
                    className="flex items-start text-lg text-gray-700"
                    variants={itemVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ delay: 0.4 }}
                  >
                    <Youtube className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                    <span>
                      Watch setup tutorials on our{" "}
                      <a
                        href="https://www.youtube.com/embed/A7EKEwLvKXA"
                        className="text-blue-600 hover:underline"
                        onClick={(e) => {
                          e.preventDefault()
                          alert("YouTube channel link coming soon!")
                        }}
                      >
                        YouTube Link
                      </a>
                    </span>
                  </motion.li>
                </ul>
                <p className="text-lg text-gray-700 mt-6 text-center">
                  Before you begin, be sure to check out our installation video. It walks you through the process and
                  makes everything much clearer.
                </p>
                <div className="text-center mt-6 space-y-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 w-full max-w-md mx-auto">
                        <Play className="mr-2 h-5 w-5" />
                        Watch Installation Video - Full Version
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl w-full p-0">
                      <DialogHeader className="px-6 pt-6">
                        <DialogTitle>Installation Video - Full Version</DialogTitle>
                      </DialogHeader>
                      <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0 }}>
                        <iframe
                          src="https://www.youtube.com/embed/A7EKEwLvKXA"
                          title="Fluxedita Installation Guide"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute top-0 left-0 w-full h-full rounded-lg"
                          width="100%"
                          height="100%"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Play className="mr-2 h-4 w-4" />
                          How to Edit - Part One
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl w-full p-0">
                        <DialogHeader className="px-6 pt-6">
                          <DialogTitle>How to Edit - Part One</DialogTitle>
                        </DialogHeader>
                        <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0 }}>
                          <iframe
                            src="https://www.youtube.com/embed/SgIpb1kG6xQ"
                            title="How to Edit - Part One"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Play className="mr-2 h-4 w-4" />
                          How to Edit - Part Two
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl w-full p-0">
                        <DialogHeader className="px-6 pt-6">
                          <DialogTitle>How to Edit - Part Two</DialogTitle>
                        </DialogHeader>
                        <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0 }}>
                          <iframe
                            src="https://www.youtube.com/embed/c10uP2uwuLo"
                            title="How to Edit - Part Two"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
      </div>
    </section>
  )
}
