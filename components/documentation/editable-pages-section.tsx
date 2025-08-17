"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, easeOut } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, Layers, Database, Edit3 } from "lucide-react"

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
    icon: Layers,
    title: "Modular & Flexible",
    description: "Pages are built from modular, reusable section components for maximum flexibility.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Database,
    title: "Database-Driven",
    description: "All content and layout are stored in the database as JSONB for dynamic rendering.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Edit3,
    title: "Admin Editable",
    description: "Admins can add, edit, reorder (using up/down controls), and remove sections directly from the frontend.",
    color: "from-purple-500 to-violet-600",
  },
]

const fullContent = (
  <>
    <h3 className="text-2xl font-bold text-gray-900 mb-3">Overview</h3>
    <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
      This guide explains how editable pages and their section components are structured in both the database and the frontend. It is intended for developers, admins, and new users to understand how to manage, extend, and customize the content system.
    </p>
    <ul className="list-disc list-inside ml-4 mt-2 text-lg text-gray-700 max-w-3xl mx-auto mb-8">
      <li><b>System/Root Pages</b> (e.g., Home, About, Gallery) use the <code>root_page_components</code> table for their editable sections.</li>
      <li><b>Custom Pages</b> (user-created or dynamic) use the <code>custom_pages</code> and <code>page_content</code> tables.</li>
      <li>Each section (hero, gallery, text, etc.) is represented as a modular component, with its content stored in the database as JSONB.</li>
    </ul>
    <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-12">Database Structure</h3>
    <ul className="list-disc list-inside ml-4 mt-2 text-lg text-gray-700 max-w-3xl mx-auto mb-8">
      <li><b>root_page_components</b>: Stores editable sections for system/root pages.</li>
      <li><b>custom_pages</b>: Stores metadata for user-created or dynamic pages.</li>
      <li><b>page_content</b>: Stores the actual content sections for custom pages.</li>
      <li>Section content is stored as JSONB in the <code>content</code> field, allowing for flexible properties per section type.</li>
      <li>Other related tables: <code>gallery_data</code>, <code>media_items</code>, <code>contact_submissions</code>, <code>comments</code>, etc.</li>
    </ul>
    <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-12">Editable Pages</h3>
    <p className="mb-2"><b>System/Root Pages:</b> Core pages (Home, About, Gallery, etc.) use <code>root_page_components</code>. Each section is a row identified by <code>page_slug</code> and <code>component_type</code>. Admins can edit, add, or remove sections using admin FABs.</p>
    <p className="mb-2"><b>Custom Pages:</b> User-created or dynamic pages use <code>custom_pages</code> and <code>page_content</code>. Each section is a row in <code>page_content</code>, linked by <code>page_id</code> or <code>page_slug</code>. Admins can fully customize these pages using admin FABs.</p>
    <p className="mb-2"><b>Access Control:</b> Access is enforced by RLS policies and frontend checks, based on page type or <code>access_type</code> field.</p>
    <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-12">Section Types</h3>
    <ul className="list-disc list-inside ml-4 mt-2 text-lg text-gray-700 max-w-3xl mx-auto mb-8">
      <li>hero (banner), gallery, text, feature, cta, divider, testimonial, media, contact, comments, and more.</li>
      <li>Section content is stored as JSONB, allowing each type to have its own structure.</li>
      <li>To add a new section type, create a new React component and update the registry; backend only stores JSONB.</li>
    </ul>
    <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-12">Admin Edit Controls</h3>
    <div className="mb-4 p-4 rounded-lg border border-blue-200 bg-blue-50 text-sm text-blue-800">
      Tip: Reordering uses the up/down arrow controls. Drag-and-drop is not supported.
    </div>
    <ul className="list-disc list-inside ml-4 mt-2 text-lg text-gray-700 max-w-3xl mx-auto mb-8">
      <li>Admins use floating action buttons (FABs) to add, edit, reorder (via up/down controls), or remove sections.</li>
      <li>Section editors are context-aware, showing the correct form fields for each type.</li>
      <li>Changes are saved to the appropriate table and reflected in real time.</li>
    </ul>
    <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-12">Quick Reference Table: All Editable Pages</h3>
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full text-sm border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-1 border">Page</th>
            <th className="px-2 py-1 border">Route</th>
            <th className="px-2 py-1 border">Access</th>
            <th className="px-2 py-1 border">Key Components</th>
            <th className="px-2 py-1 border">Tables</th>
            <th className="px-2 py-1 border">Features</th>
            <th className="px-2 py-1 border">Package</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border px-2 py-1">Home</td><td className="border px-2 py-1">/</td><td className="border px-2 py-1">Public</td><td className="border px-2 py-1">Hero, Custom</td><td className="border px-2 py-1">page_content</td><td className="border px-2 py-1">Landing, customizable</td><td className="border px-2 py-1">Standard, Root, Multi, Premium</td></tr>
          <tr><td className="border px-2 py-1">About</td><td className="border px-2 py-1">/about</td><td className="border px-2 py-1">Public</td><td className="border px-2 py-1">Hero, Custom</td><td className="border px-2 py-1">page_content</td><td className="border px-2 py-1">Bio, story</td><td className="border px-2 py-1">Root, Multi, Premium</td></tr>
          <tr><td className="border px-2 py-1">Gallery</td><td className="border px-2 py-1">/gallery</td><td className="border px-2 py-1">Public</td><td className="border px-2 py-1">Hero, Media</td><td className="border px-2 py-1">page_content, gallery_data, media_items</td><td className="border px-2 py-1">Media upload</td><td className="border px-2 py-1">Premium</td></tr>
          <tr><td className="border px-2 py-1">Exclusive</td><td className="border px-2 py-1">/exclusive</td><td className="border px-2 py-1">Premium</td><td className="border px-2 py-1">Hero, Media</td><td className="border px-2 py-1">page_content, gallery_data, media_items</td><td className="border px-2 py-1">Premium content</td><td className="border px-2 py-1">Premium</td></tr>
          <tr><td className="border px-2 py-1">Contact</td><td className="border px-2 py-1">/contact</td><td className="border px-2 py-1">Public</td><td className="border px-2 py-1">Hero, Form, Comments</td><td className="border px-2 py-1">page_content, contact_submissions, comments</td><td className="border px-2 py-1">User interaction</td><td className="border px-2 py-1">Root, Multi, Premium</td></tr>
          <tr><td className="border px-2 py-1">Members</td><td className="border px-2 py-1">/members</td><td className="border px-2 py-1">Premium</td><td className="border px-2 py-1">Hero, Benefits</td><td className="border px-2 py-1">page_content, membership_benefits</td><td className="border px-2 py-1">Premium features</td><td className="border px-2 py-1">Premium</td></tr>
          <tr><td className="border px-2 py-1">Custom Pages</td><td className="border px-2 py-1">/custom_pages/[slug]</td><td className="border px-2 py-1">Public/Premium</td><td className="border px-2 py-1">Hero, Custom</td><td className="border px-2 py-1">page_content, contact_submissions</td><td className="border px-2 py-1">Dynamic, flexible</td><td className="border px-2 py-1">Multi, Premium</td></tr>
          <tr><td className="border px-2 py-1">Admin Pages</td><td className="border px-2 py-1">/admin/*</td><td className="border px-2 py-1">Admin</td><td className="border px-2 py-1">Hero, Tools</td><td className="border px-2 py-1">page_content, profiles, gallery_data, comments</td><td className="border px-2 py-1">Admin tools</td><td className="border px-2 py-1">All Packages (Admin Only)</td></tr>
          <tr><td className="border px-2 py-1">Profile</td><td className="border px-2 py-1">/profile/[id]</td><td className="border px-2 py-1">User</td><td className="border px-2 py-1">Profile, Media</td><td className="border px-2 py-1">profiles, media_items, page_content</td><td className="border px-2 py-1">User content</td><td className="border px-2 py-1">All Packages</td></tr>
          <tr><td className="border px-2 py-1">Media</td><td className="border px-2 py-1">/media</td><td className="border px-2 py-1">Admin</td><td className="border px-2 py-1">Library, Upload</td><td className="border px-2 py-1">media_items</td><td className="border px-2 py-1">Media management</td><td className="border px-2 py-1">Premium</td></tr>
          <tr><td className="border px-2 py-1">Legal Pages</td><td className="border px-2 py-1">/cookies, /privacy, /terms</td><td className="border px-2 py-1">Public</td><td className="border px-2 py-1">Legal, Custom</td><td className="border px-2 py-1">page_content</td><td className="border px-2 py-1">Compliance</td><td className="border px-2 py-1">Root, Multi, Premium</td></tr>
        </tbody>
      </table>
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-12">Extending the System</h3>
    <ul className="list-disc list-inside ml-4 mt-2 text-lg text-gray-700 max-w-3xl mx-auto mb-8">
      <li>To add a new section/component type: create a new React component, register it, and update the admin editor. Backend only stores JSONB.</li>
      <li>To add a new page type: add a new <code>page_slug</code> and sections to <code>root_page_components</code> (system pages) or create a new entry in <code>custom_pages</code> and add sections to <code>page_content</code> (custom pages).</li>
    </ul>
    <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-12">Troubleshooting & FAQ</h3>
    <ul className="list-disc list-inside ml-4 mt-2 text-lg text-gray-700 max-w-3xl mx-auto mb-8">
      <li>If a section is not showing, check the correct table and that its <code>type</code> matches a registered component.</li>
      <li>If admin FABs are missing, ensure you are logged in as an admin and have the correct role.</li>
      <li>For media issues, check <code>gallery_data</code> and <code>media_items</code> links and Cloudinary credentials.</li>
      <li>For access issues, review RLS policies and frontend checks.</li>
    </ul>
    <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-12">Schema Reference</h3>
    <ul className="list-disc list-inside ml-4 mt-2 text-lg text-gray-700 max-w-3xl mx-auto mb-8">
      <li><b>root_page_components</b>: id, page_slug, component_type, content (JSONB), is_active, created_at, updated_at, created_by, updated_by</li>
      <li><b>custom_pages</b>: id, slug, title, access_type, is_published, created_at, updated_at, created_by, updated_by</li>
      <li><b>page_content</b>: id, page_id, page_slug, section_type, content (JSONB), sort_order, is_published, created_at, updated_at, created_by</li>
      <li><b>gallery_data</b>: id, title, type, user_id, is_published, created_at, updated_at, ...</li>
      <li><b>media_items</b>: id, title, url, type, created_by, created_at, updated_at, ...</li>
      <li>Other tables: contact_submissions, comments, membership_benefits, etc.</li>
    </ul>
    <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-12">More Help</h3>
    <ul className="list-disc list-inside ml-4 mt-2 text-lg text-gray-700 max-w-3xl mx-auto mb-8">
      <li>Check the main README.md and this guide.</li>
      <li>See supabase/SETUP_README.md for database setup.</li>
      <li>Contact support at <a href="mailto:support@fluxedita.com" className="text-blue-600 hover:underline">support@fluxedita.com</a>.</li>
    </ul>
  </>
)

export function EditablePagesSection() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Editable Pages and Sections</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn how every page and section is modular, database-driven, and fully admin-editable for maximum flexibility.
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