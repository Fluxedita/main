import Link from "next/link"

export default function ContactLegalNotice() {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">📞 Contact & Legal Notice</h1>
        <div className="space-y-2 text-gray-600">
          <p>Effective Date: {currentDate}</p>
          <p>Last Updated: {currentDate}</p>
        </div>
      </div>
      
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <p>
          This page provides important contact information and legal details regarding the operation and ownership of the Fluxedita platform.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🏢</span> Company Information
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p><strong>Company Name:</strong> Fluxedita Ltd</p>
            <p><strong>Business Type:</strong> Private Limited Company (Ltd)</p>
            <p className="mt-2"><strong>Registered Address:</strong></p>
            <p className="ml-4">Bradford, West Yorkshire</p>
            <p className="ml-4">United Kingdom</p>
            <p className="mt-2"><strong>Company Registration Number:</strong> [Insert number]</p>
            <p><strong>Company Registration Authority:</strong> [e.g., Companies House UK]</p>
            <p><strong>VAT Number:</strong> [Insert if applicable]</p>
            <p><strong>Legal Owner:</strong> James Croanin</p>
            <p><strong>Email:</strong> <a href="mailto:jamescroanin@gmail.com" className="text-blue-600 hover:underline">jamescroanin@gmail.com</a></p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📧</span> Contact Information
          </h2>
          <p className="mb-4">
            If you have general inquiries, support requests, or business questions, please reach out via one of the channels below:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <span className="mr-2">📬</span> General Contact
              </h3>
              <p>Email: <a href="mailto:support@fluxedita.com" className="text-blue-600 hover:underline">support@fluxedita.com</a></p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <span className="mr-2">🛠</span> Technical Support
              </h3>
              <p>Email: <a href="mailto:help@fluxedita.com" className="text-blue-600 hover:underline">help@fluxedita.com</a></p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <span className="mr-2">💼</span> Business & Partnerships
              </h3>
              <p>Email: <a href="mailto:business@fluxedita.com" className="text-blue-600 hover:underline">business@fluxedita.com</a></p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <span className="mr-2">📄</span> Legal & Compliance
              </h3>
              <p>Email: <a href="mailto:legal@fluxedita.com" className="text-blue-600 hover:underline">legal@fluxedita.com</a></p>
              <p>Privacy Contact / DPO: <a href="mailto:dpo@fluxedita.com" className="text-blue-600 hover:underline">dpo@fluxedita.com</a></p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">⚖️</span> Legal Disclosure (EU & UK Compliance)
          </h2>
          <p className="mb-4">
            This legal notice is provided in accordance with:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>EU Directive 2000/31/EC (e-Commerce Directive)</li>
            <li>UK Companies Act 2006</li>
            <li>GDPR (EU 2016/679) and UK GDPR</li>
            <li>Local laws requiring accessible business identity information</li>
          </ul>
          <p>
            Fluxedita Ltd is responsible for the content and operation of this website unless otherwise stated.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🧾</span> Complaints & Dispute Resolution
          </h2>
          <p className="mb-4">
            We take customer concerns seriously. If you have a dispute or complaint about our services, please contact us at:
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p>📧 <a href="mailto:complaints@fluxedita.com" className="text-blue-600 hover:underline">complaints@fluxedita.com</a></p>
          </div>
          <p>
            If you're located in the EU, you may also use the Online Dispute Resolution (ODR) platform:
          </p>
          <p className="mt-2">
            🔗 <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://ec.europa.eu/consumers/odr</a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🕒</span> Operating Hours
          </h2>
          <p className="mb-4">
            While the Fluxedita platform is available 24/7, our customer support operates during standard UK business hours:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium">Support Hours:</p>
            <p>Monday – Friday: 9:00 AM – 6:00 PM (GMT)</p>
            <p>Saturday – Sunday: Email support only</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📌</span> Website Ownership
          </h2>
          <p>
            <strong>Website:</strong> <a href="https://www.fluxedita.com" className="text-blue-600 hover:underline">https://www.fluxedita.com</a>
          </p>
          <p><strong>Owner:</strong> Fluxedita Ltd</p>
          <p>
            All content, branding, and technology on this site are protected under UK and international copyright and intellectual property laws.
          </p>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">✅ Summary</h2>
          <p>
            Fluxedita is committed to operating transparently, lawfully, and responsively. If you have any legal, technical, or business-related concerns, we're here to assist promptly and respectfully.
          </p>
        </section>
      </div>
    </div>
  )
}
