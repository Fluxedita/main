"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, easeOut } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, Database, KeyRound, Settings2 } from "lucide-react"

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
    icon: Database,
    title: "Supabase Integration",
    description: "Step-by-step setup for database and authentication.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: KeyRound,
    title: "API Keys & Security",
    description: "Manage environment variables and secure access.",
    color: "from-emerald-600 to-teal-400",
  },
  {
    icon: Settings2,
    title: "Configuration",
    description: "Configure client, test connection, and manage schema.",
    color: "from-teal-400 to-blue-400",
  },
]

const fullContent = (
  <>
    <h3 className="text-2xl font-bold text-gray-900 mb-3">Supabase Setup Guide</h3>
    <div className="prose max-w-none">
      <h4 id="prerequisites">Prerequisites</h4>
      <ul>
        <li>Node.js and npm installed</li>
        <li>A Supabase account (<a href="https://supabase.com/" target="_blank" rel="noopener noreferrer">https://supabase.com/</a>)</li>
        <li>Basic knowledge of SQL and Next.js</li>
      </ul>
      <h4 id="create-supabase-project">1. Create a New Supabase Project</h4>
      <ol className="list-decimal pl-6">
        <li>Go to <a href="https://app.supabase.com/" target="_blank" rel="noopener noreferrer">Supabase Dashboard</a></li>
        <li>Click "New Project"</li>
        <li>Enter your project details:
          <ul>
            <li>Name your project</li>
            <li>Set a secure database password (save this in a secure place)</li>
            <li>Choose a region closest to your users</li>
          </ul>
        </li>
        <li>Click "Create new project"</li>
      </ol>
      <h4 id="env-vars">2. Set Up Environment Variables</h4>
      <ol className="list-decimal pl-6">
        <li>In your Next.js project, create or update <code>.env.local</code> with:</li>
      </ol>
      <pre className="bg-gray-100 rounded p-4 overflow-x-auto text-sm mb-4"><code>{`NEXT_PUBLIC_SUPABASE_URL=your-project-url\nNEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key\nSUPABASE_SERVICE_ROLE_KEY=your-service-role-key`}</code></pre>
      <ol className="list-decimal pl-6" start={2}>
        <li>Find these values in your Supabase project:
          <ul>
            <li>Go to Project Settings &gt; API</li>
            <li>Copy the Project URL to <code>NEXT_PUBLIC_SUPABASE_URL</code></li>
            <li>Copy the <code>anon</code> public key to <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code></li>
            <li>Copy the <code>service_role</code> key to <code>SUPABASE_SERVICE_ROLE_KEY</code></li>
          </ul>
        </li>
      </ol>
      <h4 id="install-packages">3. Install Required Packages</h4>
      <pre className="bg-gray-100 rounded p-4 overflow-x-auto text-sm mb-4"><code>{`npm install @supabase/supabase-js @supabase/auth-helpers-nextjs`}</code></pre>
      <h4 id="setup-client">4. Set Up Supabase Client</h4>
      <p>Create <code>lib/supabaseClient.js</code>:</p>
      <pre className="bg-gray-100 rounded p-4 overflow-x-auto text-sm mb-4"><code>{`import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';\n\nexport const supabase = createBrowserSupabaseClient();`}</code></pre>
      <h4 id="test-connection">5. Test the Connection</h4>
      <p>Create <code>app/test-connection/page.jsx</code>:</p>
      <pre className="bg-gray-100 rounded p-4 overflow-x-auto text-sm mb-4"><code>{`'use client';\nimport { useEffect, useState } from 'react';\nimport { supabase } from '@/lib/supabaseClient';\n\nexport default function TestConnection() {\n  const [status, setStatus] = useState('Testing connection...');\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    const testConnection = async () => {\n      try {\n        const { error } = await supabase.auth.getSession();\n        if (error) throw error;\n        setStatus('✅ Successfully connected to Supabase!');\n      } catch (err) {\n        setError(err.message);\n        setStatus('❌ Connection failed');\n      }\n    };\n    testConnection();\n  }, []);\n\n  return (\n    <div style={{ padding: '2rem' }}>\n      <h1>Supabase Connection Test</h1>\n      <p>Status: {status}</p>\n      {error && <pre style={{ color: 'red' }}>Error: {error}</pre>}\n    </div>\n  );\n}`}</code></pre>
      <h4 id="init-schema">6. Initialize Database Schema (Optional)</h4>
      <ol className="list-decimal pl-6">
        <li>Go to the SQL Editor in your Supabase dashboard</li>
        <li>Create tables and relationships</li>
        <li>Set up Row Level Security (RLS) policies</li>
      </ol>
      <h4 id="common-issues">7. Common Issues &amp; Solutions</h4>
      <h5>Connection Issues</h5>
      <ul>
        <li><strong>Error: Invalid API Key</strong>
          <ul>
            <li>Verify your environment variables are correctly set</li>
            <li>Ensure there are no typos in the keys</li>
            <li>Restart your Next.js dev server after changing environment variables</li>
          </ul>
        </li>
      </ul>
      <h5>Database Issues</h5>
      <ul>
        <li><strong>Missing Tables</strong>
          <ul>
            <li>Check if migrations were applied</li>
            <li>Verify table names in your queries</li>
          </ul>
        </li>
      </ul>
      <h5>Authentication Issues</h5>
      <ul>
        <li><strong>Session Problems</strong>
          <ul>
            <li>Ensure proper auth flow implementation</li>
            <li>Check RLS policies if getting permission errors</li>
          </ul>
        </li>
      </ul>
      <h4 id="next-steps">8. Next Steps</h4>
      <ul>
        <li>Set up authentication flows</li>
        <li>Create API routes for server-side operations</li>
        <li>Implement real-time subscriptions</li>
      </ul>
      <h4 id="additional-resources">9. Additional Resources</h4>
      <ul>
        <li><a href="https://supabase.com/docs" target="_blank" rel="noopener noreferrer">Supabase Documentation</a></li>
        <li><a href="https://supabase.com/docs/reference/javascript/initializing" target="_blank" rel="noopener noreferrer">Supabase JavaScript Client Reference</a></li>
        <li><a href="https://supabase.com/docs/guides/auth/auth-helpers/nextjs" target="_blank" rel="noopener noreferrer">Supabase Auth Helpers for Next.js</a></li>
      </ul>
      <h4 id="support">Support</h4>
      <p>For additional help, refer to the official <a href="https://supabase.com/docs" target="_blank" rel="noopener noreferrer">Supabase Documentation</a> or contact us at <a href="mailto:support@fluxedita.com" className="text-blue-600 hover:underline">support@fluxedita.com</a>.</p>
    </div>
  </>
)

export function SupabaseSetupGuideSection() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Supabase Setup Guide</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Step-by-step setup for Supabase (database/auth).
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
            className="text-green-600 border-green-600 hover:bg-green-50"
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