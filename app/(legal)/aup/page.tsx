import Link from "next/link"
import { BackToLegal } from "@/components/legal/BackToLegal"

export default function AcceptableUsePolicy() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">📜 Acceptable Use Policy (AUP)</h1>
        <div className="space-y-2 text-gray-600">
          <p>Effective Date: {currentDate}</p>
          <p>Last Updated: {currentDate}</p>
        </div>
      </div>
      
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <p>
          This Acceptable Use Policy ("Policy") outlines the rules and restrictions for using the Fluxedita platform ("we", "our", or "us"). All users of Fluxedita ("you", "your") must comply with this Policy as a condition of using our services.
        </p>
        <p className="font-medium">
          By accessing or using Fluxedita, you agree not to misuse, abuse, or violate the Service in any way.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🚫</span> 1. Prohibited Activities
          </h2>
          <p className="mb-4">You may not use Fluxedita to:</p>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">a. Distribute Inappropriate or Harmful Content</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Pornographic, obscene, or sexually explicit material</li>
            <li>Content that is hateful, violent, discriminatory, or harassing</li>
            <li>Defamatory or libelous statements</li>
            <li>Content that promotes self-harm or illegal activity</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">b. Engage in Unauthorized Distribution</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Sell, rent, sublicense, or redistribute Fluxedita's services or content without permission</li>
            <li>Circumvent usage limits or access unauthorized features or APIs</li>
            <li>Share, mirror, or embed media or site components hosted on Fluxedita outside permitted channels</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">c. Violate Intellectual Property Rights</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Upload or share copyrighted material without proper authorization</li>
            <li>Infringe on trademarks, patents, or other proprietary rights of others</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">d. Compromise System Integrity or Security</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Deploy viruses, worms, malware, or any other malicious code</li>
            <li>Scrape, spider, or harvest data from Fluxedita without written consent</li>
            <li>Attempt to bypass or defeat authentication mechanisms</li>
            <li>Use the service to probe or test for vulnerabilities</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">e. Exploit or Manipulate the Platform</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Create multiple accounts to abuse free-tier limits</li>
            <li>Engage in fake engagement (e.g., bots, click farms)</li>
            <li>Reverse-engineer, decompile, or clone the platform</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🧑‍🤝‍🧑</span> 2. User Content Guidelines
          </h2>
          <p className="mb-4">
            You are solely responsible for all content you upload, post, or display through Fluxedita. You agree not to host content that:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Violates applicable laws or regulations</li>
            <li>Contains personal or sensitive information of others without consent</li>
            <li>Facilitates fraud, phishing, or identity theft</li>
            <li>Uses Fluxedita to publish "deepfakes," disinformation, or manipulated media without disclosure</li>
          </ul>
          <p>
            We reserve the right to remove or restrict access to any content that violates this Policy or poses a threat to our platform or community.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📡</span> 3. Misuse of Communication Features
          </h2>
          <p className="mb-4">
            If your plan includes user comments, messaging, or collaboration tools, you must not use them to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Harass, threaten, or impersonate others</li>
            <li>Spam users or promote unsolicited services</li>
            <li>Share links to harmful or deceptive sites</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">⚠️</span> 4. Enforcement & Consequences
          </h2>
          <p className="mb-4">
            We take violations of this policy seriously. Depending on the severity and frequency of the violation, we may take one or more of the following actions:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Issue a warning or request corrective action</li>
            <li>Remove or disable access to specific content</li>
            <li>Temporarily suspend or permanently terminate your account</li>
            <li>Report violations to law enforcement where legally required</li>
          </ul>
          <p>
            We reserve the right to act without prior notice in urgent or high-risk situations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🌍</span> 5. Legal Compliance
          </h2>
          <p>
            You are responsible for ensuring that your use of Fluxedita complies with all applicable local, national, and international laws — including but not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>Data protection laws (e.g., GDPR, CCPA)</li>
            <li>Intellectual property laws</li>
            <li>Online content and speech regulations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📩</span> 6. Reporting Violations
          </h2>
          <p className="mb-4">
            To report suspected misuse or a violation of this Policy, please contact:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p>Email: <a href="mailto:abuse@fluxedita.com" className="text-blue-600 hover:underline">abuse@fluxedita.com</a></p>
            <p>Subject Line: "AUP Violation Report"</p>
          </div>
          <p>
            Please include relevant details, URLs, and evidence (if applicable).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📌</span> 7. Modifications
          </h2>
          <p>
            We may revise this Acceptable Use Policy from time to time. Updates will be posted on our website and, where appropriate, notified to users. Continued use of the platform constitutes acceptance of the latest version.
          </p>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">✅ Summary</h2>
          <p>
            We built Fluxedita to empower creators, developers, and businesses — not to host harmful, unlawful, or exploitative activity. Help us keep the platform safe, respectful, and productive for everyone.
          </p>
        </section>
      </div>
      
      <BackToLegal />
    </div>
  )
}
