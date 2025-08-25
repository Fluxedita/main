"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// Public docs page that explains each editable section component's purpose and capabilities.
// Source: EDITABLE_SECTION_COMPONENT_FUNCTIONS_GUIDE.md and EDITABLE_SECTION_COMPONENT_GUIDE.md
// This page is intentionally static (no component imports) to avoid coupling and ensure it always builds.

type SectionDoc = {
  key: string
  title: string
  purpose: string
  capabilities: string[]
  useCases: string[]
  tips?: string[]
}

const sections: SectionDoc[] = [
  {
    key: 'hero',
    title: 'HeroSection (hero)',
    purpose: 'Full-width introductory banner to set page identity and focus.',
    capabilities: [
      'Background image or video with overlay',
      'Headline, subheadline, CTAs',
      'TextStyleEditor support for headings/paragraphs',
      'Optional speech and visibility toggles',
    ],
    useCases: ['Landing page header', 'Campaign announcements', 'Product/creator spotlight'],
    tips: ['Ensure overlay contrast for legibility', 'Use 1–2 clear CTAs with concise copy'],
  },
  {
    key: 'hero-responsive',
    title: 'HeroSectionResponsive (hero-responsive)',
    purpose: 'Hero optimized for varied layouts and smaller screens.',
    capabilities: [
      'Responsive layout controls beyond standard hero',
      'Media + text with adaptive behavior',
    ],
    useCases: ['Mobile-first pages', 'When standard hero crops key media on small screens'],
    tips: ['Prefer when critical media must remain visible on mobile'],
  },
  {
    key: 'text',
    title: 'TextSection (text)',
    purpose: 'Rich text content area for paragraphs, lists, and editorial blocks.',
    capabilities: [
      'Rich text/HTML rendering',
      'Full TextStyleEditor (font, color, size, shadow, outline, background capsule)',
      'Optional media with positioning (top, bottom, left, right)',
    ],
    useCases: ['Articles, updates, disclaimers', 'Text with optional illustrative media'],
    tips: ['Keep paragraphs scannable', 'Use background capsule for over-image readability'],
  },
  {
    key: 'content',
    title: 'ContentSection (content)',
    purpose: 'General-purpose content block with sane defaults.',
    capabilities: ['Simple text content with styling', 'Lightweight vs TextSection'],
    useCases: ['Generic page content where advanced formatting isn\'t needed'],
    tips: ['Start here for speed; upgrade to TextSection for richer layout'],
  },
  {
    key: 'media-text-left',
    title: 'MediaTextSection (media-text-left)',
    purpose: 'Paired media with descriptive text (media on the left).',
    capabilities: [
      'Image or video with left/right positioning',
      'Headline, body, optional buttons',
      'TextStyleEditor support',
    ],
    useCases: ['Product feature + visual', 'Testimonial photo + quote', 'About portrait + bio'],
    tips: ['Keep media aspect ratios consistent across repetitions'],
  },
  {
    key: 'media-text-right',
    title: 'MediaTextSection (media-text-right)',
    purpose: 'Paired media with descriptive text (media on the right).',
    capabilities: [
      'Image or video with left/right positioning',
      'Headline, body, optional buttons',
      'TextStyleEditor support',
    ],
    useCases: ['Product feature + visual', 'Testimonial photo + quote', 'About portrait + bio'],
    tips: ['Consistent cropping maintains visual rhythm'],
  },
  {
    key: 'divider',
    title: 'DividerSection (divider)',
    purpose: 'Visual separation between content blocks.',
    capabilities: ['Simple line or spacing divider'],
    useCases: ['Break long pages into digestible sections'],
    tips: ['Use sparingly; excessive dividers add noise'],
  },
  {
    key: 'heading',
    title: 'HeadingSection (heading)',
    purpose: 'Standalone heading to introduce a new page area.',
    capabilities: ['TextStyleEditor for heading', 'Optional subtext depending on configuration'],
    useCases: ['Section headers like “Features”, “Gallery”, “FAQ”'],
    tips: ['Keep headings descriptive and consistent'],
  },
  {
    key: 'quote',
    title: 'QuoteSection (quote)',
    purpose: 'Emphasize a quote, pull-quote, or short testimonial.',
    capabilities: ['Quote text + author/source', 'TextStyleEditor for typographic emphasis'],
    useCases: ['Testimonials', 'Press quotes', 'Inspirational statements'],
    tips: ['Keep it short so it doesn\'t compete with primary CTAs'],
  },
  {
    key: 'cta',
    title: 'CTASection (cta)',
    purpose: 'Drive a single, focused action.',
    capabilities: ['Headline, supporting text, buttons', 'TextStyleEditor for emphasis'],
    useCases: ['Sign up', 'Subscribe', 'Purchase', 'Contact prompts'],
    tips: ['One primary action per CTA block'],
  },
  {
    key: 'gallery',
    title: 'GallerySection (gallery)',
    purpose: 'Grid of images (and optionally videos) with light captions.',
    capabilities: ['Media library integration', 'Responsive grid', 'Optional captions styling'],
    useCases: ['Portfolio', 'Product imagery', 'Event photos'],
    tips: ['Optimize images; keep cropping consistent'],
  },
  {
    key: 'mediaTextColumns',
    title: 'MediaTextColumnsSection (mediaTextColumns)',
    purpose: 'Columnar layout combining media and text blocks.',
    capabilities: ['Multi-column arrangement', 'TextStyleEditor for headings/copy'],
    useCases: ['Process steps with icons/photos + descriptions', 'Balanced media/text content'],
    tips: ['Alternate media/text per row for cadence'],
  },
  {
    key: 'twoColumnText',
    title: 'TwoColumnTextSection (twoColumnText)',
    purpose: 'Text-only two-column layout for information density.',
    capabilities: ['Two parallel text columns', 'TextStyleEditor for headings/paragraphs'],
    useCases: ['Feature lists', 'Specifications', 'FAQs', 'Pros/cons'],
    tips: ['Ensure good stacking on mobile'],
  },
  {
    key: 'feature',
    title: 'FeatureSection (feature)',
    purpose: 'Summarize multiple features/benefits succinctly.',
    capabilities: ['Grid/list of items with icon/media, title, description', 'TextStyleEditor'],
    useCases: ['Product/service benefits', 'Platform capabilities'],
    tips: ['Keep copy consistent in length; use recognizable icons'],
  },
  {
    key: 'slider',
    title: 'SliderSection (slider)',
    purpose: 'Carousel of media with optional text overlays.',
    capabilities: ['Images/videos per slide', 'Navigation, pagination, autoplay, effects', 'Caption styling'],
    useCases: ['Visual storytelling', 'Highlights reel', 'Alternative hero'],
    tips: ['Avoid too much text; ensure accessible controls'],
  },
  {
    key: 'feature-card-grid',
    title: 'FeatureCardGridSection (feature-card-grid)',
    purpose: 'Card-based alternative to Feature with richer visuals.',
    capabilities: ['Card grid with media, title, description, optional actions', 'TextStyleEditor per card'],
    useCases: ['Services catalog', 'Package tiers', 'Portfolio items'],
    tips: ['Uniform media aspect ratios; limit to 6–12 cards for focus'],
  },
  {
    key: 'advanced-slider',
    title: 'AdvancedSliderSection (advanced-slider)',
    purpose: 'More configurable slider for complex showcases.',
    capabilities: ['Advanced transitions/controls', 'Potential per-slide custom layouts'],
    useCases: ['Campaigns', 'Case studies', 'Dynamic hero experiences'],
    tips: ['Prefer standard slider unless advanced options are required'],
  },
  {
    key: 'info-card',
    title: 'InfoCardSection (info-card)',
    purpose: 'Informational cards with media and text.',
    capabilities: ['Card grid with image/video, headline, body', 'Optional links/buttons', 'TextStyleEditor'],
    useCases: ['Team members', 'Stats callouts', 'Resource links'],
    tips: ['Use concise headlines; group by theme'],
  },
  {
    key: 'privacy',
    title: 'PrivacySection (privacy)',
    purpose: 'Present legal/privacy content in a readable format.',
    capabilities: ['Long-form text with headings/lists', 'TextStyleEditor for readability'],
    useCases: ['Privacy policy', 'Terms', 'Disclosures'],
    tips: ['Keep content current with legal requirements'],
  },
  {
    key: 'custom-code',
    title: 'CustomCodeSection (custom-code)',
    purpose: 'Embed custom HTML/CSS/JS for bespoke behavior.',
    capabilities: ['Raw code injection into the page section'],
    useCases: ['Third-party widgets', 'Special layouts', 'Micro-interactions'],
    tips: ['Validate/sanitize inputs; avoid blocking scripts; document dependencies'],
  },
  {
    key: 'contact-form',
    title: 'ContactFormSection (contact-form)',
    purpose: 'Collect basic inquiries.',
    capabilities: ['Configurable fields', 'Integration with email/backend'],
    useCases: ['General contact', 'Support requests', 'Partnership inquiries'],
    tips: ['Keep the form short; add clear success/error messaging'],
  },
  {
    key: 'fluxedita_advanced_form',
    title: 'FluxeditaAdvancedFormSection (fluxedita_advanced_form)',
    purpose: 'Powerful form with enhanced validation and workflows.',
    capabilities: ['Advanced fields', 'Potential conditional logic', 'Improved submission handling'],
    useCases: ['Applications', 'Surveys', 'Multi-step data collection'],
    tips: ['Prototype flows; minimize required fields for completion'],
  },
  {
    key: 'footer',
    title: 'FooterSection (footer)',
    purpose: 'Site-wide navigational and informational footer.',
    capabilities: ['Multi-column layout (links, contact, social)', 'Optional media/logo column', 'Styled headings/links'],
    useCases: ['Global footer on all pages or premium area landing pages'],
    tips: ['Group links and keep them minimal; include clear contact/social paths'],
  },
]

