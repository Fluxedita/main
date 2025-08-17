import Link from "next/link"
import { BackToLegal } from "@/components/legal/BackToLegal"

export default function RefundPolicy() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">💳 Refund & Cancellation Policy</h1>
        <div className="space-y-2 text-gray-600">
          <p>Effective Date: {currentDate}</p>
          <p>Last Updated: {currentDate}</p>
        </div>
      </div>
      
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <p>
          This Refund & Cancellation Policy outlines the conditions under which Fluxedita Ltd ("we", "our", or "us") grants refunds, handles cancellations, and manages billing for subscriptions and services provided via the Fluxedita platform.
        </p>
        <p className="font-medium">
          By using Fluxedita, you agree to the terms outlined in this policy.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📦</span> 1. Billing Model
          </h2>
          <p>
            Fluxedita core packages (Landing, Root, Multi, Premium, Agency) are <strong>one-time purchases</strong>. These include 12 months of app‑code updates that never overwrite your content or database.
          </p>
          <p className="mt-2">
            Optional <strong>Support packages</strong> (Standard or Premium) are <strong>recurring monthly subscriptions</strong> that auto‑renew unless cancelled. All payments are processed securely via Stripe.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🔁</span> 2. Cancellation Policy (Support Subscriptions)
          </h2>
          <p className="mb-4">
            You can cancel your <strong>Support subscription</strong> at any time by:
          </p>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li>Logging into your account dashboard</li>
            <li>Navigating to the Billing section</li>
            <li>Selecting "Cancel Subscription"</li>
          </ol>
          <p className="font-medium">Cancellations:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Take effect at the end of your current billing cycle</li>
            <li>Do not result in a pro‑rata refund for unused time (see Section 3)</li>
          </ul>
          <p>
            Your Support benefits remain active until the current paid period expires. One‑time package purchases are not affected by Support cancellation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">💰</span> 3. Refund Policy
          </h2>
          <p className="mb-4">
            As Fluxedita provides digital products and services that are delivered immediately upon purchase or subscription activation, we generally do not offer refunds for:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Partial Support subscription periods (e.g., mid‑month cancellations)</li>
            <li>Non-use or limited use of the platform</li>
            <li>Dissatisfaction due to user error or lack of technical knowledge</li>
          </ul>
          
          <p className="font-medium mb-2">
            However, we may issue refunds in the following cases:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Duplicate billing or accidental double charge</li>
            <li>Billing errors caused by system faults</li>
            <li>Failure to access the service due to platform downtime (more than 48 hours continuous)</li>
          </ul>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <p className="font-medium">To request a refund under these conditions, contact us at:</p>
            <p className="mt-2">📧 <a href="mailto:jamescroanin@gmail.com" className="text-blue-600 hover:underline">jamescroanin@gmail.com</a></p>
            <p className="text-sm mt-2">Please include your account email, invoice number, and a brief description of the issue.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🧪</span> 4. Free Trials & Promotions
          </h2>
          <p className="mb-4">
            If your subscription includes a free trial:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>You will not be charged until the trial ends</li>
            <li>You must cancel before the trial expires to avoid billing</li>
            <li>Once charged after a trial, refunds will not be granted for forgetting to cancel</li>
          </ul>
          <p className="italic">
            We are not responsible for user oversight in trial management.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📩</span> 5. Modifications to Subscription Plans
          </h2>
          <p className="mb-4">
            We may:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Update plan features or pricing with advance notice</li>
            <li>Offer new packages, discounts, or billing models</li>
            <li>Allow you to upgrade or downgrade at any time (changes take effect immediately or at next cycle, depending on plan)</li>
          </ul>
          <p>
            Refunds will not be issued for downgrading mid-cycle, but future billing will reflect the new rate.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">⚖️</span> 6. EU Consumer Rights
          </h2>
          <p className="mb-4">
            If you are a consumer located in the European Union, you may have the right to cancel your purchase within 14 days of subscribing under the EU Consumer Rights Directive if no digital services have yet been used.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="font-medium">
              However, by starting to use the Fluxedita platform immediately, you acknowledge and consent that:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>You waive the right to a withdrawal once the service has begun</li>
              <li>This includes logging in, editing pages, or uploading content</li>
            </ul>
            <p className="mt-2 text-sm">
              This aligns with Article 16(m) of the EU Consumer Rights Directive.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🧾</span> 7. Chargebacks & Disputes
          </h2>
          <p className="mb-4">
            If you initiate a chargeback through your bank or card provider:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Your Fluxedita account may be immediately suspended</li>
            <li>We reserve the right to challenge the dispute and share relevant data with Stripe and legal authorities</li>
          </ul>
          <p>
            We recommend contacting us first at <a href="mailto:support@fluxedita.com" className="text-blue-600 hover:underline">support@fluxedita.com</a> to resolve any billing issues amicably.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📌</span> 8. Changes to This Policy
          </h2>
          <p>
            We reserve the right to revise this Refund & Cancellation Policy. Any changes will be posted to this page and, where appropriate, notified to users. Continued use of the platform constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📬</span> 9. Contact Us
          </h2>
          <p className="mb-4">
            If you have any questions or concerns about this policy or your subscription, please contact:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium">Billing Support</p>
            <p>📧 <a href="mailto:jamescroanin@gmail.com" className="text-blue-600 hover:underline">jamescroanin@gmail.com</a></p>
            <p>📍 Bradford, West Yorkshire, UK</p>
          </div>
        </section>

        <section className="bg-green-50 p-6 rounded-lg border border-green-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">✅ Summary</h2>
          <p>
            We aim to be fair, transparent, and secure in how we manage your billing. While our default policy is no refunds once services begin, we are always open to reviewing issues where something has gone wrong.
          </p>
        </section>
      </div>
      
      <BackToLegal />
    </div>
  )
}
