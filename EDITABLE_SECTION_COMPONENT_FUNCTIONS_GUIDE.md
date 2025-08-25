# Editable Section Component Functions Guide

This guide explains what each editable section component is for, what it can do, and ideal use cases. It complements:
- `EDITABLE_SECTION_COMPONENT_GUIDE.md` (architecture, patterns, how to build)
- `SECTION_COMPONENT_QUICK_REFERENCE.md` (at‑a‑glance matrix)

Use this document to choose the right section for your page and to scope your content quickly.

---

## How to read this guide
For each section you’ll find:
- Purpose: why this section exists
- Capabilities: what you can configure/do
- Ideal use cases: common scenarios where it shines
- Tips: practical guidance and constraints

Section types and names mirror `types/sections.ts` and the components listed in:
- `EDITABLE_SECTION_COMPONENT_GUIDE.md` → "Available Section Types" and "Component Reference"
- `SECTION_COMPONENT_QUICK_REFERENCE.md` → "Available Section Types"

---

## Overview of available section types
1. hero
2. hero-responsive
3. text
4. content
5. media-text-left
6. media-text-right
7. divider
8. heading
9. quote
10. cta
11. gallery
12. mediaTextColumns
13. twoColumnText
14. feature
15. slider
16. feature-card-grid
17. advanced-slider
18. info-card
19. privacy
20. custom-code
21. contact-form
22. fluxedita_advanced_form
23. footer

Note: Some names appear as both type strings and component names (e.g., `TextSection` → `text`). Where left/right variants exist, they’re often handled by the same component with positional props.

---

## 1) HeroSection (`hero`)
- Purpose: Full-width introductory banner to set page identity and focus.
- Capabilities:
  - Background image or video with overlay
  - Headline, subheadline, CTAs
  - TextStyleEditor support for headings/paragraphs
  - Optional speech and visibility toggles
- Ideal use cases:
  - Landing page header
  - Campaign announcements
  - Product/creator spotlight
- Tips:
  - Ensure sufficient overlay contrast for text legibility.
  - Use short, action-oriented copy and 1–2 clear CTAs.

## 2) HeroSectionResponsive (`hero-responsive`)
- Purpose: A hero optimized for varied layouts and smaller screens.
- Capabilities:
  - Responsive layout controls beyond the standard hero
  - Same media + text features with adaptive behavior
- Ideal use cases:
  - Mobile-first pages, multi-device audiences
  - When you need stricter control of reflow on small screens
- Tips:
  - Prefer this if the standard hero crops important media on mobile.

## 3) TextSection (`text`)
- Purpose: Rich text content area for paragraphs, lists, and simple editorial blocks.
- Capabilities:
  - Rich text/HTML rendering
  - Full TextStyleEditor (font, color, size, shadow, outline, background capsule)
  - Optional media support with flexible positioning (top, bottom, left, right) when enabled
- Ideal use cases:
  - Articles, updates, disclaimers, descriptive copy
  - Simple text with optional illustrative media
- Tips:
  - Keep paragraphs brief and scannable.
  - Use text background capsule for over-image readability.

## 4) ContentSection (`content`)
- Purpose: General-purpose content block with sane defaults.
- Capabilities:
  - Text content with styling
  - Lightweight compared to TextSection; good for simple content
- Ideal use cases:
  - Generic page content where advanced formatting isn’t required
- Tips:
  - Start with this for speed; upgrade to TextSection if you need richer layout.

## 5–6) MediaTextSection (`media-text-left`, `media-text-right`)
- Purpose: Paired media with descriptive text.
- Capabilities:
  - Image or video with left/right positioning
  - Headline, body, and optional button(s)
  - TextStyleEditor support
- Ideal use cases:
  - Product feature + visual
  - Testimonial photo + quote
  - About section with portrait + bio
- Tips:
  - Keep media aspect ratios consistent across repeated sections for visual rhythm.

## 7) DividerSection (`divider`)
- Purpose: Visual separation between content blocks.
- Capabilities:
  - Simple line or spacing divider
- Ideal use cases:
  - Break long pages into digestible sections
- Tips:
  - Use sparingly; excessive dividers create noise.

## 8) HeadingSection (`heading`)
- Purpose: Standalone heading to introduce a new page area.
- Capabilities:
  - TextStyleEditor for heading display
  - Optional subtext depending on configuration
- Ideal use cases:
  - Section headers: “Features”, “Gallery”, “FAQ”, etc.
- Tips:
  - Keep headings descriptive and consistent in style across the page.

## 9) QuoteSection (`quote`)
- Purpose: Emphasize a quote, pull-quote, or short testimonial.
- Capabilities:
  - Quote text + author/source
  - TextStyleEditor for typographic emphasis
- Ideal use cases:
  - Testimonials, press quotes, inspirational statements
- Tips:
  - Limit length so it doesn’t compete with primary CTAs.

## 10) CTASection (`cta`)
- Purpose: Drive a single, focused action.
- Capabilities:
  - Headline, supporting text, one or more buttons
  - TextStyleEditor for emphasis
- Ideal use cases:
  - Sign up, subscribe, purchase, contact prompts
- Tips:
  - One primary action per CTA block for clarity.

## 11) GallerySection (`gallery`)
- Purpose: Grid of images (and optionally videos) with light captions.
- Capabilities:
  - Media library integration
  - Grid layout with responsive behavior
  - Optional TextStyleEditor for captions/titles
- Ideal use cases:
  - Portfolio, product imagery, event photos
- Tips:
  - Optimize images; maintain consistent cropping for a cohesive grid.

