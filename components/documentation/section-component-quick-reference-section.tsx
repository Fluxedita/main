"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, easeOut } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, ListChecks, FileText, Wrench } from "lucide-react"

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

const checklist = [
  "Add type to SectionType union in types/sections.ts",
  "Create interface extending BaseSection in types/sections.ts",
  "Add interface to Section union type in types/sections.ts",
  "Create component file in components/sections/",
  "Export component in components/sections/index.ts",
  "Add to sectionTypes array in PageControls.tsx",
  "Add to createDefaultSection function in CustomPageClient.tsx",
  "Add case to renderSection function in CustomPageClient.tsx",
]

const introHighlights = [
  {
    icon: ListChecks,
    title: "Quick Start",
    description: "Checklist for adding new section components.",
    color: "from-blue-500 to-sky-600",
  },
  {
    icon: FileText,
    title: "Templates & Types",
    description: "Reference for interfaces, templates, and file structure.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Wrench,
    title: "Troubleshooting",
    description: "Common issues and best practices for section integration.",
    color: "from-yellow-500 to-orange-500",
  },
]

const availableSections = [
  { type: "hero", component: "HeroSection", media: true, textStyling: true, description: "Full-width hero with background" },
  { type: "text", component: "TextSection", media: false, textStyling: true, description: "Simple text content" },
  { type: "content", component: "ContentSection", media: false, textStyling: true, description: "Default content section" },
  { type: "media-text-left", component: "MediaTextSection", media: true, textStyling: true, description: "Media with left text" },
  { type: "media-text-right", component: "MediaTextSection", media: true, textStyling: true, description: "Media with right text" },
  { type: "mediaTextColumns", component: "MediaTextColumnsSection", media: true, textStyling: true, description: "Media and text columns" },
  { type: "feature", component: "FeatureSection", media: true, textStyling: true, description: "Feature list with icons" },
  { type: "feature-card-grid", component: "FeatureCardGridSection", media: true, textStyling: true, description: "Feature cards grid" },
  { type: "info-card", component: "InfoCardSection", media: true, textStyling: true, description: "Info cards with media" },
  { type: "slider", component: "SliderSection", media: true, textStyling: true, description: "Image/video carousel" },
  { type: "advanced-slider", component: "AdvancedSliderSection", media: true, textStyling: true, description: "Advanced slider" },
  { type: "gallery", component: "GallerySection", media: true, textStyling: true, description: "Image gallery grid" },
  { type: "cta", component: "CTASection", media: false, textStyling: true, description: "Call-to-action section" },
  { type: "quote", component: "QuoteSection", media: false, textStyling: true, description: "Quote with author" },
  { type: "heading", component: "HeadingSection", media: false, textStyling: true, description: "Standalone heading" },
  { type: "twoColumnText", component: "TwoColumnTextSection", media: false, textStyling: true, description: "Two-column text" },
  { type: "divider", component: "DividerSection", media: false, textStyling: false, description: "Visual separator" },
  { type: "footer", component: "FooterSection", media: true, textStyling: true, description: "Multi-column footer" },
]

const troubleshooting = [
  {
    title: "Component Not in Sidebar",
    tips: [
      "Check sectionTypes array in PageControls.tsx",
      "Check component export in index.ts",
      "Check default enabled sections list",
    ],
  },
  {
    title: "Text Styling Not Working",
    tips: [
      "Import TextStyleEditor and textStyleToCSS",
      "Use TextStyleEditor in edit mode",
      "Use textStyleToCSS() in view mode",
    ],
  },
  {
    title: "Media Upload Not Working",
    tips: [
      "Add onMediaSelect prop",
      "Add media dialog to CustomPageClient.tsx",
      "Check mediaDialogIdx state management",
    ],
  },
  {
    title: "TypeScript Errors",
    tips: [
      "Add type to SectionType union",
      "Add interface to Section union",
      "Check interface extends BaseSection",
    ],
  },
]

const keyFiles = [
  { file: "types/sections.ts", description: "TypeScript definitions" },
  { file: "components/sections/index.ts", description: "Component exports" },
  { file: "components/PageControls.tsx", description: "Sidebar management" },
  { file: "[slug]/CustomPageClient.tsx", description: "Main page editor" },
  { file: "components/sections/TextStyleEditor.tsx", description: "Text styling system" },
]

const bestPractices = [
  "Always use the standard props pattern",
  "Render differently for edit vs view modes",
  "Use TextStyleEditor for all text styling",
  "Include proper error handling",
  "Follow the established CSS class patterns",
  "Use immutable state updates",
  "Include accessibility attributes",
  "Optimize for performance",
]

