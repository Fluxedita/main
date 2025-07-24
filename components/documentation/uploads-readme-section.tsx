"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, easeOut } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, UploadCloud, FolderOpen, ShieldCheck } from "lucide-react"

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
    icon: UploadCloud,
    title: "Media Uploads",
    description: "Documentation for media upload workflows and gallery management.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: FolderOpen,
    title: "Gallery Types",
    description: "Public, exclusive, and behind-the-scenes galleries supported.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: ShieldCheck,
    title: "Security & Performance",
    description: "CDN delivery, file validation, and backup best practices.",
    color: "from-green-500 to-emerald-500",
  },
]

const fullContent = (
  <>
    <h3 className="text-2xl font-bold text-gray-900 mb-3">Media Uploads Documentation</h3>
    <div className="prose max-w-none">
      <h4 id="cloudinary-integration">Cloudinary Integration</h4>
      <p>The website uses Cloudinary for media storage and management. All media files (images and videos) are stored in Cloudinary and served through their CDN.</p>
      <h5>Configuration</h5>
      <ol className="list-decimal pl-6">
        <li>Cloudinary credentials are stored in environment variables:</li>
      </ol>
      <pre className="bg-gray-100 rounded p-4 overflow-x-auto text-sm mb-4"><code>{`CLOUDINARY_CLOUD_NAME=your_cloud_name\nCLOUDINARY_API_KEY=your_api_key\nCLOUDINARY_API_SECRET=your_api_secret`}</code></pre>
      <ol className="list-decimal pl-6" start={2}>
        <li>The Cloudinary configuration is initialized in <code>lib/cloudinary.ts</code></li>
      </ol>
      <h4 id="gallery-types">Gallery Types</h4>
      <p>The website supports three types of galleries:</p>
      <ol className="list-decimal pl-6">
        <li><strong>Public Gallery</strong> (<code>public</code>)
          <ul>
            <li>Accessible to all visitors</li>
            <li>Contains general content and previews</li>
            <li>Located at <code>/gallery</code></li>
          </ul>
        </li>
        <li><strong>Exclusive Gallery</strong> (<code>exclusive</code>)
          <ul>
            <li>Requires membership access</li>
            <li>Contains premium content</li>
            <li>Located at <code>/exclusive</code></li>
          </ul>
        </li>
        <li><strong>Behind-the-Scenes</strong> (<code>behind-scenes</code>)
          <ul>
            <li>Requires membership access</li>
            <li>Contains behind-the-scenes content</li>
            <li>Located at <code>/behind-scenes</code></li>
          </ul>
        </li>
      </ol>
      <h4 id="media-upload-process">Media Upload Process</h4>
      <ol className="list-decimal pl-6">
        <li>Files are uploaded via the <code>MediaDialog</code> component</li>
        <li>The server action <code>saveMediaAction</code> handles the upload:
          <ul>
            <li>Validates the file type and size</li>
            <li>Uploads to Cloudinary</li>
            <li>Stores metadata in the gallery data</li>
            <li>Returns the Cloudinary URL</li>
          </ul>
        </li>
        <li>Media items are stored in the gallery data with:
          <ul>
            <li>Unique ID and slug</li>
            <li>Title and description</li>
            <li>Cover image URL</li>
            <li>Image URLs (for image sets)</li>
            <li>Video URL (for videos)</li>
            <li>Creation date</li>
            <li>Gallery type</li>
            <li>Tags and other metadata</li>
          </ul>
        </li>
      </ol>
      <h4 id="hero-images">Hero Images</h4>
      <ol className="list-decimal pl-6">
        <li>Hero images are managed through the <code>GalleryHero</code> component</li>
        <li>Images are stored in Cloudinary</li>
        <li>URLs are persisted in both:
          <ul>
            <li>Local storage (for quick access)</li>
            <li>Server-side gallery data (for persistence)</li>
          </ul>
        </li>
      </ol>
      <h4 id="development">Development</h4>
      <h5>Local Storage</h5>
      <p>During development, media data is stored in:</p>
      <ul>
        <li><code>data/gallery.json</code> - Contains gallery data and media items</li>
        <li><code>data/media.json</code> - Contains media item details</li>
      </ul>
      <h5>Testing Uploads</h5>
      <ol className="list-decimal pl-6">
        <li>Ensure Cloudinary credentials are set in <code>.env.local</code></li>
        <li>Use the MediaDialog component to upload files</li>
        <li>Check Cloudinary dashboard to verify uploads</li>
        <li>Verify media appears in the correct gallery</li>
      </ol>
      <h4 id="production-considerations">Production Considerations</h4>
      <h5>Security</h5>
      <ul>
        <li>All uploads are processed through Cloudinary</li>
        <li>File type validation is enforced</li>
        <li>Authentication is required for exclusive content</li>
        <li>API keys are stored securely in environment variables</li>
      </ul>
      <h5>Performance</h5>
      <ul>
        <li>Cloudinary's CDN ensures fast delivery</li>
        <li>Images are automatically optimized</li>
        <li>Videos are streamed efficiently</li>
        <li>Thumbnails are generated automatically</li>
      </ul>
      <h5>Backup</h5>
      <ul>
        <li>Cloudinary provides automatic backup</li>
        <li>Gallery data is stored in version control</li>
        <li>Regular exports of gallery data are recommended</li>
      </ul>
      <h5>Maintenance</h5>
      <ul>
        <li>Monitor Cloudinary usage and quotas</li>
        <li>Regularly review and clean up unused media</li>
        <li>Keep gallery data organized and tagged</li>
        <li>Update hero images as needed</li>
      </ul>
      <h4 id="troubleshooting">Troubleshooting</h4>
      <h5>Common Issues</h5>
      <ol className="list-decimal pl-6">
        <li><strong>Upload Failures</strong>
          <ul>
            <li>Check Cloudinary credentials</li>
            <li>Verify file size and type</li>
            <li>Check network connection</li>
          </ul>
        </li>
        <li><strong>Media Not Appearing</strong>
          <ul>
            <li>Verify gallery type is correct</li>
            <li>Check Cloudinary URL format</li>
            <li>Clear local storage if needed</li>
          </ul>
        </li>
        <li><strong>Hero Image Issues</strong>
          <ul>
            <li>Check both local storage and gallery data</li>
            <li>Verify image URL format</li>
            <li>Clear browser cache if needed</li>
          </ul>
        </li>
      </ol>
    </div>
  </>
)

export function UploadsReadmeSection() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Uploads Readme</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Documentation for media upload workflows and gallery management.
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
            className="text-cyan-600 border-cyan-600 hover:bg-cyan-50"
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