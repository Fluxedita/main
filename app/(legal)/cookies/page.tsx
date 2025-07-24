import Link from "next/link"
import { BackToLegal } from "@/components/legal/BackToLegal"

export default function CookiesPolicy() {
  return (
    <>
      <div className="mb-6">
        <BackToLegal />
      </div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookies Policy</h1>
        <p className="text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies</h2>
          <p className="text-gray-700 mb-4">
            As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it, and why we sometimes need to store these cookies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Cookies</h2>
          <p className="text-gray-700 mb-4">
            We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. The Cookies We Set</h2>
          <p className="text-gray-700 mb-4">
            When you submit data through a form, cookies may be set to remember your user details for future correspondence.
          </p>
          <p className="text-gray-700 mb-4">
            We also use cookies to provide you with a better experience on this website. For instance, we might set temporary cookies to determine if your browser accepts cookies.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.1. Essential Cookies</h3>
          <p className="text-gray-700 mb-4">
            These cookies are essential for you to browse the website and use its features, such as accessing secure areas of the site.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.2. Performance Cookies</h3>
          <p className="text-gray-700 mb-4">
            These cookies collect information about how you use our website, like which pages you visited and which links you clicked on. This helps us improve the performance of our website.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.3. Functionality Cookies</h3>
          <p className="text-gray-700 mb-4">
            These cookies allow the website to remember choices you make and provide enhanced, more personal features.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Cookies</h2>
          <p className="text-gray-700 mb-4">
            In some special cases, we also use cookies provided by trusted third parties. The following section details which third-party cookies you might encounter through this site.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.1. Google Analytics</h3>
          <p className="text-gray-700 mb-4">
            We use Google Analytics to help us understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.2. Third-Party Analytics</h3>
          <p className="text-gray-700 mb-4">
            We use third-party analytics services to help us understand how our website is being used. These services may use cookies to gather information about your use of our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Managing Cookies</h2>
          <p className="text-gray-700 mb-4">
            You can prevent the setting of cookies by adjusting the settings on your browser (see your browser's "Help" section for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. More Information</h2>
          <p className="text-gray-700 mb-4">
            If you are looking for more information on how we handle user data and protect your privacy, please see our <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about this Cookies Policy, please contact us at:
          </p>
          <p>If you have any questions about our use of cookies or this policy, please contact James Croanin at <a href="mailto:jamescroanin@gmail.com" className="text-blue-600 hover:underline">jamescroanin@gmail.com</a>.</p>
        </section>
      </div>
      
      <BackToLegal />
    </>
  )
}
