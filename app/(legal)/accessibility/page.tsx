import Link from "next/link"
import { BackToLegal } from "@/components/legal/BackToLegal"

export default function AccessibilityStatement() {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <BackToLegal />
      </div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">♿️ Accessibility Statement</h1>
        <div className="space-y-2 text-gray-600">
          <p>Effective Date: {currentDate}</p>
          <p>Last Updated: {currentDate}</p>
        </div>
      </div>
      
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <p>
          At Fluxedita, we are committed to ensuring that everyone — regardless of ability — can access, navigate, and benefit from our platform.
        </p>
        <p>
          This Accessibility Statement outlines the steps we take to make our website and web application inclusive, as well as how you can report any accessibility barriers you may encounter.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🎯</span> Our Commitment
          </h2>
          <p className="mb-4">
            We strive to ensure that:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Our web content is perceivable, operable, understandable, and robust</li>
          </ul>
          <p>
            Everyone can use Fluxedita, including people with:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Visual impairments</li>
            <li>Hearing loss</li>
            <li>Motor or cognitive disabilities</li>
            <li>Assistive technologies (screen readers, voice control, keyboard navigation)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">✅</span> Accessibility Standards
          </h2>
          <p className="mb-4">
            Fluxedita aims to conform to the following accessibility standards:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Web Content Accessibility Guidelines (WCAG) 2.1, Level AA</li>
            <li>Section 508 of the U.S. Rehabilitation Act</li>
            <li>Equality Act 2010 (UK)</li>
            <li>EN 301 549 (EU public sector accessibility standard)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🔨</span> Features Supporting Accessibility
          </h2>
          <p className="mb-4">
            We actively implement and test features to improve accessibility across the platform, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Responsive design for screen scaling and zoom</li>
            <li>Semantic HTML and ARIA landmarks</li>
            <li>High contrast and keyboard-navigable UI elements</li>
            <li>Descriptive link text and image alt attributes</li>
            <li>Logical heading structures and tab order</li>
            <li>Compatibility with screen readers and browser accessibility tools</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🚧</span> Ongoing Improvements
          </h2>
          <p className="mb-4">
            We understand that accessibility is a continuous process. We regularly:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Audit and test our interfaces using accessibility tools and expert consultants</li>
            <li>Train our design and development teams on accessibility best practices</li>
            <li>Prioritize accessibility issues in our product roadmap</li>
            <li>Welcome community feedback to help identify and fix problems</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📣</span> Third-Party Content
          </h2>
          <p>
            While we control most of the Fluxedita experience, some third-party services (e.g. Stripe checkout pages, embedded Cloudinary viewers) may not fully comply with our accessibility standards. We do our best to ensure integrations are usable and provide feedback to these vendors as needed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🧪</span> Testing Tools We Use
          </h2>
          <p className="mb-4">
            To support our efforts, we use a combination of automated and manual tools, such as:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Axe Accessibility Scanner</li>
            <li>Lighthouse Audit</li>
            <li>NVDA and VoiceOver (screen readers)</li>
            <li>Keyboard-only navigation testing</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📝</span> Feedback and Reporting Accessibility Issues
          </h2>
          <p className="mb-4">
            We welcome your feedback on accessibility and are committed to addressing any barriers promptly.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p>📧 <a href="mailto:accessibility@fluxedita.com" className="text-blue-600 hover:underline">accessibility@fluxedita.com</a></p>
            <p className="mt-2">📞 [Insert number if available]</p>
            <p className="mt-2">📍 Mailing Address: Fluxedita Ltd, [Insert physical address]</p>
          </div>
          <p className="mb-2">
            If you experience difficulty accessing any part of our site, please let us know:
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>The page or feature in question</li>
            <li>The issue you encountered</li>
            <li>The device/browser/assistive technology used</li>
          </ul>
          <p>
            We aim to respond within 3 business days.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📌</span> Legal Compliance
          </h2>
          <p className="mb-4">
            This statement is provided in accordance with:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>UK Equality Act 2010</li>
            <li>Americans with Disabilities Act (ADA)</li>
            <li>European Directive (EU) 2016/2102 on accessibility of public sector websites</li>
            <li>EN 301 549 requirements for ICT accessibility</li>
          </ul>
        </section>

        <section className="bg-green-50 p-6 rounded-lg border border-green-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">✅ Summary</h2>
          <p>
            At Fluxedita, accessibility is not an afterthought — it's a priority. We are dedicated to making our platform usable and empowering for everyone.
          </p>
          <p className="mt-4">
            Thank you for helping us make the web a more inclusive place.
          </p>
        </section>
      </div>
      
      <BackToLegal />
    </div>
  )
}
