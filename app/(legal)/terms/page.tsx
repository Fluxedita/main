import Link from "next/link"
import { BackToLegal } from "@/components/legal/BackToLegal"

export default function TermsOfService() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">📄 Fluxedita – Terms of Service</h1>
        <div className="space-y-2 text-gray-600">
          <p>Effective Date: {currentDate}</p>
          <p>Last Updated: {currentDate}</p>
        </div>
      </div>
      
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <p>
          Welcome to Fluxedita ("we," "our," or "us"), a live-editable web platform that allows users to build, manage, and scale websites with ease. These Terms of Service ("Terms") govern your use of our website, web application, and all related services (collectively, the "Service").
        </p>
        <p className="font-medium">
          By accessing or using Fluxedita, you agree to be bound by these Terms. If you do not agree, please do not use our platform.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🧾</span> 1. Eligibility
          </h2>
          <p>
            To use Fluxedita, you must be at least 16 years old and legally able to enter into contracts. By using our Service, you confirm that you meet these requirements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🛠</span> 2. Use of Service
          </h2>
          <p className="mb-4">You agree to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Use the Service in compliance with all applicable laws and regulations.</li>
            <li>Provide accurate and current account information.</li>
            <li>Maintain the confidentiality of your login credentials.</li>
            <li>Accept responsibility for all activities under your account.</li>
          </ul>
          
          <p className="mb-4">You may not:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Use the Service for unlawful, harmful, or abusive purposes.</li>
            <li>Reverse-engineer, clone, or copy Fluxedita's platform or interface.</li>
            <li>Interfere with the operation or security of the Service.</li>
            <li>Upload viruses, malware, or any other harmful content.</li>
          </ul>
          <p>We reserve the right to suspend or terminate accounts that violate these Terms.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">💳</span> 3. Billing & Subscriptions
          </h2>
          <p>If you choose a paid plan:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Payments are securely processed via Stripe.</li>
            <li>You agree to recurring billing unless you cancel before your renewal date.</li>
            <li>Prices and features may change with prior notice.</li>
            <li>No refunds are issued for partial subscription periods unless legally required.</li>
            <li>You may cancel or change your subscription at any time in your account dashboard.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📸</span> 4. User Content & Ownership
          </h2>
          <p className="mb-4">
            You retain ownership of all content you upload or create within Fluxedita, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Text</li>
            <li>Images and videos</li>
            <li>Custom pages and components</li>
          </ul>
          <p className="mb-4">
            By using the platform, you grant us a non-exclusive, royalty-free license to host, display, and process your content solely for the purpose of providing the Service.
          </p>
          <p className="mb-4 font-medium">You are responsible for:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Ensuring your content does not infringe any third-party rights.</li>
            <li>Complying with copyright, data, and media laws.</li>
            <li>Maintaining backups of your content (though we do provide secure storage).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📦</span> 5. Account Management
          </h2>
          <p className="mb-4">
            You may delete your account at any time. Upon deletion:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Your content and account data may be removed from our systems after a grace period.</li>
            <li>We are not responsible for recovering or retaining deleted content.</li>
            <li>Residual backup copies may remain for a limited period.</li>
          </ul>
          <p>We may also suspend or terminate inactive or abusive accounts.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🔐</span> 6. Privacy
          </h2>
          <p className="mb-4">
            Your privacy is important to us. Our use of personal data is governed by our <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>, which is incorporated into these Terms by reference.
          </p>
          <p>
            By using Fluxedita, you consent to the collection, use, and sharing of your information as described in the Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📈</span> 7. Third-Party Services
          </h2>
          <p className="mb-4">
            Fluxedita integrates with several trusted third-party providers, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Supabase (authentication, database)</li>
            <li>Stripe (payment processing)</li>
            <li>Cloudinary (media storage)</li>
          </ul>
          <p>
            You agree to the terms and policies of these third parties when using their services through Fluxedita. We are not liable for the acts, omissions, or data practices of these third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🧪</span> 8. Beta Features
          </h2>
          <p>
            From time to time, we may offer experimental or beta features. These are provided "as is" and may change, break, or be removed at any time. Use them at your own discretion.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🚫</span> 9. Termination
          </h2>
          <p className="mb-4">We reserve the right to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Terminate your access to the Service with or without cause.</li>
            <li>Suspend your account if you breach these Terms or engage in misuse.</li>
            <li>Remove any content that violates our policies or applicable law.</li>
          </ul>
          <p>
            You may cancel your use of the Service at any time by contacting us or using the dashboard tools.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">❌</span> 10. Disclaimer of Warranties
          </h2>
          <p className="mb-4">
            Fluxedita is provided on an "as-is" and "as-available" basis.
            We make no guarantees that:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>The Service will be error-free or uninterrupted.</li>
            <li>The features will meet all your requirements.</li>
            <li>Your content will never be lost (though we take strong measures to prevent this).</li>
          </ul>
          <p>
            To the maximum extent permitted by law, we disclaim all warranties, express or implied.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📉</span> 11. Limitation of Liability
          </h2>
          <p className="mb-4">
            To the fullest extent permitted by law:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>We are not liable for any indirect, incidental, special, consequential, or punitive damages.</li>
            <li>Our total liability to you under these Terms will not exceed the amount paid (if any) in the past 12 months for the Service.</li>
          </ul>
          <p className="text-sm italic">
            Some jurisdictions do not allow such exclusions, so portions of this section may not apply to you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📌</span> 12. Modifications to These Terms
          </h2>
          <p className="mb-4">
            We may revise these Terms from time to time. You will be notified of material changes via email or in-app notification. Continued use of the Service after changes constitutes your acceptance.
          </p>
          <p>
            If you disagree with any updates, you may discontinue use at any time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🏛</span> 13. Governing Law & Jurisdiction
          </h2>
          <p className="mb-4">
            These Terms are governed by and interpreted under the laws of the United Kingdom, without regard to conflict of laws principles.
          </p>
          <p>
            Any legal disputes will be resolved in the courts of the United Kingdom.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📬</span> 14. Contact Us
          </h2>
          <p className="mb-4">
            For questions about these Terms, or to report a violation, please contact:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p>If you have any questions about these Terms, please contact James Croanin at <a href="mailto:jamescroanin@gmail.com" className="text-blue-600 hover:underline">jamescroanin@gmail.com</a>.</p>
            <p>Business Address: [Insert business address, if applicable]</p>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">✅ Summary</h2>
          <p>
            By using Fluxedita, you agree to build and manage your content in a way that is secure, respectful of others, and aligned with legal standards. We're here to give you the freedom to create — safely, privately, and responsibly.
          </p>
        </section>
      </div>
      
      <BackToLegal />
    </div>
  )
}