## 12) MediaTextColumnsSection (`mediaTextColumns`)
- Purpose: Columnar layout combining media and text blocks.
- Capabilities:
  - Multi-column arrangement
  - Media on one column, text on another (or repeated pairs)
  - TextStyleEditor for headings and copy
- Ideal use cases:
  - Process steps with icons/photos + descriptions
  - Balanced content where media and text share equal weight
- Tips:
  - For complex stories, alternate media/text per row for a pleasing cadence.

## 13) TwoColumnTextSection (`twoColumnText`)
- Purpose: Text-only two-column layout to increase information density.
- Capabilities:
  - Two parallel text columns
  - TextStyleEditor for headings/paragraphs
- Ideal use cases:
  - Feature lists, specifications, FAQs, pros/cons
- Tips:
  - Avoid overly long columns on mobile; ensure good stacking.

## 14) FeatureSection (`feature`)
- Purpose: Summarize multiple features/benefits succinctly.
- Capabilities:
  - Grid/list of feature items with icon/media, title, and description
  - TextStyleEditor for all text elements
- Ideal use cases:
  - Product/service benefits, platform capabilities
- Tips:
  - Keep item copy consistent in length; use recognizable icons.

## 15) SliderSection (`slider`)
- Purpose: Carousel of media with optional text overlays.
- Capabilities:
  - Images/videos per slide
  - Navigation, pagination, autoplay, effects
  - TextStyleEditor for slide captions/titles
- Ideal use cases:
  - Visual storytelling, highlights reel, hero alt
- Tips:
  - Avoid overloading with text; ensure accessible controls.

## 16) FeatureCardGridSection (`feature-card-grid`)
- Purpose: Card-based alternative to `feature` with richer visuals.
- Capabilities:
  - Card grid with media, title, description, and optional actions
  - TextStyleEditor per card elements (where supported)
- Ideal use cases:
  - Services catalog, package tiers, portfolio items
- Tips:
  - Keep media aspect ratios uniform; limit to 6–12 cards per page for focus.

## 17) AdvancedSliderSection (`advanced-slider`)
- Purpose: More configurable slider for complex showcases.
- Capabilities:
  - All `slider` capabilities plus advanced transitions/controls
  - Potential per-slide custom layouts
- Ideal use cases:
  - Campaigns, case studies, dynamic hero experiences
- Tips:
  - Use when standard slider options aren’t sufficient; otherwise prefer `slider` for simplicity.

## 18) InfoCardSection (`info-card`)
- Purpose: Informational cards with media and text.
- Capabilities:
  - Card grid with image/video, headline, body
  - Optional links/buttons
  - TextStyleEditor support
- Ideal use cases:
  - Team members, stats callouts, resource links
- Tips:
  - Use concise headlines; consider grouping by theme.

## 19) PrivacySection (`privacy`)
- Purpose: Present legal/privacy content in a readable format.
- Capabilities:
  - Long-form text with headings and lists
  - TextStyleEditor for readability
- Ideal use cases:
  - Privacy policy, terms, disclosures
- Tips:
  - Keep language up to date with legal requirements; link to canonical policy page if applicable.

## 20) CustomCodeSection (`custom-code`)
- Purpose: Embed custom HTML/CSS/JS when you need bespoke behavior.
- Capabilities:
  - Raw code injection into the page section
- Ideal use cases:
  - Third-party widgets, special layouts, micro-interactions
- Tips:
  - Validate and sanitize inputs; avoid blocking scripts; document any dependencies.

## 21) ContactFormSection (`contact-form`)
- Purpose: Collect basic inquiries.
- Capabilities:
  - Configurable fields
  - Integration with email/backend
- Ideal use cases:
  - General contact, support requests, partnership inquiries
- Tips:
  - Keep the form short; set clear success/error messages.

## 22) FluxeditaAdvancedFormSection (`fluxedita_advanced_form`)
- Purpose: Powerful form with enhanced validation and workflows.
- Capabilities:
  - Advanced fields, possibly conditional logic
  - Better UX and submission handling
- Ideal use cases:
  - Applications, surveys, multi-step data collection
- Tips:
  - Prototype the flow; track required vs optional fields to maximize completion.

## 23) FooterSection (`footer`)
- Purpose: Site-wide navigational and informational footer.
- Capabilities:
  - Multi-column layout (links, contact, social)
  - Optional media/logo column
  - TextStyleEditor for headings/links where supported
- Ideal use cases:
  - Global footer on all pages or premium area landing pages
- Tips:
  - Keep links grouped and minimal; include clear contact/social paths.

---

## Choosing the right section
- Hero vs. Responsive Hero: prefer responsive when mobile cropping is critical.
- Feature vs. Feature Card Grid vs. Info Card: pick based on visual richness and density needed.
- Gallery vs. Slider: gallery for browsing many items at once, slider for narrative sequences.
- Text vs. Content: text for rich styling and optional media positioning, content for simpler blocks.

---

## Building a showcase page from this guide
To build a documentation/showcase web page that mirrors this guide:
1) Create a page that renders each section with real sample content.
2) For each, include a short description (Purpose, Capabilities, Ideal use cases).
3) Add a toggle to view Edit vs. View mode snapshots.
4) Provide links to the exact component and type definitions:
   - Components: `app/custom_pages/components/sections/`
   - Types: `app/custom_pages/types/sections.ts`
5) Include a media picker demo for media-capable sections.

This guide can be used as the copy source for that page.

---

## Related docs
- `EDITABLE_SECTION_COMPONENT_GUIDE.md`
- `SECTION_COMPONENT_QUICK_REFERENCE.md`
- `MEDIA_SELECTOR_GUIDE.md`
- `CUSTOM_CODE_GUIDE_V2.md`
