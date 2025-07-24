import Link from "next/link"
import { BackToLegal } from "@/components/legal/BackToLegal"

export default function DataProcessingAgreement() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">📄 Data Processing Agreement (DPA)</h1>
        <div className="space-y-2 text-gray-600">
          <p>Effective Date: {currentDate}</p>
          <p>Last Updated: {currentDate}</p>
        </div>
      </div>
      
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <p>
          At Fluxedita, we take data protection and compliance seriously. We recognize that our customers — especially those based in the European Union (EU), European Economic Area (EEA), or the United Kingdom (UK) — may require a Data Processing Agreement (DPA) to satisfy their obligations under the General Data Protection Regulation (GDPR) or other regional privacy laws.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🔐</span> What Is a DPA?
          </h2>
          <p>
            A Data Processing Agreement is a legally binding document entered into between a data controller (you, the customer) and a data processor (us, Fluxedita). It governs the processing of personal data in accordance with Article 28 of the GDPR.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📌</span> When Is a DPA Required?
          </h2>
          <p className="mb-4">
            You need a DPA if:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>You are using Fluxedita to collect, store, or process personal data of individuals (such as members, users, or customers).</li>
            <li>You are based in the EU, EEA, UK, or are otherwise subject to GDPR, UK GDPR, or equivalent data protection laws.</li>
            <li>Your use of Fluxedita involves managing content or user accounts containing names, emails, photos, or other personal identifiers.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">✅</span> What Our DPA Covers
          </h2>
          <p className="mb-4">
            Fluxedita's standard DPA includes:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Roles of the data controller and processor</li>
            <li>Scope, nature, and purpose of processing</li>
            <li>Data retention and deletion terms</li>
            <li>Subprocessor information (e.g. Supabase, Cloudinary, Stripe)</li>
            <li>Security measures and encryption standards</li>
            <li>Data transfer safeguards (including SCCs if applicable)</li>
            <li>Data subject rights assistance</li>
            <li>Breach notification processes</li>
          </ul>
          
          <p className="mb-4">
            Our DPA aligns with the requirements of:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>GDPR (EU 2016/679)</li>
            <li>UK GDPR</li>
            <li>Swiss FADP</li>
            <li>Other similar global data regulations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📝</span> How to Request a DPA
          </h2>
          <p className="mb-4">
            To request a signed copy of our standard DPA, please email:
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="font-medium">To request a signed copy of our standard DPA, please email:</p>
            <p className="mt-2">📧 <a href="mailto:jamescroanin@gmail.com" className="text-blue-600 hover:underline">jamescroanin@gmail.com</a></p>
            <p className="mt-2 font-medium">Subject: DPA Request – [Your Company Name]</p>
          </div>
          <p className="mb-2">
            Please include:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Your full legal entity name</li>
            <li>Contact details of your data protection officer or representative</li>
            <li>Any custom clauses or additional processing instructions (optional)</li>
          </ul>
          <p>
            We typically process requests within 3–5 business days.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🌍</span> International Data Transfers
          </h2>
          <p>
            Fluxedita may use subprocessors located outside the EU/EEA. Where applicable, we rely on Standard Contractual Clauses (SCCs) and other GDPR-approved mechanisms to ensure lawful data transfers and equivalency of protection.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🔄</span> Updates to This Page
          </h2>
          <p>
            We may update this page to reflect legal changes, new subprocessors, or updates to our privacy and compliance practices. You are encouraged to review it periodically.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📬</span> Contact
          </h2>
          <p className="mb-4">
            For any other questions about data processing, privacy, or compliance, please contact our Data Protection Officer:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium">Data Protection Officer</p>
            <p>📧 <a href="mailto:jamescroanin@gmail.com" className="text-blue-600 hover:underline">jamescroanin@gmail.com</a></p>
            <p>📍 Bradford, West Yorkshire, UK</p>
          </div>
        </section>

        <section className="bg-green-50 p-6 rounded-lg border border-green-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">✅ Summary</h2>
          <p>
            If you're using Fluxedita to manage personal data and are legally required to have a DPA in place, we're ready to help. We are committed to lawful, transparent, and secure data processing at every level of our service.
          </p>
        </section>
      </div>
      
      <BackToLegal />
    </div>
  )
}
