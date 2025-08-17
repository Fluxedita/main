"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, easeOut } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, Github, FileText, UploadCloud } from "lucide-react"

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
}

const introHighlights = [
  {
    icon: Github,
    title: "Optional Remote Setup",
    description: "Initialize locally; optionally connect a remote (e.g., GitHub).",
    color: "from-gray-700 to-black",
  },
  {
    icon: FileText,
    title: ".gitignore & Commit",
    description: "Best practices for .gitignore and initial commit.",
    color: "from-gray-500 to-blue-500",
  },
  {
    icon: UploadCloud,
    title: "Push & Update",
    description: "Push to main and keep your remote up to date (if used).",
    color: "from-blue-500 to-green-500",
  },
]

const fullContent = (
  <>
    <h3 className="text-2xl font-bold text-gray-900 mb-3">Initialize Local Repo and (Optional) Connect Remote</h3>
    <div className="prose max-w-none">
      <ol className="list-decimal pl-6">
        <li>
          <strong>Initialize Your Project Locally</strong>
          <p>Open your project folder in VSCode and run the following in the terminal:</p>
          <pre className="bg-gray-100 rounded p-4 overflow-x-auto text-sm mb-4"><code>{`git init`}</code></pre>
          <p>This initializes a new Git repository in your project directory.</p>
        </li>
        <li>
          <strong>Create a .gitignore File</strong> (basic .gitignore already included, amend as you wish)
          <p>Add a <code>.gitignore</code> file to exclude files you don’t want in version control (e.g., <code>node_modules</code>, <code>.env</code>, etc.). You can use templates from <a href="https://www.toptal.com/developers/gitignore" target="_blank" rel="noopener noreferrer">gitignore.io</a> for your tech stack.</p>
        </li>
        <li>
          <strong>Stage and Commit Your Files</strong>
          <pre className="bg-gray-100 rounded p-4 overflow-x-auto text-sm mb-4"><code>{`git add .`}</code></pre>
        </li>
        <li>
          <strong>Commit your files</strong>
          <pre className="bg-gray-100 rounded p-4 overflow-x-auto text-sm mb-4"><code>{`git commit -m "Initial commit"`}</code></pre>
        </li>
        <li>
          <strong>(Optional) Create a Remote Repository</strong>
          <p>Create an empty repository on your preferred platform (e.g., GitHub). <strong>Do not initialize it with a README or .gitignore</strong>; these are included in your Fluxedita package (amend locally as needed).</p>
        </li>
        <li>
          <strong>(Optional) Link Your Local Repo to the Remote</strong>
          <p>Replace USERNAME and REPO with your remote details (example shows GitHub):</p>
          <pre className="bg-gray-100 rounded p-4 overflow-x-auto text-sm mb-4"><code>{`git remote add origin https://github.com/YOUR_USERNAME/REPO.git`}</code></pre>
        </li>
        <li>
          <strong>Push to the main Branch</strong>
          <p>Ensure your local branch is named <code>main</code> (or rename it if needed):</p>
          <pre className="bg-gray-100 rounded p-4 overflow-x-auto text-sm mb-4"><code>{`git init
git add .
git commit -m "Initial commit"
# Optional remote example (GitHub):
git remote add origin https://github.com/YOUR_USERNAME/REPO.git
git push -u origin main`}</code></pre>
        </li>
      </ol>
      <h4 id="bonus-tips">Bonus Tips</h4>
      <p>If you have made changes, and wish to update your existing repo, please follow these steps:</p>
      <pre className="bg-gray-100 rounded p-4 overflow-x-auto text-sm mb-4"><code>{`git status
git add .
git commit -m "Push latest changes"
git push origin main`}</code></pre>
    </div>
  </>
)

export function RepoInitializationOptionalRemoteGuideSection() {
  const ref = useRef(null)
  const [showFullContent, setShowFullContent] = useState(false)

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Initialize Local Repo and (Optional) Connect Remote</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Step-by-step guide for initializing a local repo, with an optional step to connect and push to a remote (e.g., GitHub).
          </p>
        </motion.div>
        <AnimatePresence mode="wait">
          {!showFullContent ? (
            <motion.div
              key="highlights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            >
              {introHighlights.map((item, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
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
              transition={{ duration: 0.5, ease: easeOut }}
              className="space-y-12"
            >
              {fullContent}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => setShowFullContent(!showFullContent)}
            className="text-gray-700 border-gray-700 hover:bg-gray-100"
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