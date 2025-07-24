"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, easeOut } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, Cloud, KeyRound, FolderOpen } from "lucide-react"

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
    icon: Cloud,
    title: "Cloudinary Integration",
    description: "Step-by-step setup for media storage and optimization.",
    color: "from-blue-400 to-blue-700",
  },
  {
    icon: KeyRound,
    title: "API & Security",
    description: "Environment variables and secure credential management.",
    color: "from-blue-700 to-cyan-500",
  },
  {
    icon: FolderOpen,
    title: "Media Organization",
    description: "Organize uploads and manage folders for your assets.",
    color: "from-cyan-500 to-green-400",
  },
]

const fullContent = (
  <>
    <h3 className="text-2xl font-bold text-gray-900 mb-3">Cloudinary Setup Guide</h3>
    <div className="prose max-w-none">
      <h4 id="prerequisites">Prerequisites</h4>
      <ul>
        <li>A Cloudinary account (Free tier or higher)</li>
        <li>Node.js and npm installed</li>
        <li>Basic understanding of environment variables</li>
      </ul>
      <h4 id="cloudinary-account-setup">Cloudinary Account Setup</h4>
      <ol className="list-decimal pl-6">
        <li>
          <strong>Create a Cloudinary Account</strong>
          <ul>
            <li>Go to <a href="https://cloudinary.com/users/register/free" target="_blank" rel="noopener noreferrer">Cloudinary Sign Up</a></li>
            <li>Sign up with your email or use a third-party provider</li>
            <li>Verify your email address</li>
          </ul>
        </li>
        <li>
          <strong>Get Your Cloudinary Credentials</strong>
          <ul>
            <li>After logging in, go to the Dashboard</li>
            <li>Note down your <code>Cloud Name</code> (visible in the Dashboard)</li>
            <li>Go to Account Details &gt; API section</li>
            <li>Note down your <code>API Key</code> and <code>API Secret</code></li>
          </ul>
        </li>
      </ol>
      <h4 id="environment-variables">Environment Variables</h4>
      <p>Update your <code>.env.local</code> file with the following Cloudinary variables:</p>
      <pre className="bg-gray-100 rounded p-4 overflow-x-auto text-sm mb-4"><code>{`# Cloudinary Configuration\nNEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name\nNEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key\nCLOUDINARY_API_KEY=your_api_key\nCLOUDINARY_API_SECRET=your_api_secret\nNEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset\nCLOUDINARY_URL=cloudinary://your_api_key:your_api_secret@your_cloud_name`}</code></pre>
      <h4 id="upload-preset-configuration">Upload Preset Configuration</h4>
      <ol className="list-decimal pl-6">
        <li>
          <strong>Create an Upload Preset</strong>
          <ul>
            <li>In Cloudinary Dashboard, go to Settings &gt; Upload</li>
            <li>Scroll down to the "Upload presets" section</li>
            <li>Click "Add upload preset"</li>
          </ul>
        </li>
        <li>
          <strong>Configure Upload Preset</strong>
          <ul>
            <li><strong>Preset name</strong>: <code>m1_default</code> (or update the env variable if you choose a different name)</li>
            <li><strong>Signing mode</strong>: <code>Signed</code> (required for server-side uploads)</li>
            <li><strong>Asset folder</strong>: <code>portfolio</code> (or your preferred folder name)</li>
            <li><strong>Use asset folder as public ID prefix</strong>: <code>Enabled</code></li>
            <li><strong>Storage</strong>: Keep default settings</li>
            <li><strong>Upload manipulation</strong>: Configure as needed</li>
            <li><strong>Access control</strong>: <code>Public</code> (unless you need private assets)</li>
            <li><strong>Save</strong> the preset</li>
          </ul>
        </li>
      </ol>
      <h4 id="folder-structure">Folder Structure</h4>
      <p>The application is configured to use the following folder structure in Cloudinary:</p>
      <pre className="bg-gray-100 rounded p-4 overflow-x-auto text-sm mb-4"><code>{`portfolio/\n  ├── images/\n  └── videos/`}</code></pre>
      <p>All media uploaded through the application will be stored in the <code>portfolio</code> folder by default. The Media Library in the application will only show files from this folder.</p>
      <h4 id="testing-the-integration">Testing the Integration</h4>
      <ol className="list-decimal pl-6">
        <li>
          <strong>Test Upload</strong>
          <ul>
            <li>Start the development server: <code>npm run dev</code></li>
            <li>Visit <code>http://localhost:3000/test-upload</code></li>
            <li>Try uploading an image</li>
            <li>Verify the file appears in your Cloudinary Media Library under the <code>portfolio</code> folder</li>
          </ul>
        </li>
        <li>
          <strong>Test Media Library</strong>
          <ul>
            <li>Navigate to the Media section in the admin panel</li>
            <li>Try viewing and selecting media from Cloudinary</li>
            <li>Verify that only files from the <code>portfolio</code> folder are shown</li>
          </ul>
        </li>
      </ol>
      <h4 id="troubleshooting">Troubleshooting</h4>
      <h5>Common Issues</h5>
      <ol className="list-decimal pl-6">
        <li>
          <strong>Upload Failing</strong>
          <ul>
            <li>Verify all environment variables are set correctly</li>
            <li>Check browser console for specific error messages</li>
            <li>Ensure the upload preset exists and is properly configured</li>
          </ul>
        </li>
        <li>
          <strong>Media Not Showing in Library</strong>
          <ul>
            <li>Verify the media is in the correct folder in Cloudinary</li>
            <li>Check the network tab in browser dev tools for API call errors</li>
            <li>Ensure the folder name in the code matches your Cloudinary folder</li>
          </ul>
        </li>
        <li>
          <strong>Authentication Errors</strong>
          <ul>
            <li>Double-check your API key and secret</li>
            <li>Ensure the <code>CLOUDINARY_API_SECRET</code> is not exposed in client-side code</li>
            <li>Verify the <code>CLOUDINARY_URL</code> format is correct</li>
          </ul>
        </li>
      </ol>
      <h5>Debugging</h5>
      <ol className="list-decimal pl-6">
        <li>
          <strong>Check Server Logs</strong>
          <ul>
            <li>Look for any error messages in the terminal where you're running <code>npm run dev</code></li>
          </ul>
        </li>
        <li>
          <strong>Browser Developer Tools</strong>
          <ul>
            <li>Check the Console tab for JavaScript errors</li>
            <li>Check the Network tab for failed API requests</li>
          </ul>
        </li>
      </ol>
      <h4 id="next-steps">Next Steps</h4>
      <ul>
        <li>Set up automatic cleanup of unused assets</li>
        <li>Configure image transformations and optimizations</li>
        <li>Set up webhooks for media processing events</li>
        <li>Implement CDN caching strategy</li>
      </ul>
      <h4 id="additional-resources">Additional Resources</h4>
      <ul>
        <li><a href="https://cloudinary.com/documentation" target="_blank" rel="noopener noreferrer">Cloudinary Documentation</a></li>
        <li><a href="https://cloudinary.com/documentation/node_integration" target="_blank" rel="noopener noreferrer">Cloudinary Node.js SDK</a></li>
        <li><a href="https://cloudinary.com/documentation/react_integration" target="_blank" rel="noopener noreferrer">Cloudinary React Components</a></li>
      </ul>
      <hr className="my-6" />
      <h4 id="updating-cloudinary-credentials">Updating Cloudinary Credentials</h4>
      <ol className="list-decimal pl-6">
        <li><strong>Update your <code>.env</code> file</strong> with your Cloudinary <code>CLOUDINARY_CLOUD_NAME</code>, <code>CLOUDINARY_API_KEY</code>, and <code>CLOUDINARY_API_SECRET</code> values.</li>
        <li><strong>Restart your app/server</strong> (if required by your framework) so the new environment variables are loaded.</li>
        <li><strong>No further code changes are needed.</strong> All Cloudinary features in the app (media library, uploads, media cards, etc.) will automatically use the new credentials from the <code>.env</code> file.</li>
      </ol>
      <div className="overflow-x-auto mt-4 mb-4">
        <table className="min-w-full text-sm border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-3 py-2 border-b">Step</th>
              <th className="px-3 py-2 border-b">Required?</th>
              <th className="px-3 py-2 border-b">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-3 py-2">Update <code>.env</code></td>
              <td className="border px-3 py-2">Yes</td>
              <td className="border px-3 py-2">Must include correct Cloudinary credentials</td>
            </tr>
            <tr>
              <td className="border px-3 py-2">Update media library API</td>
              <td className="border px-3 py-2">No</td>
              <td className="border px-3 py-2">Uses env vars automatically</td>
            </tr>
            <tr>
              <td className="border px-3 py-2">Update media card component</td>
              <td className="border px-3 py-2">No</td>
              <td className="border px-3 py-2">Uses env vars automatically</td>
            </tr>
            <tr>
              <td className="border px-3 py-2">Update other code</td>
              <td className="border px-3 py-2">No</td>
              <td className="border px-3 py-2">Unless credentials are hardcoded (not recommended)</td>
            </tr>
            <tr>
              <td className="border px-3 py-2">Restart app/server</td>
              <td className="border px-3 py-2">Maybe</td>
              <td className="border px-3 py-2">Required if env vars are loaded at startup</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 text-blue-800 text-sm rounded mb-4">
        <strong>Note:</strong> After updating your <code>.env</code> file with your Cloudinary credentials, no further code changes are required. All Cloudinary features in the app will automatically use the new credentials. Just update <code>.env</code> and restart the app if necessary.
      </div>
      <div className="text-xs text-gray-400 mt-8">Last Updated: July 2025</div>
    </div>
  </>
)

export function CloudinarySetupGuideSection() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Cloudinary Setup Guide</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Step-by-step setup for Cloudinary integration (media storage/optimization).
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