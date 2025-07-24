"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, easeOut } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, Code2, FileCode2, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
}

const introHighlights = [
  {
    icon: Code2,
    title: "Custom HTML & CSS",
    description: "Add custom HTML, CSS, and JavaScript using JSX.",
    color: "from-purple-500 to-blue-600",
  },
  {
    icon: FileCode2,
    title: "JSX Best Practices",
    description: "Follow JSX rules for safe and valid custom code.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Shield,
    title: "Safe Integration",
    description: "All code is sandboxed and validated for safety.",
    color: "from-green-500 to-emerald-500",
  },
]

export function CustomCodeGuideSection() {
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
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 shadow-md">
              <Code2 className="h-8 w-8 text-white" />
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Custom Code Component Guide</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Add custom HTML, CSS, and JavaScript to your pages using JSX. All code must be wrapped in a function that returns JSX.
          </p>
        </motion.div>
        <AnimatePresence mode="wait">
          {!showFullContent ? (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="mb-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {introHighlights.map((item, index) => (
                  <Card key={index} className="h-full flex flex-col items-center text-center p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardHeader className="pb-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <item.icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="full-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="prose prose-blue max-w-3xl mx-auto text-gray-800 space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Overview</h3>
                <p>The Custom Code Component allows you to add custom HTML, CSS, and JavaScript to your pages. <b>All code must be wrapped in a function that returns JSX.</b></p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Basic JSX Rules</h3>
                <ul className="list-disc pl-6">
                  <li>Use <code>className</code> instead of <code>class</code></li>
                  <li>Use <code>style= </code> for inline styles</li>
                  <li>All attributes should be camelCase (e.g., <code>frameBorder</code>, <code>allowFullScreen</code>)</li>
                  <li>Always return JSX from a function</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Examples</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-1">1. Adding a Heading</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="font-semibold">Basic Heading:</span>
                        <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto"><code>{"/* code example omitted for safety */"}</code></pre>
                      </div>
                      <div>
                        <span className="font-semibold">Styled Heading with Tailwind CSS:</span>
                        <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto"><code>{"/* code example omitted for safety */"}</code></pre>
                      </div>
                      <div>
                        <span className="font-semibold">Heading with Inline Styles:</span>
                        <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto"><code>{"/* code example omitted for safety */"}</code></pre>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">2. Adding a Paragraph</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="font-semibold">Basic Paragraph:</span>
                        <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto"><code>{"/* code example omitted for safety */"}</code></pre>
                      </div>
                      <div>
                        <span className="font-semibold">Styled Paragraph:</span>
                        <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto"><code>{"/* code example omitted for safety */"}</code></pre>
                      </div>
                      <div>
                        <span className="font-semibold">Multiple Paragraphs:</span>
                        <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto"><code>{"/* code example omitted for safety */"}</code></pre>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">3. Adding an Image</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="font-semibold">Basic Image:</span>
                        <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto"><code>{"/* code example omitted for safety */"}</code></pre>
                      </div>
                      <div>
                        <span className="font-semibold">Responsive Image with Styling:</span>
                        <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto"><code>{"/* code example omitted for safety */"}</code></pre>
                      </div>
                      <div>
                        <span className="font-semibold">Image with Inline Styles:</span>
                        <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto"><code>{"/* code example omitted for safety */"}</code></pre>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">4. Adding a Video (YouTube, Vimeo, etc.)</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="font-semibold">YouTube Video:</span>
                        <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto"><code>{"/* code example omitted for safety */"}</code></pre>
                      </div>
                      <div>
                        <span className="font-semibold">Responsive Video Container:</span>
                        <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto"><code>{"/* code example omitted for safety */"}</code></pre>
                      </div>
                      <div>
                        <span className="font-semibold">Vimeo Video:</span>
                        <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto"><code>{"/* code example omitted for safety */"}</code></pre>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">5. Adding Custom Page Section Snippets</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="font-semibold">Card Layout:</span>
                        <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto"><code>{"/* code example omitted for safety */"}</code></pre>
                      </div>
                      <div>
                        <span className="font-semibold">Feature Grid:</span>
                        <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto"><code>{"/* code example omitted for safety */"}</code></pre>
                      </div>
                      <div>
                        <span className="font-semibold">Hero Section:</span>
                        <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto"><code>{"/* code example omitted for safety */"}</code></pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Common Patterns</h3>
                <div className="space-y-2">
                  <span className="font-semibold">Multiple Elements:</span>
                  <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto"><code>{"/* code example omitted for safety */"}</code></pre>
                  <span className="font-semibold">Conditional Rendering:</span>
                  <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto"><code>{"/* code example omitted for safety */"}</code></pre>
                  <span className="font-semibold">Using Variables:</span>
                  <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto"><code>{"/* code example omitted for safety */"}</code></pre>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Troubleshooting</h3>
                <ul className="list-disc pl-6">
                  <li><b>Missing function wrapper:</b> Always wrap your JSX in <code>() =&gt; ...</code></li>
                  <li><b>Using <code>class</code> instead of <code>className</code>:</b> Use <code>className</code> for CSS classes</li>
                  <li><b>Missing closing tags:</b> Ensure all JSX elements are properly closed</li>
                  <li><b>Invalid attributes:</b> Use camelCase for all attributes</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Best Practices</h3>
                <ul className="list-disc pl-6">
                  <li>Use Tailwind CSS classes for styling when possible</li>
                  <li>Keep your code readable with proper indentation</li>
                  <li>Test your code in the editor before saving</li>
                  <li>Use semantic HTML elements (<code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;header&gt;</code>, etc.)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Need Help?</h3>
                <ul className="list-decimal pl-6">
                  <li>Check the JavaScript console for errors</li>
                  <li>Ensure all JSX is properly wrapped in a function</li>
                  <li>Check that all attributes use the correct JSX syntax</li>
                  <li>Make sure your code returns valid JSX</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => setShowFullContent(!showFullContent)}
            className="text-purple-600 border-purple-600 hover:bg-purple-50"
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