// Lightweight illustration component to visualize a sample layout for each section.
// Uses simple placeholder blocks so it remains framework-agnostic and build-safe.
function Illustration({ type }: { type: string }) {
  // Accent color palette per type group
  const getAccent = (t: string) => {
    const map: Record<string, { media: string; soft: string; chip: string }> = {
      hero: { media: 'from-fuchsia-500 to-purple-600', soft: 'bg-fuchsia-200/50 dark:bg-fuchsia-900/40', chip: 'bg-fuchsia-600' },
      'hero-responsive': { media: 'from-indigo-500 to-sky-600', soft: 'bg-indigo-200/50 dark:bg-indigo-900/40', chip: 'bg-indigo-600' },
      text: { media: 'from-emerald-500 to-lime-600', soft: 'bg-emerald-200/50 dark:bg-emerald-900/40', chip: 'bg-emerald-600' },
      content: { media: 'from-teal-500 to-cyan-600', soft: 'bg-teal-200/50 dark:bg-teal-900/40', chip: 'bg-teal-600' },
      'media-text-left': { media: 'from-amber-500 to-orange-600', soft: 'bg-amber-200/50 dark:bg-amber-900/40', chip: 'bg-amber-600' },
      'media-text-right': { media: 'from-amber-500 to-orange-600', soft: 'bg-amber-200/50 dark:bg-amber-900/40', chip: 'bg-amber-600' },
      divider: { media: 'from-zinc-400 to-zinc-600', soft: 'bg-zinc-200/50 dark:bg-zinc-800/60', chip: 'bg-zinc-600' },
      heading: { media: 'from-rose-500 to-pink-600', soft: 'bg-rose-200/50 dark:bg-rose-900/40', chip: 'bg-rose-600' },
      quote: { media: 'from-violet-500 to-purple-600', soft: 'bg-violet-200/50 dark:bg-violet-900/40', chip: 'bg-violet-600' },
      cta: { media: 'from-blue-500 to-cyan-600', soft: 'bg-blue-200/50 dark:bg-blue-900/40', chip: 'bg-blue-600' },
      gallery: { media: 'from-pink-500 to-fuchsia-600', soft: 'bg-pink-200/50 dark:bg-pink-900/40', chip: 'bg-pink-600' },
      mediaTextColumns: { media: 'from-emerald-500 to-teal-600', soft: 'bg-emerald-200/50 dark:bg-emerald-900/40', chip: 'bg-emerald-600' },
      twoColumnText: { media: 'from-sky-500 to-blue-600', soft: 'bg-sky-200/50 dark:bg-sky-900/40', chip: 'bg-sky-600' },
      feature: { media: 'from-orange-500 to-red-600', soft: 'bg-orange-200/50 dark:bg-orange-900/40', chip: 'bg-orange-600' },
      'feature-card-grid': { media: 'from-cyan-500 to-teal-600', soft: 'bg-cyan-200/50 dark:bg-cyan-900/40', chip: 'bg-cyan-600' },
      'advanced-slider': { media: 'from-purple-500 to-indigo-600', soft: 'bg-purple-200/50 dark:bg-purple-900/40', chip: 'bg-purple-600' },
      'info-card': { media: 'from-lime-500 to-emerald-600', soft: 'bg-lime-200/50 dark:bg-lime-900/40', chip: 'bg-lime-600' },
      privacy: { media: 'from-zinc-500 to-slate-600', soft: 'bg-slate-200/50 dark:bg-slate-900/40', chip: 'bg-slate-600' },
      'custom-code': { media: 'from-neutral-500 to-zinc-600', soft: 'bg-neutral-200/50 dark:bg-neutral-900/40', chip: 'bg-neutral-700' },
      'contact-form': { media: 'from-green-500 to-emerald-600', soft: 'bg-green-200/50 dark:bg-green-900/40', chip: 'bg-green-600' },
      'fluxedita_advanced_form': { media: 'from-green-500 to-emerald-600', soft: 'bg-green-200/50 dark:bg-green-900/40', chip: 'bg-green-600' },
      footer: { media: 'from-slate-500 to-gray-600', soft: 'bg-slate-200/50 dark:bg-slate-900/40', chip: 'bg-slate-600' },
      slider: { media: 'from-purple-500 to-indigo-600', soft: 'bg-purple-200/50 dark:bg-purple-900/40', chip: 'bg-purple-600' },
    }
    return map[t] || { media: 'from-blue-500 to-indigo-600', soft: 'bg-blue-200/50 dark:bg-blue-900/40', chip: 'bg-blue-600' }
  }

  const accent = getAccent(type)

  const Box = ({ className = '' }: { className?: string }) => (
    <motion.div
      className={`rounded bg-gradient-to-br ${accent.media} shadow-lg ring-1 ring-white/20 ${className}`}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      whileHover={{ scale: 1.01 }}
    />
  )

  const Text = ({ className = '' }: { className?: string }) => (
    <motion.div
      className={`h-3 rounded ${accent.soft} ${className}`}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    />
  )

  // Semantic text placeholders
  const Heading = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <motion.div
      className={`text-base font-semibold tracking-tight text-gray-900 dark:text-gray-100 ${className}`}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.div>
  )

  const Paragraph = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <motion.div
      className={`text-sm text-gray-600 dark:text-gray-300 ${className}`}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.div>
  )

  const Button = () => (
    <motion.div
      className={`inline-block px-3 py-1 ${accent.chip} text-white text-xs rounded shadow-sm`}
      whileHover={{ y: -1, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      Button
    </motion.div>
  )

  const SectionFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <motion.div
      className="border rounded-xl p-5 bg-white/80 dark:bg-neutral-900/80 shadow-md ring-1 ring-black/5 backdrop-blur"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  )

  switch (type) {
    case 'hero':
    case 'hero-responsive':
      return (
        <SectionFrame>
          <div className="relative h-44 md:h-52 rounded overflow-hidden">
            <Box className="absolute inset-0" />
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 gap-1 text-center">
              <motion.div className="text-white text-lg md:text-xl font-semibold drop-shadow" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}>Hero Title</motion.div>
              <motion.div className="text-white/90 text-sm md:text-base drop-shadow" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{delay:0.05}}>Supporting subtitle for the hero section.</motion.div>
              <div className="mt-2 flex gap-2"><Button /><Button /></div>
            </div>
          </div>
        </SectionFrame>
      )
    case 'text':
      return (
        <SectionFrame>
          <div className="space-y-2 text-center">
            <Heading className="mx-auto">This is a section title</Heading>
            <Paragraph className="mx-auto">This is a text area that describes the section. Add a few sentences to explain the content or purpose.</Paragraph>
            <Paragraph className="mx-auto">You can format text, add links, and include media depending on the section settings.</Paragraph>
          </div>
        </SectionFrame>
      )
    case 'content':
      return (
        <SectionFrame>
          <div className="space-y-2 text-center">
            <Heading className="mx-auto">Content block heading</Heading>
            <Paragraph className="mx-auto">This is a rich content area for longer descriptions, FAQs, or editorial copy.</Paragraph>
            <Paragraph className="mx-auto">Use it to provide context, details, and supporting information.</Paragraph>
          </div>
        </SectionFrame>
      )
    case 'media-text-left':
    case 'media-text-right': {
      const mediaLeft = type === 'media-text-left'
      return (
        <SectionFrame>
          <div className="grid grid-cols-5 gap-4 items-start">
            {mediaLeft && <Box className="col-span-2 aspect-video" />}
            <div className="col-span-3 space-y-2 text-center">
              <Heading className="mx-auto">Media with text</Heading>
              <Paragraph className="mx-auto">Describe the media on the side and include a call to action.</Paragraph>
              <div className="pt-2 flex justify-center"><Button /></div>
            </div>
            {!mediaLeft && <Box className="col-span-2 aspect-video" />}
          </div>
        </SectionFrame>
      )
    }
    case 'divider':
      return (
        <SectionFrame>
          <div className="h-0.5 bg-gray-300 dark:bg-neutral-700" />
        </SectionFrame>
      )
    case 'heading':
      return (
        <SectionFrame>
          <div className="space-y-2 text-center">
            <Heading className="mx-auto">Section heading</Heading>
            <Paragraph className="mx-auto">Short supporting description.</Paragraph>
          </div>
        </SectionFrame>
      )
    case 'quote':
      return (
        <SectionFrame>
          <div className="italic space-y-3 text-center">
            <Paragraph className="mx-auto">“This is a featured quote or testimonial to highlight key feedback.”</Paragraph>
            <Paragraph className="mx-auto">— Quote attribution</Paragraph>
          </div>
        </SectionFrame>
      )
    case 'cta':
      return (
        <SectionFrame>
          <div className="space-y-3 text-center">
            <Heading className="mx-auto">Call to action</Heading>
            <Paragraph className="mx-auto">Encourage users to take a specific next step.</Paragraph>
            <div className="pt-1 flex gap-2 justify-center"><Button /><Button /></div>
          </div>
        </SectionFrame>
      )
    case 'gallery':
      return (
        <SectionFrame>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <Box key={i} className="aspect-square" />
            ))}
          </div>
        </SectionFrame>
      )
    case 'mediaTextColumns':
      return (
        <SectionFrame>
          <div className="grid grid-cols-2 gap-4">
            <Box className="aspect-video" />
            <div className="space-y-2 text-center">
              <Heading className="mx-auto">Two-column feature</Heading>
              <Paragraph className="mx-auto">Use this layout to pair visuals with descriptive copy.</Paragraph>
            </div>
          </div>
        </SectionFrame>
      )
    case 'twoColumnText':
      return (
        <SectionFrame>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 text-center">
              <Heading className="mx-auto">Left column title</Heading>
              <Paragraph className="mx-auto">This column holds supporting text for topic A.</Paragraph>
            </div>
            <div className="space-y-2 text-center">
              <Heading className="mx-auto">Right column title</Heading>
              <Paragraph className="mx-auto">This column holds supporting text for topic B.</Paragraph>
            </div>
          </div>
        </SectionFrame>
      )
    case 'feature':
      return (
        <SectionFrame>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Box className="h-10 w-10 rounded-full mx-auto" />
                <Heading className="mx-auto">Feature title</Heading>
                <Paragraph className="mx-auto">Short description for this feature.</Paragraph>
              </div>
            ))}
          </div>
        </SectionFrame>
      )
    case 'feature-card-grid':
    case 'info-card':
      return (
        <SectionFrame>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border rounded-xl p-3 space-y-2 text-center shadow-sm ring-1 ring-black/5">
                <Box className="aspect-video" />
                <Heading className="mx-auto">Card title</Heading>
                <Paragraph className="mx-auto">Supporting card description text.</Paragraph>
                <div className="pt-1 flex justify-center"><Button /></div>
              </div>
            ))}
          </div>
        </SectionFrame>
      )
    case 'slider':
    case 'advanced-slider':
      return (
        <SectionFrame>
          <div className="space-y-3">
            <Box className="aspect-video" />
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-2 w-2 rounded-full bg-gray-300 dark:bg-neutral-700" />
              ))}
            </div>
          </div>
        </SectionFrame>
      )
    case 'privacy':
      return (
        <SectionFrame>
          <div className="space-y-2">
            <Text className="w-1/3 h-4" />
            {Array.from({ length: 6 }).map((_, i) => (
              <Text key={i} className="w-full" />
            ))}
          </div>
        </SectionFrame>
      )
    case 'custom-code':
      return (
        <SectionFrame>
          <div className="font-mono text-xs bg-neutral-50 dark:bg-neutral-950 p-3 rounded border dark:border-neutral-800">
            <div className="h-3 w-3/5 bg-gray-200 dark:bg-neutral-800 rounded mb-2" />
            <div className="h-3 w-4/5 bg-gray-200 dark:bg-neutral-800 rounded mb-2" />
            <div className="h-3 w-2/3 bg-gray-200 dark:bg-neutral-800 rounded" />
          </div>
        </SectionFrame>
      )
    case 'contact-form':
    case 'fluxedita_advanced_form':
      return (
        <SectionFrame>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Paragraph className="text-xs text-gray-500">Name</Paragraph>
              <Box className="h-8" />
              <Paragraph className="text-xs text-gray-500">Email</Paragraph>
              <Box className="h-8" />
              <Paragraph className="text-xs text-gray-500">Message</Paragraph>
              <Box className="h-24" />
            </div>
            <div className="space-y-3">
              <div className="space-y-2">
                <Paragraph className="text-xs text-gray-500">Subject</Paragraph>
                <Box className="h-8" />
              </div>
              <div className="space-y-2">
                <Paragraph className="text-xs text-gray-500">Phone</Paragraph>
                <Box className="h-8" />
              </div>
              <div className="pt-2"><Button /></div>
            </div>
          </div>
        </SectionFrame>
      )
    case 'footer':
      return (
        <SectionFrame>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Heading className="mx-auto">Footer column</Heading>
                {Array.from({ length: 4 }).map((_, j) => (
                  <Paragraph key={j} className="mx-auto">Link item</Paragraph>
                ))}
              </div>
            ))}
          </div>
        </SectionFrame>
      )
    default:
      return (
        <SectionFrame>
          <div className="space-y-2 text-center">
            <Heading>Generic section title</Heading>
            <Paragraph>Generic section body text to illustrate layout.</Paragraph>
          </div>
        </SectionFrame>
      )
  }
}

