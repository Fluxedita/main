import Link from "next/link"
import { BackToLegal } from "@/components/legal/BackToLegal"

export default function EUCompliance() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">📄 Legal Notice (EU Compliance Statement)</h1>
        <div className="space-y-2 text-gray-600">
          <p>Effective Date: {currentDate}</p>
          <p>Last Updated: {currentDate}</p>
        </div>
      </div>
      
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <p>
          This Legal Notice is provided in accordance with Articles 5 and 6 of the EU e-Commerce Directive (Directive 2000/31/EC), and relevant GDPR and consumer protection regulations.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🧾</span> 1. Company Information
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p><strong>Company Name:</strong> Fluxedita Ltd</p>
            <p><strong>Registered Office:</strong> Bradford, West Yorkshire, UK</p>
            <p><strong>Legal Owner:</strong> James Croanin</p>
            <p><strong>Contact Email:</strong> <a href="mailto:jamescroanin@gmail.com" className="text-blue-600 hover:underline">jamescroanin@gmail.com</a></p>
            <p className="mt-4"><strong>Director(s):</strong> [Insert names if legally required]</p>
            <p><strong>Contact Email:</strong> <a href="mailto:support@fluxedita.com" className="text-blue-600 hover:underline">support@fluxedita.com</a></p>
            <p><strong>Legal/Compliance Contact:</strong> <a href="mailto:legal@fluxedita.com" className="text-blue-600 hover:underline">legal@fluxedita.com</a></p>
            <p><strong>Telephone:</strong> [Insert phone number, optional but encouraged]</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🌍</span> 2. Responsible for Content
          </h2>
          <p className="mb-4">
            Under Section 5 of the German Telemedia Act (TMG) and equivalent EU directives:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p><strong>Content Owner:</strong> Fluxedita Ltd</p>
            <p><strong>Contact Person:</strong> [Insert legal representative or DPO]</p>
          </div>
          <p>
            All content on this website is published by Fluxedita Ltd unless otherwise indicated. Users are responsible for the legality of their own uploaded content as outlined in our <Link href="/aup" className="text-blue-600 hover:underline">Acceptable Use Policy</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🛡</span> 3. Data Protection Officer (DPO)
          </h2>
          <p className="mb-4">
            In compliance with the General Data Protection Regulation (GDPR), the following individual is appointed as the Data Protection Officer:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p><strong>Name:</strong> James Croanin</p>
            <p><strong>Email:</strong> <a href="mailto:jamescroanin@gmail.com" className="text-blue-600 hover:underline">jamescroanin@gmail.com</a></p>
            <p><strong>Address:</strong> Bradford, West Yorkshire, UK</p>
          </div>
          <p>
            You can contact the DPO for any questions or concerns related to data privacy, access requests, or exercising your rights under GDPR.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">💳</span> 4. Online Dispute Resolution (ODR)
          </h2>
          <p className="mb-4">
            If you are an EU consumer, you are entitled to use the European Commission's Online Dispute Resolution (ODR) platform for complaints:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p><a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">🔗 https://ec.europa.eu/consumers/odr</a></p>
            <p className="mt-2">Our email address for such matters: <a href="mailto:disputes@fluxedita.com" className="text-blue-600 hover:underline">disputes@fluxedita.com</a></p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">⚖️</span> 5. Supervisory Authority
          </h2>
          <p className="mb-4">
            If you believe your data has been processed unlawfully, you have the right to lodge a complaint with your local Data Protection Authority, or contact our supervisory authority:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="font-semibold">Supervisory Authority (UK example):</p>
            <p>Information Commissioner's Office (ICO)</p>
            <p>Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF</p>
            <p>Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://ico.org.uk</a></p>
          </div>
          <p className="text-sm italic">
            Please substitute with your local authority if based in the EU.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📌</span> 6. Liability Disclaimer
          </h2>
          <p>
            Fluxedita Ltd makes every effort to keep the website's content current and accurate. However, we make no warranties as to its completeness or accuracy and disclaim liability for any loss or damage resulting from reliance on the information presented.
          </p>
          <p className="mt-4">
            Links to third-party websites are provided for informational purposes only. Fluxedita Ltd is not responsible for the content of external sites.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📜</span> 7. Copyright & Intellectual Property
          </h2>
          <p>
            All logos, product names, designs, and content found on this site are the intellectual property of Fluxedita Ltd unless otherwise noted. Reproduction, redistribution, or misuse is prohibited without express written permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🕓</span> 8. Business Hours
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p>Our standard support hours are:</p>
            <p className="font-medium mt-2">Monday–Friday, 9:00 AM to 6:00 PM (GMT)</p>
            <p className="mt-2">Support queries can be sent 24/7 via email.</p>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">✅ Summary</h2>
          <p>
            This page fulfills our legal obligation to provide transparency and a way to reach us should there be legal, regulatory, or consumer protection concerns. We take data privacy and platform integrity seriously and remain committed to compliance with EU and global standards.
          </p>
        </section>
      </div>
      
      <BackToLegal />
    </div>
  )
}
