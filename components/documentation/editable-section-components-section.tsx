"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, easeOut } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, Puzzle, Layers, Settings2 } from "lucide-react"

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
    icon: Puzzle,
    title: "Component-Based",
    description: "Each section is a reusable, editable React component.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Layers,
    title: "Modular Architecture",
    description: "Sections are managed and composed via the Page Controls sidebar.",
    color: "from-indigo-500 to-purple-600",
  },
  {
    icon: Settings2,
    title: "Customizable",
    description: "Easily add, edit, and rearrange sections for any page.",
    color: "from-purple-500 to-pink-500",
  },
]

const fullContent = (
  <>
    <h3 className="text-2xl font-bold text-gray-900 mb-3">System Overview</h3>
    <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
      The editable section component system allows users to create dynamic, customizable pages through a visual editor. Each section is a self-contained component that can be added, edited, and managed through the Page Controls sidebar.
    </p>
    <ul className="list-disc list-inside ml-4 mt-2 text-lg text-gray-700 max-w-3xl mx-auto mb-8">
      <li><b>Section Components:</b> Individual UI components for different content types (text, media, features, etc.)</li>
      <li><b>Page Controls:</b> Sidebar interface for managing sections and page properties</li>
      <li><b>TextStyleEditor:</b> Unified text styling system for consistent typography</li>
      <li><b>MediaLibrary:</b> Centralized media management for images and videos</li>
      <li><b>Edit Mode:</b> Toggle between view and edit states for content management</li>
    </ul>
    <h4 className="text-xl font-semibold text-gray-900 mt-8 mb-2">File Structure Example</h4>
    <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4 text-sm">
{`app/custom_pages/
├── components/
│   ├── sections/           # Section component library
│   │   ├── index.ts        # Component exports
│   │   ├── TextStyleEditor.tsx
│   │   ├── HeroSection.tsx
│   │   ├── TextSection.tsx
│   │   └── ...
│   └── PageControls.tsx    # Sidebar management
├── types/
│   └── sections.ts         # TypeScript definitions
└── [slug]/
    └── CustomPageClient.tsx # Main page editor`}
    </pre>

    <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-12">Current Implementation Status</h3>
    <p className="mb-2">All 23 section types are fully implemented and available in the Page Controls system. All root and custom pages have complete section support.</p>
    <ul className="list-disc list-inside ml-4 mt-2 text-lg text-gray-700 max-w-3xl mx-auto mb-8">
      <li><b>Total Section Types:</b> 23</li>
      <li><b>Status:</b> <span className="text-green-600 font-bold">EXCELLENT</span> – All sections are fully implemented and working</li>
      <li><b>Default Sections:</b> 9 most commonly used sections enabled by default</li>
      <li><b>User Customization:</b> Checkbox interface to enable/disable sections, preferences saved to localStorage</li>
    </ul>
    <h4 className="text-xl font-semibold text-gray-900 mt-8 mb-2">Available Section Types</h4>
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full text-sm border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-1 border">Type</th>
            <th className="px-2 py-1 border">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border px-2 py-1">hero</td><td className="border px-2 py-1">Hero Section</td></tr>
          <tr><td className="border px-2 py-1">hero-responsive</td><td className="border px-2 py-1">Hero Section (Responsive)</td></tr>
          <tr><td className="border px-2 py-1">text</td><td className="border px-2 py-1">Text Section</td></tr>
          <tr><td className="border px-2 py-1">content</td><td className="border px-2 py-1">Content Section</td></tr>
          <tr><td className="border px-2 py-1">media-text-left</td><td className="border px-2 py-1">Media/Text (Left)</td></tr>
          <tr><td className="border px-2 py-1">media-text-right</td><td className="border px-2 py-1">Media/Text (Right)</td></tr>
          <tr><td className="border px-2 py-1">divider</td><td className="border px-2 py-1">Divider</td></tr>
          <tr><td className="border px-2 py-1">heading</td><td className="border px-2 py-1">Heading</td></tr>
          <tr><td className="border px-2 py-1">quote</td><td className="border px-2 py-1">Quote</td></tr>
          <tr><td className="border px-2 py-1">cta</td><td className="border px-2 py-1">Call-to-Action</td></tr>
          <tr><td className="border px-2 py-1">gallery</td><td className="border px-2 py-1">Image Gallery</td></tr>
          <tr><td className="border px-2 py-1">mediaTextColumns</td><td className="border px-2 py-1">Media/Text Columns</td></tr>
          <tr><td className="border px-2 py-1">twoColumnText</td><td className="border px-2 py-1">Two Column Text</td></tr>
          <tr><td className="border px-2 py-1">feature</td><td className="border px-2 py-1">Feature Section</td></tr>
          <tr><td className="border px-2 py-1">slider</td><td className="border px-2 py-1">Slider Section</td></tr>
          <tr><td className="border px-2 py-1">feature-card-grid</td><td className="border px-2 py-1">Feature Card Grid</td></tr>
          <tr><td className="border px-2 py-1">advanced-slider</td><td className="border px-2 py-1">Advanced Slider Section</td></tr>
          <tr><td className="border px-2 py-1">info-card</td><td className="border px-2 py-1">Info Card Grid</td></tr>
          <tr><td className="border px-2 py-1">privacy</td><td className="border px-2 py-1">Privacy Section</td></tr>
          <tr><td className="border px-2 py-1">custom-code</td><td className="border px-2 py-1">Custom Code Section</td></tr>
          <tr><td className="border px-2 py-1">contact-form</td><td className="border px-2 py-1">Contact Form Section</td></tr>
          <tr><td className="border px-2 py-1">fluxedita_advanced_form</td><td className="border px-2 py-1">Fluxedita Advanced Form</td></tr>
          <tr><td className="border px-2 py-1">footer</td><td className="border px-2 py-1">Footer Section</td></tr>
        </tbody>
      </table>
    </div>

    <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-12">Component Architecture</h3>
    <p className="mb-2">All section components extend a <b>BaseSection</b> interface and follow a consistent props pattern. Components render differently in edit mode vs view mode.</p>
    <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4 text-sm">
{`export interface BaseSection {
  id: string;
  type: SectionType;
  visible: boolean;
  enableSpeech: boolean;
}

interface SectionComponentProps {
  section: SectionType;
  isEditMode: boolean;
  onSectionChange: (section: SectionType) => void;
  speakText: (text: string) => void;
  // Optional props for media sections
  onMediaSelect?: () => void;
}`}
    </pre>
    <h4 className="text-xl font-semibold text-gray-900 mt-8 mb-2">Edit Mode Pattern</h4>
    <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4 text-sm">
{`export function MySection({ section, isEditMode, onSectionChange }: MySectionProps) {
  if (isEditMode) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Edit controls */}
      </div>
    );
  }
  return (
    <div className="section-content">
      {/* View mode */}
    </div>
  );
}`}
    </pre>

    <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-12">Creating New Section Components</h3>
    <ol className="list-decimal list-inside ml-4 mt-2 text-lg text-gray-700 max-w-3xl mx-auto mb-8">
      <li><b>Define the type:</b> Add your section type to <code>sections.ts</code> and define its interface.</li>
      <li><b>Create the component:</b> Build your component in <code>components/sections/</code> following the props pattern.</li>
      <li><b>Export the component:</b> Add it to <code>index.ts</code>.</li>
      <li><b>Add to Page Controls:</b> Register in <code>PageControls.tsx</code> and enable in the customization panel.</li>
      <li><b>Add to CustomPageClient:</b> Add to <code>createDefaultSection</code> and <code>renderSection</code> functions.</li>
    </ol>

    <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-12">Text Styling & Media Integration</h3>
    <ul className="list-disc list-inside ml-4 mt-2 text-lg text-gray-700 max-w-3xl mx-auto mb-8">
      <li><b>TextStyleEditor:</b> Use for all text styling, with <code>textStyleToCSS</code> for view mode.</li>
      <li><b>MediaLibrary:</b> Use <code>onMediaSelect</code> and dialog pattern for media upload and selection.</li>
      <li><b>Flexible Positioning:</b> Media can be positioned top, bottom, left, or right relative to text.</li>
      <li><b>Type Safety:</b> All section types and media are fully typed in TypeScript.</li>
    </ul>

    <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-12">Best Practices</h3>
    <ul className="list-disc list-inside ml-4 mt-2 text-lg text-gray-700 max-w-3xl mx-auto mb-8">
      <li>Consistent props and edit/view mode pattern</li>
      <li>Accessibility and error handling</li>
      <li>Responsive and theme-aware styling</li>
      <li>Immutable state updates and validation</li>
      <li>Media optimization and loading states</li>
      <li>Performance: memoization, debouncing, lazy loading</li>
    </ul>

    <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-12">Troubleshooting & Debugging</h3>
    <ul className="list-disc list-inside ml-4 mt-2 text-lg text-gray-700 max-w-3xl mx-auto mb-8">
      <li>Component not appearing: check exports and registration in PageControls</li>
      <li>Text styling not working: ensure TextStyleEditor and textStyleToCSS are used</li>
      <li>Media upload not working: check onMediaSelect and MediaLibrary dialog integration</li>
      <li>TypeScript errors: check SectionType union and interface extensions</li>
      <li>Edit mode not working: ensure isEditMode prop is passed and handled</li>
    </ul>

    <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-12">Component Reference Table</h3>
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full text-sm border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-1 border">Section Component</th>
            <th className="px-2 py-1 border">Type</th>
            <th className="px-2 py-1 border">TextStyleEditor</th>
            <th className="px-2 py-1 border">Media Dialog</th>
            <th className="px-2 py-1 border">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border px-2 py-1">HeroSection</td><td className="border px-2 py-1">hero</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">Full-width hero with background media</td></tr>
          <tr><td className="border px-2 py-1">TextSection</td><td className="border px-2 py-1">text</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">Text content with optional media support</td></tr>
          <tr><td className="border px-2 py-1">FeatureSection</td><td className="border px-2 py-1">feature</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">Yes (cards)</td><td className="border px-2 py-1">Feature list with icons and descriptions</td></tr>
          <tr><td className="border px-2 py-1">SliderSection</td><td className="border px-2 py-1">slider</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">Image/video carousel with navigation</td></tr>
          <tr><td className="border px-2 py-1">GallerySection</td><td className="border px-2 py-1">gallery</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">Image gallery with grid layout</td></tr>
          <tr><td className="border px-2 py-1">MediaTextSection</td><td className="border px-2 py-1">media-text-left/right</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">Media with text (left or right)</td></tr>
          <tr><td className="border px-2 py-1">FeatureCardGridSection</td><td className="border px-2 py-1">feature-card-grid</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">Yes (cards)</td><td className="border px-2 py-1">Feature cards in grid layout</td></tr>
          <tr><td className="border px-2 py-1">InfoCardSection</td><td className="border px-2 py-1">info-card</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">Yes (cards)</td><td className="border px-2 py-1">Card grid with media and text</td></tr>
          <tr><td className="border px-2 py-1">CTASection</td><td className="border px-2 py-1">cta</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">No</td><td className="border px-2 py-1">Call-to-action with buttons</td></tr>
          <tr><td className="border px-2 py-1">DividerSection</td><td className="border px-2 py-1">divider</td><td className="border px-2 py-1">No</td><td className="border px-2 py-1">No</td><td className="border px-2 py-1">Visual separator line</td></tr>
          <tr><td className="border px-2 py-1">HeadingSection</td><td className="border px-2 py-1">heading</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">No</td><td className="border px-2 py-1">Standalone heading with styling</td></tr>
          <tr><td className="border px-2 py-1">QuoteSection</td><td className="border px-2 py-1">quote</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">No</td><td className="border px-2 py-1">Quote with author attribution</td></tr>
          <tr><td className="border px-2 py-1">FooterSection</td><td className="border px-2 py-1">footer</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">Yes (media col)</td><td className="border px-2 py-1">Multi-column footer with content</td></tr>
          <tr><td className="border px-2 py-1">ContactFormSection</td><td className="border px-2 py-1">contact-form</td><td className="border px-2 py-1">No</td><td className="border px-2 py-1">No</td><td className="border px-2 py-1">Contact form with customizable fields</td></tr>
          <tr><td className="border px-2 py-1">FluxeditaAdvancedFormSection</td><td className="border px-2 py-1">fluxedita_advanced_form</td><td className="border px-2 py-1">No</td><td className="border px-2 py-1">No</td><td className="border px-2 py-1">Advanced contact form with enhanced features</td></tr>
          <tr><td className="border px-2 py-1">PrivacySection</td><td className="border px-2 py-1">privacy</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">No</td><td className="border px-2 py-1">Privacy policy content section</td></tr>
          <tr><td className="border px-2 py-1">CustomCodeSection</td><td className="border px-2 py-1">custom-code</td><td className="border px-2 py-1">No</td><td className="border px-2 py-1">No</td><td className="border px-2 py-1">Custom HTML/CSS/JS code injection</td></tr>
        </tbody>
      </table>
    </div>

    <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-12">Conclusion</h3>
    <p className="mb-2">By following these patterns and best practices, developers can create consistent, maintainable, and user-friendly section components that integrate seamlessly with the existing system.</p>
    <ul className="list-disc list-inside ml-4 mt-2 text-lg text-gray-700 max-w-3xl mx-auto mb-8">
      <li>See <b>SECTION_AUDIT_REPORT.md</b> for a comprehensive audit of all implemented sections</li>
      <li>See <b>CUSTOM_CODE_GUIDE.md</b> for using the Custom Code Section component</li>
      <li>See <b>EDITABLE_PAGES_AND_SECTIONS_GUIDE.md</b> for an overview of the editable pages and sections system</li>
    </ul>
  </>
)

export function EditableSectionComponentsSection() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Editable Section Components</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Deep-dive into the architecture and best practices for editable section components.
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