// Floating, collapsible left navigation linking to section anchors and tracking active item
function LeftFloatingNav({ visibleKeys }: { visibleKeys: string[] }) {
  const [collapsed, setCollapsed] = React.useState(true)
  const [activeId, setActiveId] = React.useState<string | null>(null)

  const items = React.useMemo(
    () =>
      visibleKeys.map((k) => {
        const s = sections.find((x) => x.key === k)
        return { id: `section-${k}`, label: s ? s.title : k }
      }),
    [visibleKeys]
  )

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1))
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { root: null, rootMargin: '0px 0px -70% 0px', threshold: [0, 0.1, 0.25] }
    )
    items.forEach((it) => {
      const el = document.getElementById(it.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.aside
      className="hidden lg:block fixed left-4 top-28 z-30"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45 }}
      aria-label="Sections navigation"
    >
      <motion.div
        className="relative bg-white/80 dark:bg-neutral-900/80 backdrop-blur rounded-xl shadow-md ring-1 ring-black/5 overflow-hidden"
        animate={{ width: collapsed ? 44 : 260 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      >
        <div className="p-2 flex items-center gap-2 border-b border-black/5">
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
            aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
          >
            <span className="text-xs font-semibold">{collapsed ? '>' : '<'}</span>
          </button>
          {!collapsed && (
            <div className="text-sm font-medium text-gray-700 dark:text-gray-200">On this page</div>
          )}
        </div>
        {!collapsed && (
          <ul className="max-h-[70vh] overflow-auto py-2">
            {items.map((it: { id: string; label: string }) => {
              const active = activeId === it.id
              return (
                <li key={it.id}>
                  <a
                    href={`#${it.id}`}
                    onClick={(e) => onLinkClick(e, it.id)}
                    className={`group flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                      active
                        ? 'text-gray-900 dark:text-gray-100'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  >
                    <span
                      className={`inline-block h-2 w-2 rounded-full transition-colors ${
                        active ? 'bg-blue-600' : 'bg-gray-300 dark:bg-neutral-700 group-hover:bg-blue-400'
                      }`}
                    />
                    <span className="truncate">{it.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        )}
      </motion.div>
    </motion.aside>
  )
}

export default function SectionsDocsPage() {
  const [query, setQuery] = React.useState("")
  const [view, setView] = React.useState<'compact' | 'detailed'>("detailed")

  const filteredSections = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return sections
    const matches = (s: SectionDoc) => {
      if (s.title.toLowerCase().includes(q)) return true
      if (s.purpose.toLowerCase().includes(q)) return true
      if (s.capabilities.some((c) => c.toLowerCase().includes(q))) return true
      if (s.useCases.some((u) => u.toLowerCase().includes(q))) return true
      if (s.tips && s.tips.some((t) => t.toLowerCase().includes(q))) return true
      return false
    }
    return sections.filter(matches)
  }, [query])

  // House-style alternating palettes used only in compact view
  // Inspired by the Fluxedita brand icon: fuchsia/pink → purple → indigo/blue on a dark base
  const compactPalette = React.useMemo(
    () => [
      // fuchsia → purple (brand)
      'bg-[linear-gradient(to_bottom_right,_hsl(var(--brand-fuchsia)/0.12),_hsl(var(--brand-purple)/0.12))] border-[hsl(var(--brand-fuchsia)/0.20)] hover:ring-[hsl(var(--brand-purple)/0.30)]',
      // indigo → blue (brand)
      'bg-[linear-gradient(to_bottom_right,_hsl(var(--brand-indigo)/0.12),_hsl(var(--brand-blue)/0.12))] border-[hsl(var(--brand-indigo)/0.20)] hover:ring-[hsl(var(--brand-blue)/0.30)]',
      // purple → indigo (brand alt)
      'bg-[linear-gradient(to_bottom_right,_hsl(var(--brand-purple)/0.12),_hsl(var(--brand-indigo)/0.12))] border-[hsl(var(--brand-purple)/0.20)] hover:ring-[hsl(var(--brand-indigo)/0.30)]',
      // blue → fuchsia (brand accent)
      'bg-[linear-gradient(to_bottom_right,_hsl(var(--brand-blue)/0.12),_hsl(var(--brand-fuchsia)/0.12))] border-[hsl(var(--brand-blue)/0.20)] hover:ring-[hsl(var(--brand-fuchsia)/0.30)]',
    ],
    []
  )
  return (
    <>
      <Header />
      <br></br>
      <header className="mb-0 w-[60vw] mx-auto text-center">
          <motion.h1
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Editable Section Components
          </motion.h1>
          <motion.p
            className="text-muted-foreground mt-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            Purpose, capabilities, and ideal use cases for each section type.
          </motion.p>
          <div className="mt-4 text-sm">
            <p>
              Related: <code>EDITABLE_SECTION_COMPONENT_FUNCTIONS_GUIDE.md</code>,{' '}
              <code>EDITABLE_SECTION_COMPONENT_GUIDE.md</code>,{' '}
              <code>SECTION_COMPONENT_QUICK_REFERENCE.md</code>
            </p>
          </div>
        </header>
      <main className="max-w-none mx-auto px-4 py-10">
        <LeftFloatingNav visibleKeys={filteredSections.map((s) => s.key)} />
          <div className="w-[60vw] mx-auto">
            <label htmlFor="section-search" className="sr-only">Search sections</label>
            <input
              id="section-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, purpose, capabilities, use cases..."
              className="w-full rounded-md border border-black/10 bg-white/80 dark:bg-neutral-900/80 px-3 py-2 text-sm shadow-sm ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <br></br>
        {/* Controls: centered view toggle above search */}
        <div className="mb-8 w-[60vw] mx-auto flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">View:</span>
            <div className="inline-flex rounded-md border border-black/10 bg-white/80 dark:bg-neutral-900/80 p-0.5">
              <button
                type="button"
                onClick={() => setView('compact')}
                className={`${view === 'compact' ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-200'} px-3 py-1.5 text-sm rounded-md transition-colors`}
                aria-pressed={view === 'compact'}
              >
                Compact
              </button>
              <button
                type="button"
                onClick={() => setView('detailed')}
                className={`${view === 'detailed' ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-200'} px-3 py-1.5 text-sm rounded-md transition-colors`}
                aria-pressed={view === 'detailed'}
              >
                Detailed
              </button>
            </div>
          </div>
        </div>
        {/* Sections list */
        }
        <div className="space-y-8">
          {filteredSections.map((s, idx) => (
            <motion.section
              key={s.key}
              id={`section-${s.key}`}
              className={`${
                view === 'compact'
                  ? `w-[60vw] mx-auto border rounded-xl p-5 shadow-sm ring-1 transition-all duration-200 hover:shadow-lg hover:ring-2 ${compactPalette[idx % compactPalette.length]}`
                  : 'w-[60vw] mx-auto border rounded-xl p-5 bg-white/60 dark:bg-neutral-900/60 shadow-sm ring-1 ring-black/5 transition-all duration-200 hover:shadow-lg hover:ring-2 hover:ring-black/10'
              } scroll-mt-24`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: Math.min(idx * 0.04, 0.3) }}
            >
              {view === 'compact' ? (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{s.title}</h2>
                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">{s.purpose}</p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold">{s.title}</h2>
                  <p className="mt-2">{s.purpose}</p>

                  {/* Illustration preview */}
                  <div className="mt-4">
                    <Illustration type={s.key} />
                  </div>

                  <div className="mt-4 grid md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Capabilities</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {s.capabilities.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Ideal use cases</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {s.useCases.map((u, i) => (
                          <li key={i}>{u}</li>
                        ))}
                      </ul>
                    </div>

                    {s.tips && (
                      <div>
                        <h3 className="font-medium mb-2">Tips</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {s.tips.map((t, i) => (
                            <li key={i}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              )}
            </motion.section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