export function SectionComponentQuickReferenceSection() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Section Component Quick Reference</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A practical checklist and reference for creating and integrating new section components.
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
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">🚀 Quick Start Checklist</h3>
                <ul className="list-disc pl-6 text-gray-800 space-y-1">
                  {checklist.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">📝 Component Template</h3>
                <pre className="bg-gray-100 rounded p-4 text-xs overflow-x-auto"><code>{`import { MySection as MySectionType } from '../../types/sections';
import { TextStyleEditor, TextStyle, textStyleToCSS } from './TextStyleEditor';

interface MySectionProps {
  section: MySectionType;
  isEditMode: boolean;
  onSectionChange: (section: MySectionType) => void;
  speakText: (text: string) => void;
  onMediaSelect?: () => void; // If media support needed
}

export function MySection({ 
  section, 
  isEditMode, 
  onSectionChange, 
  speakText,
  onMediaSelect 
}: MySectionProps) {
  // Handler functions
  const handleTitleChange = (title: string) => {
    onSectionChange({ ...section, title });
  };

  const handleTextStyleChange = (style: TextStyle) => {
    onSectionChange({ 
      ...section, 
      textStyle: { ...section.textStyle, ...style } 
    });
  };

  // Edit mode
  if (isEditMode) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="space-y-4">
          {/* Edit controls */}
          <TextStyleEditor
            value={section.textStyle || {}}
            onChange={handleTextStyleChange}
            label="Text Style"
          />
        </div>
      </div>
    );
  }

  // View mode
  return (
    <div className="my-section">
      <h2 style={textStyleToCSS(section.textStyle)}>{section.title}</h2>
    </div>
  );
}`}</code></pre>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">🎨 Text Styling & Media Integration</h3>
                <div className="space-y-2">
                  <p className="text-gray-800"><b>Text Styling:</b> Use <code>TextStyleEditor</code> in edit mode and <code>textStyleToCSS()</code> in view mode.</p>
                  <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto"><code>{`import { TextStyleEditor, TextStyle, textStyleToCSS } from './TextStyleEditor';

// In edit mode
<TextStyleEditor
  value={section.textStyle || {}}
  onChange={handleTextStyleChange}
  label="Text Style"
/>

// In view mode
<span style={textStyleToCSS(section.textStyle)}>
  {section.content}
</span>`}</code></pre>
                  <p className="text-gray-800"><b>Media Library:</b> Add <code>onMediaSelect</code> prop and use a media dialog in <code>CustomPageClient.tsx</code> for media support.</p>
                  <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto"><code>{`// In props interface
onMediaSelect?: () => void;

// In edit mode
<button onClick={onMediaSelect}>
  Add Media
</button>

// In CustomPageClient.tsx
onMediaSelect={() => setMediaDialogIdx(idx)}

// Media dialog setup
const [mediaDialogIdx, setMediaDialogIdx] = useState<number | null>(null);
{mediaDialogIdx !== null && (
  <MediaLibrary
    isDialog
    type="all"
    onCloseAction={() => setMediaDialogIdx(null)}
    onSelectAction={(url, type) => {
      // Handle media selection
      setMediaDialogIdx(null);
    }}
  />
)}`}</code></pre>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">📋 Available Section Types</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-xs border border-gray-200 rounded">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-2 py-1 border">Type</th>
                        <th className="px-2 py-1 border">Component</th>
                        <th className="px-2 py-1 border">Media</th>
                        <th className="px-2 py-1 border">Text Styling</th>
                        <th className="px-2 py-1 border">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {availableSections.map((s, i) => (
                        <tr key={i} className="border-t">
                          <td className="px-2 py-1 border font-mono">{s.type}</td>
                          <td className="px-2 py-1 border font-mono">{s.component}</td>
                          <td className="px-2 py-1 border text-center">{s.media ? "✅" : "❌"}</td>
                          <td className="px-2 py-1 border text-center">{s.textStyling ? "✅" : "❌"}</td>
                          <td className="px-2 py-1 border">{s.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">🔧 Common Patterns</h3>
                <div className="space-y-2">
                  <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto"><code>{`// State update
const handleChange = (newValue: string) => {
  onSectionChange({ ...section, property: newValue });
};

// Text style update
const handleTextStyleChange = (style: TextStyle) => {
  onSectionChange({ 
    ...section, 
    textStyle: { ...section.textStyle, ...style } 
  });
};

// Media update
const handleMediaChange = (mediaUrl: string, mediaType: 'image' | 'video') => {
  onSectionChange({ ...section, mediaUrl, mediaType });
};`}</code></pre>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">🐛 Troubleshooting</h3>
                <div className="space-y-4">
                  {troubleshooting.map((t, i) => (
                    <div key={i}>
                      <div className="font-semibold text-gray-800">{t.title}</div>
                      <ul className="list-disc pl-6 text-gray-700">
                        {t.tips.map((tip, j) => (
                          <li key={j}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">📚 Key Files</h3>
                <ul className="list-disc pl-6 text-gray-800 space-y-1">
                  {keyFiles.map((f, i) => (
                    <li key={i}><span className="font-mono bg-gray-50 px-1 py-0.5 rounded border border-gray-200 mr-2">{f.file}</span> {f.description}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">🎯 Best Practices</h3>
                <ul className="list-disc pl-6 text-gray-800 space-y-1">
                  {bestPractices.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
              <div className="text-gray-500 text-xs mt-8">
                For detailed information, see the full <a href="./EDITABLE_SECTION_COMPONENT_GUIDE.md" className="underline text-blue-600">Editable Section Component Guide</a>.
              </div>
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