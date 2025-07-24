import { ReadmeSection } from "@/components/documentation/readme-section"
import { InstallationSection } from "@/components/documentation/installation-section"
import { DocumentationHero } from "@/components/documentation/documentation-hero"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { EditablePagesSection } from "@/components/documentation/editable-pages-section"
import { EditableSectionComponentsSection } from "@/components/documentation/editable-section-components-section"
import { SectionComponentQuickReferenceSection } from "@/components/documentation/section-component-quick-reference-section"
import { CustomCodeGuideSection } from "@/components/documentation/custom-code-guide-section"
import { CloudinarySetupGuideSection } from "@/components/documentation/cloudinary-setup-guide-section"
import { SupabaseSetupGuideSection } from "@/components/documentation/supabase-setup-guide-section"
import { ConfigureContactFormGmailSection } from "@/components/documentation/configure-contact-form-gmail-section"
import { UploadsReadmeSection } from "@/components/documentation/uploads-readme-section"
import { GitHubInitializationUploadGuideSection } from "@/components/documentation/github-initialization-upload-guide-section"
import { DisasterRecoveryPlanSection } from "@/components/documentation/disaster-recovery-plan-section"
import { QuickLinks } from "@/components/ui/quick-links"

const SECTIONS = [
  {
    id: "readme",
    label: "Read Me",
    excerpt: "Project overview, setup, and key usage notes.",
  },
  {
    id: "installation",
    label: "Installation Guide",
    excerpt: "Step-by-step instructions for installing and configuring the project.",
  },
  {
    id: "editable-pages",
    label: "Editable Pages Guide",
    excerpt: "How to create and manage editable pages in the system.",
  },
  {
    id: "editable-section-components",
    label: "Editable Section Components",
    excerpt: "Details on reusable, editable section components and architecture.",
  },
  {
    id: "section-component-quick-reference",
    label: "Section Component Quick Reference",
    excerpt: "Checklist and reference for creating and integrating new section components.",
  },
  {
    id: "custom-code-guide",
    label: "Custom Code Guide",
    excerpt: "How to safely add custom HTML, CSS, and JavaScript using JSX.",
  },
  {
    id: "cloudinary-setup-guide",
    label: "Cloudinary Setup Guide",
    excerpt: "Instructions for integrating and configuring Cloudinary for media uploads.",
  },
  {
    id: "supabase-setup-guide",
    label: "Supabase Setup Guide",
    excerpt: "How to set up and connect to a Supabase database.",
  },
  {
    id: "configure-contact-form-gmail",
    label: "Configure Contact Form Gmail",
    excerpt: "Guide for configuring the contact form to send emails via Gmail.",
  },
  {
    id: "uploads-readme",
    label: "Media Uploads",
    excerpt: "Documentation for media upload workflows and gallery management.",
  },
  {
    id: "github-initialization-upload-guide",
    label: "GitHub Initialization Upload Guide",
    excerpt: "How to initialize a local repo and upload to GitHub.",
  },
  {
    id: "disaster-recovery-plan",
    label: "Disaster Recovery Plan",
    excerpt: "Plan for database and application recovery, backup, and testing.",
  },
]

export default function DocumentationPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <QuickLinks sections={SECTIONS} />
      <main className="flex-1">
        <div id="top" />
        <DocumentationHero />
        <section id="readme"><ReadmeSection /></section>
        <section id="installation"><InstallationSection /></section>
        <section id="editable-pages"><EditablePagesSection /></section>
        <section id="editable-section-components"><EditableSectionComponentsSection /></section>
        <section id="section-component-quick-reference"><SectionComponentQuickReferenceSection /></section>
        <section id="custom-code-guide"><CustomCodeGuideSection /></section>
        <section id="cloudinary-setup-guide"><CloudinarySetupGuideSection /></section>
        <section id="supabase-setup-guide"><SupabaseSetupGuideSection /></section>
        <section id="configure-contact-form-gmail"><ConfigureContactFormGmailSection /></section>
        <section id="uploads-readme"><UploadsReadmeSection /></section>
        <section id="github-initialization-upload-guide"><GitHubInitializationUploadGuideSection /></section>
        <section id="disaster-recovery-plan"><DisasterRecoveryPlanSection /></section>
      </main>
      <Footer />
    </div>
  )
}
