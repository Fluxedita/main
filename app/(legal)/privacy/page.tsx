import Link from "next/link"
import { BackToLegal } from "@/components/legal/BackToLegal"

export default function PrivacyPolicy() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">📄 Privacy Policy</h1>
        <div className="space-y-2 text-gray-600">
          <p>Effective Date: {currentDate}</p>
          <p>Last Updated: {currentDate}</p>
        </div>
      </div>
      
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <p>
          Welcome to Fluxedita ("we", "our", or "us"). Your privacy is extremely important to us, and we are committed to protecting the personal data and information you share with us.
        </p>
        <p>
          This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you use our website and services.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🔍</span> 1. Information We Collect
          </h2>
          <p className="mb-4">
            We only collect the minimum necessary data required to provide and improve our services. The types of information we collect include:
          </p>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">a. Personal Information You Provide</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Name, email address, and contact details</li>
            <li>User account credentials (passwords are securely hashed)</li>
            <li>Billing information (handled securely via Stripe)</li>
            <li>User-generated content (pages, media, comments)</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">b. Automatically Collected Information</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>IP address and browser/device information</li>
            <li>Usage data (pages visited, actions taken)</li>
            <li>Login timestamps and session activity</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">c. Third-Party Integrations</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Media uploads (via Cloudinary)</li>
            <li>Authentication and database services (via Supabase)</li>
            <li>Payments and subscriptions (via Stripe)</li>
          </ul>
          
          <p className="text-sm italic">We do not collect or store full payment card numbers on our servers.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🧠</span> 2. How We Use Your Information
          </h2>
          <p className="mb-4">
            We use your data only for purposes that are necessary and justifiable:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>To provide and personalize your experience on the platform</li>
            <li>To process payments and manage subscriptions</li>
            <li>To authenticate users and secure accounts</li>
            <li>To analyze site usage and improve functionality</li>
            <li>To communicate important updates or support issues</li>
            <li>To enforce our terms and policies</li>
          </ul>
          <p>We do not sell, rent, or trade your personal data with third parties.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🔒</span> 3. Data Protection & Security
          </h2>
          <p className="mb-4">
            We implement advanced technical and organizational measures to protect your information:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>All data is encrypted in transit using HTTPS/TLS</li>
            <li>Passwords are securely hashed using industry-standard algorithms</li>
            <li>Role-based access controls are applied to restrict internal data access</li>
            <li>Data stored with trusted infrastructure providers (e.g., Supabase, Cloudinary)</li>
            <li>Regular audits and vulnerability scanning of systems</li>
          </ul>
          <p>
            In the event of a breach, we will notify affected users and relevant authorities promptly in compliance with applicable laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🌍</span> 4. Data Storage & International Transfers
          </h2>
          <p className="mb-4">
            Depending on your location, your data may be processed or stored in data centers located in the UK, EU, or USA.
          </p>
          <p>
            We ensure all third-party providers maintain adequate protections for international data transfers as required by GDPR and other regulations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🧾</span> 5. Your Rights
          </h2>
          <p className="mb-4">
            Depending on your jurisdiction, you may have the following rights:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Access</strong> – Request a copy of the data we hold about you</li>
            <li><strong>Correction</strong> – Update or correct inaccurate information</li>
            <li><strong>Erasure</strong> – Request deletion of your personal data ("right to be forgotten")</li>
            <li><strong>Objection</strong> – Object to certain types of data processing</li>
            <li><strong>Portability</strong> – Request your data in a structured, machine-readable format</li>
            <li><strong>Withdraw Consent</strong> – Revoke consent where applicable</li>
          </ul>
          <p>
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:jamescroanin@gmail.com" className="text-blue-600 hover:underline">jamescroanin@gmail.com</a>.</p>
            <p>For data protection inquiries, please contact James Croanin at <a href="mailto:jamescroanin@gmail.com" className="text-blue-600 hover:underline">jamescroanin@gmail.com</a>.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🍪</span> 6. Cookies & Tracking
          </h2>
          <p className="mb-4">
            Fluxedita uses essential cookies only to provide core site functionality. We do not use advertising or behavioral tracking cookies.
          </p>
          <p>
            You may adjust cookie preferences in your browser settings at any time. For more information, see our <Link href="/cookies" className="text-blue-600 hover:underline">Cookies Policy</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🤝</span> 7. Third-Party Services
          </h2>
          <p className="mb-4">
            We only work with trusted partners who meet stringent data protection standards. These include:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Supabase (authentication, user data)</li>
            <li>Stripe (payments, billing)</li>
            <li>Cloudinary (media storage and delivery)</li>
            <li>Analytics tools (anonymous usage insights only)</li>
          </ul>
          <p>Each third-party service has its own privacy policy and compliance measures.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🧒</span> 8. Children's Privacy
          </h2>
          <p>
            Fluxedita is not directed to individuals under the age of 16. We do not knowingly collect personal data from children. If we learn we have collected data from a child without verified parental consent, we will delete it immediately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📬</span> 9. Communications
          </h2>
          <p className="mb-4">
            We may contact you:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>To confirm account activity or transactions</li>
            <li>For platform updates or service notifications</li>
            <li>For support-related matters</li>
          </ul>
          <p>
            You may opt out of non-essential communications at any time via your account settings or by contacting us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🔁</span> 10. Data Retention
          </h2>
          <p className="mb-4">
            We retain your data only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. When data is no longer needed, it will be securely deleted.
          </p>
          <p>
            You can request account deletion at any time by emailing <a href="mailto:privacy@fluxedita.com" className="text-blue-600 hover:underline">privacy@fluxedita.com</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🧾</span> 11. Compliance
          </h2>
          <p>Fluxedita complies with:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>GDPR (General Data Protection Regulation – EU)</li>
            <li>CCPA (California Consumer Privacy Act – USA)</li>
            <li>UK GDPR and PECR</li>
            <li>Other regional data protection frameworks as applicable</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📞</span> 12. Contact Us
          </h2>
          <p className="mb-4">
            If you have questions, concerns, or requests regarding your personal data or this Privacy Policy, please contact us at:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold">Privacy Officer</p>
            <p>Fluxedita</p>
            <p>Email: <a href="mailto:privacy@fluxedita.com" className="text-blue-600 hover:underline">privacy@fluxedita.com</a></p>
            <p>Address: [Insert physical business address, if applicable]</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📌</span> 13. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. You will be notified of material changes through email or a platform notice. Your continued use of Fluxedita constitutes acceptance of the revised policy.
          </p>
        </section>
      </div>
      
      <BackToLegal />
    </div>
  )
}
