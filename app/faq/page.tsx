'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FAQSearch } from "../../components/faq/faq-search";
import { useState } from 'react';
import { QuickLinks } from "@/components/ui/quick-links";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Play } from "lucide-react";

// Metadata is now handled in the parent layout or page
const title = 'FAQs - Fluxedita';
const description = 'Frequently asked questions about Fluxedita packages, features, and installation';

const faqSections = [
  {
    id: 'welcome',
    title: 'Welcome to Fluxedita',
    description: 'Find answers to the most common questions about our platform, packages, and capabilities.',
    icon: '👋',
    faqs: [
      {
        question: 'Who is Fluxedita for?',
        answer: 'Whether you\'re a beginner, developer, or agency, Fluxedita is designed to be flexible enough for all users while powerful enough for complex projects.'
      }
    ]
  },
  {
    id: 'platform',
    title: '🧩 Platform & Package Features',
    description: 'Learn about our packages and their capabilities',
    faqs: [
      {
        question: 'Are all Fluxedita packages scalable?',
        answer: 'Yes — every Fluxedita package is fully scalable.Whether you start with a Landing Page or go straight to Premium, you are never locked into a rigid structure.\nYou can add unlimited pages, users, and features as your project grows.\nIn fact, all of our packages include the same underlying architecture and database schema used in our Premium build — so if you have the development skills, you can scale and customize as far as you want.\nWe do not limit your potential — we give you a launchpad.\nIf you are comfortable working with modern tools, you are free to build, extend, and evolve your site without restriction.'
      },
      {
        question: 'Can I start with a smaller package and upgrade later?',
        answer: 'Absolutely. Each package is designed to grow with you. Start simple, and upgrade at any time — whether you\'re adding features, pages, or transitioning to a full content platform.'
      },
      {
        question: 'What\'s included across all packages?',
        answer: 'Every package includes: The same project architecture, the full database schema used in the Premium version, full live-editing features, and cloud-connected services like Supabase, Stripe (ready), and Cloudinary. This means you have access to the same robust foundation, no matter where you start.'
      },
      {
        question: 'Can I add more pages to a Landing, Standard, or Advanced package?',
        answer: 'Yes — without restriction. While our packages offer different starting points, there are no limitations on how many additional pages you can create or how you customize them. In fact, even the Landing Page package can evolve into a full-blown platform — it\'s entirely up to you and your development goals.'
      },
      {
        question: 'What makes the Premium package different?',
        answer: 'The Premium package comes with pre-built media-rich root page sets (/gallery, /exclusive, /behind-the-scenes), built-in media set generation, lightbox views, and commenting system, and auto-generated pages per media upload. That said, you can manually build similar features in any package if you have development knowledge — the architecture supports it across the board.'
      },
      {
        question: 'Can I turn a Landing Page package into a Premium-style setup myself?',
        answer: 'Yes. Because all packages share the same scalable architecture and schema, a developer can build up from any starting point. You\'re never boxed in.'
      },
      {
        question: 'Are Fluxedita packages stable and production-ready?',
        answer: `Fluxedita packages are currently in their Beta/V1 release phase, which essentially means, all are functional but one (or two) sections may contain minor bugs periodically as they are being updated. These issues do not affect core application functionality, and our development team is actively addressing them based on priority. This is reflected in our opening offer prices.

Some section components are still in Beta mode and will be updated over time. These components are provided gratis—they're optional and primarily serve as examples to help you understand how to construct your own sections. Though all sections are functional, some are special, some are fantastic; all are unique to Fluxedita and there will be more fantastic sections added to the Fluxedita packages over the next coming months. For full flexibility, we recommend exploring our Custom Code Component, which allows you to integrate your own designs seamlessly.

All packages include a minimum of 12 months of updates, ensuring that bugs are resolved and new features and components are added regularly. This ongoing support is reflected in our first-tier pricing.

When you consider what's included in each package, the value is exceptional. For example, the Landing Page Package alone represents hundreds of hours of development and can be installed and running in under an hour—for just £99. With built-in editability and customization, a single purchase gives you unlimited potential for unique, prebuilt web packages—no two need ever be the same.`
      }
    ]
  },
  {
    id: 'technical',
    title: '⚙️ Technical & Installation',
    description: 'Setup and technical details',
    faqs: [
      {
        question: 'How do I install a Fluxedita package?',
        answer: 'Each package includes a full Next.js + Tailwind + Supabase project, documentation for setup and deployment, and instructions for connecting your own Supabase, Cloudinary, and Stripe accounts. Simply clone the repo, install dependencies, set environment variables, and deploy.'
      },
      {
        question: 'Do I need to be a developer to use Fluxedita?',
        answer: 'No — live-editing and the admin tools are designed for non-technical users. However, if you want to customize deeply (e.g., add new components or modify database behavior), having development knowledge is helpful.'
      },
      {
        question: 'Can I host Fluxedita myself?',
        answer: 'Yes. All packages are self-hostable. You control where and how your website is deployed — whether on Vercel, Netlify, or your own infrastructure.'
      },
      {
        question: 'Can I use other hosting providers, other than Vercel?',
        answer: 'Yes, you can use any hosting provider that supports Next.js. Here\'s a comparison of popular hosting options:\nHosting Provider | Support Level | Key Features |\nVercel | ⭐️ Native support | Built by the creators of Next.js; supports SSR, ISR, App Router, serverless functions, and edge caching |\nNetlify | ✅ Full support | Supports App Router, ISR, SSR, image optimization, and middleware via OpenNext adapter |\nCloudways | ✅ Supported | Allows deployment via Git, supports PM2, Nginx, and Node.js environments |\nA2 Hosting | ✅ Supported (manual setup) | Node.js-compatible servers, cPanel integration, and guides for deploying Next.js apps |\nHostinger | ⚠️ Limited (shared hosting) / ✅ Full (VPS) | Shared hosting only supports static exports; VPS supports full Node.js apps |\n\nYou can deploy Fluxedita to any of these providers (+ many other providers available, this is not an exhaustive list), though the setup process may vary. Vercel offers the most seamless experience with zero configuration required.'
      },
      {
        question: 'Is there a hosted version of Fluxedita?',
        answer: 'Not yet — but we are planning to introduce a hosted, no-code SaaS version soon. Stay tuned!'
      },
      {
        question: 'What services do I need to connect?',
        answer: 'You\ will need accounts with: a remote Database provider, such as Supabase, for user auth and database, though you can use any database service you wish (Convex, Firebase, etc); Cloudinary (for media storage and delivery, once again this is optional); and Stripe (if you want to accept payments or create membership options, once again this is optional). Our suggested integrations are pre-configured — just plug in your API keys. However, you may add your own API Keys/Routes to the environment variables file if you wish to connect to other services; such as Convex, Bunny CDN, etc.'
      },
      {
        question: 'Do you offer support or setup assistance?',
        answer: 'Yes! Every package includes installation documentation. We also offer email support, optional onboarding (for a fee), and custom implementation services (upon request).'
      }
    ]
  },
  {
    id: 'customization',
    title: '💡 Customization & Development',
    description: 'Extending and customizing your Fluxedita project',
    faqs: [
      {
        question: 'Can I build custom layouts and components?',
        answer: 'Yes. Fluxedita is built with Next.js, React, and Tailwind CSS, meaning you can create reusable sections and components, extend the admin panel, and add new root pages, collections, or membership logic.'
      },
      {
        question: 'Can I connect third-party APIs or services?',
        answer: 'Yes. You\'re free to extend the app with additional APIs, CMS tools, or your own backend logic. The architecture is modular and developer-friendly.'
      },
      {
        question: 'Is Fluxedita suitable for agencies or client work?',
        answer: 'Absolutely. In fact, agencies can quickly deploy white-labeled, client-editable sites, scale projects using our tiered packages, and hand off clean, maintainable projects with no CMS clutter.'
      }
    ]
  },
  {
    id: 'security',
    title: '🔐 Security & Privacy',
    description: 'Data protection and compliance',
    faqs: [
      {
        question: 'Is user data secure with Fluxedita?',
        answer: 'Yes. We use Supabase for secure authentication and role management, Cloudinary for optimized media delivery, and HTTPS and token-based auth across the board. You can also self-host for full data control, use other remote services, and connect your own auth provider. You can use Netlify, Vercel, WordPress'
      },
      {
        question: 'Does Fluxedita comply with GDPR and other privacy laws?',
        answer: 'Yes. We provide a full Privacy Policy, a DPA (Data Processing Agreement) on request, and transparent handling of data and third-party services.'
      }
    ]
  },
  {
    id: 'licensing',
    title: '💼 Licensing & Commercial Use',
    description: 'Usage rights and commercial applications',
    faqs: [
      {
        question: 'Can I use Fluxedita for commercial websites?',
        answer: 'Yes. All packages are built to power commercial, creator, or community sites — including membership and subscription-based platforms.'
      },
      {
        question: 'Can I resell sites built on Fluxedita?',
        answer: 'Yes, as long as you comply with our license (e.g., you cannot resell the raw Fluxedita codebase, but you can build and sell websites using it).'
      }
    ]
  },
  {
    id: 'pricing-plan',
    title: '💰 Pricing & Plans',
    description: 'Understanding our pricing structure and package options',
    faqs: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit/debit cards through our secure Stripe integration. We also support PayPal for certain regions. All transactions are processed securely and we never store your payment details.'
      },
      {
        question: 'Is there a free trial available?',
        answer: 'Currently, we don\'t offer a free trial, but we do provide a 30-day money-back guarantee on all our packages. This gives you plenty of time to explore the features and ensure the package meets your needs.'
      },
      {
        question: 'What\'s included in the different pricing tiers?',
        answer: 'Our pricing is based on the package type (Landing Page, Standard, Advanced, Premium) and the level of support you choose. All packages include the core platform features, with Premium packages including additional pre-built components and priority support. You can find a detailed comparison on our pricing page.'
      },
      {
        question: 'Can I upgrade or downgrade my plan later?',
        answer: 'Absolutely! You can upgrade or downgrade your plan at any time. When you upgrade, you\'ll only pay the prorated difference for the remaining billing period. Downgrades will take effect at the start of your next billing cycle.'
      },
      {
        question: 'Do you offer any discounts for non-profits or educational institutions?',
        answer: 'Yes, we offer special pricing for registered non-profit organizations and educational institutions. Please contact our sales team with proof of status to learn more about our discounted rates.'
      }
    ]
  },
  {
    id: 'troubleshooting',
    title: '🔧 Troubleshooting',
    description: 'Solutions to common issues',
    faqs: [
      {
        question: 'I\'m getting a 404 error after deployment. What should I do?',
        answer: 'This usually happens when the build process didn\'t complete successfully. Try these steps: 1) Clear your browser cache, 2) Check your deployment logs for build errors, 3) Ensure all environment variables are properly set, 4) Try rebuilding your project. If the issue persists, contact our support with your deployment logs.'
      },
      {
        question: 'Images aren\'t loading on my site. How can I fix this?',
        answer: 'First, check if your Cloudinary configuration is correct in your environment variables. Ensure your Cloudinary account is active and has sufficient storage. Also, verify that the image paths in your content match the structure in your media library.'
      },
      {
        question: 'I forgot my admin password. How can I reset it?',
        answer: 'You can reset your password by clicking the \'Forgot Password\' link on the login page. If you don\'t receive the password reset email, check your spam folder. If you still can\'t access your account, contact our support team for assistance.'
      },
      {
        question: 'Why am I seeing \'API Error\' messages?',
        answer: 'API errors can occur due to several reasons: 1) Your Supabase connection might be misconfigured, 2) You might have exceeded API rate limits, 3) There could be temporary service disruptions. Check your browser\'s developer console for specific error messages and verify your API keys and service status.'
      },
      {
        question: 'How do I clear my site\'s cache?',
        answer: 'To clear your site\'s cache: 1) In your browser, press Ctrl+Shift+Delete (Windows/Linux) or Cmd+Shift+Delete (Mac), 2) Select \'All time\' as the time range, 3) Check \'Cached images and files\', 4) Click \'Clear data\'. For server-side caching, you may need to clear your CDN cache if you\'re using one.'
      },
      {
        question: 'My changes aren\'t showing up on the live site. What should I do?',
        answer: '1) First, try a hard refresh (Ctrl+F5 or Cmd+Shift+R), 2) Clear your browser cache, 3) Check if your deployment completed successfully, 4) If you\'re using a CDN, clear its cache. If the issue persists, check your deployment logs for any errors.'
      }
    ]
  },
  {
    id: 'upgrading',
    title: '📈 Upgrading & Expanding',
    description: 'Growing with Fluxedita',
    faqs: [
      {
        question: 'How do I upgrade from one package to another?',
        answer: 'Upgrades are simple. You can migrate your project by replacing or merging files, extend functionality with your own dev team, or request help from us to handle the upgrade. We can also assist with feature migration or automated page generation if needed.'
      },
      {
        question: 'Is there a roadmap or upcoming features?',
        answer: 'Yes! Some upcoming additions include: SaaS dashboard and hosted Fluxedita service, AI-assisted section creation, custom template libraries and theme kits, and more one-click integrations.'
      }
    ]
  }
]

// Flatten all FAQs for search functionality
const allFaqs = faqSections.flatMap(section => 
  section.faqs.map(faq => ({
    ...faq,
    sectionId: section.id,
    sectionTitle: section.title
  }))
);

// Define section links for the quick navigation
const faqSectionLinks = [
  {
    id: 'welcome',
    label: 'Welcome',
    excerpt: 'Introduction to Fluxedita',
  },
  {
    id: 'platform',
    label: 'Platform & Features',
    excerpt: 'Learn about our packages and capabilities',
  },
  {
    id: 'technical',
    label: 'Technical & Installation',
    excerpt: 'Installation and setup guides',
  },
  {
    id: 'pricing-plan',
    label: 'Pricing & Plans',
    excerpt: 'Package options and pricing details',
  },
  {
    id: 'upgrading',
    label: 'Upgrading',
    excerpt: 'How to upgrade your package',
  },
  {
    id: 'troubleshooting',
    label: 'Troubleshooting',
    excerpt: 'Common issues and solutions',
  },
];

export default function FAQPage() {
  // Keyword to section ID mapping
  const sectionKeywords = {
    'platform': 'platform',
    'feature': 'platform',
    'capabilities': 'platform',
    'what can': 'platform',
    'can i do': 'platform',
    'technical': 'technical',
    'install': 'technical',
    'installation': 'technical',
    'Convex': 'technical',
    'Firebase': 'technical',
    'bunny': 'technical',
    'cdn': 'technical',
    'supabase': 'technical',
    'netlify': 'technical',
    'vercel': 'technical',
    'wordpress': 'technical',
    'cloudinary': 'technical',
    'stripe': 'technical',
    'setup': 'technical',
    'requirements': 'technical',
    'pricing': 'pricing-plan',
    'cost': 'pricing-plan',
    'price': 'pricing-plan',
    'plans': 'pricing-plan',
    'subscription': 'pricing-plan',
    'upgrade': 'upgrading',
    'premium': 'upgrading',
    'pro': 'upgrading',
    'enterprise': 'upgrading',
    'troubleshoot': 'troubleshooting',
    'problem': 'troubleshooting',
    'issue': 'troubleshooting',
    'error': 'troubleshooting',
    'fix': 'troubleshooting',
    'help': 'troubleshooting',
    'support': 'troubleshooting'
  };

  const [searchResults, setSearchResults] = useState<typeof allFaqs>([]);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchResults = (query: string, results: typeof allFaqs) => {
    setSearchQuery(query);
    setSearchResults(results);
    setSearchActive(true);
    
    // Check for section keywords
    const queryLower = query.toLowerCase();
    let foundSection = false;
    
    // First, try to find a matching section
    for (const [keyword, sectionId] of Object.entries(sectionKeywords)) {
      if (queryLower.includes(keyword)) {
        // Use setTimeout to ensure the DOM is updated before scrolling
        setTimeout(() => {
          const sectionElement = document.getElementById(sectionId);
          if (sectionElement) {
            // Add a small offset to account for any fixed headers
            const yOffset = -100;
            const y = sectionElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
            
            // Add a highlight effect
            sectionElement.style.transition = 'background-color 1s ease';
            sectionElement.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
            
            // Remove the highlight after 2 seconds
            setTimeout(() => {
              if (sectionElement) {
                sectionElement.style.backgroundColor = '';
              }
            }, 2000);
          }
        }, 100);
        
        foundSection = true;
        break;
      }
    }
    
    // If no section was found, scroll to search results
    if (!foundSection && results.length > 0) {
      setTimeout(() => {
        const searchResultsElement = document.getElementById('search-results');
        if (searchResultsElement) {
          const yOffset = -100;
          const y = searchResultsElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 0);
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      <Header />
      <QuickLinks sections={faqSectionLinks} />

      {/* Hero Section */}
      <section className="bg-indigo-50 py-12">
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-5 max-w-3xl mx-auto text-xl text-gray-500">
            Welcome to the Fluxedita FAQ. Find answers to the most common questions about our platform, packages, and capabilities.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
        <FAQSearch 
          allFaqs={allFaqs}
          onSearchResultsAction={handleSearchResults}
          searchQuery={searchQuery}
          setSearchQueryAction={setSearchQuery}
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-20">
          {faqSections.map((section: typeof faqSections[number]) => (
            <section key={section.id} id={section.id} className="scroll-mt-20">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 md:text-3xl flex items-center">
                  {section.icon && section.id !== 'search-results' && <span className="mr-3">{section.icon}</span>}
                  {section.title}
                  {section.id === 'search-results' && (
                    <button 
                      onClick={() => {
                        setSearchActive(false);
                        setSearchResults([]);
                        // Reset search input if you have a ref to it
                      }}
                      className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Clear search
                    </button>
                  )}
                </h2>
                {section.description && (
                  <p className="mt-2 text-lg text-gray-600">
                    {section.description}
                  </p>
                )}
              </div>
              
              <div className="space-y-6">
                {section.faqs.map((faq: { question: string; answer: string }, index: number) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 p-6 rounded-lg shadow-md"
                  >
                    <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                    <motion.div 
                      initial={{ height: 0 }} 
                      animate={{ height: 'auto' }} 
                      transition={{ duration: 0.5 }}
                      className="mt-2 text-gray-600 space-y-4"
                    >
                      {faq.answer.split('\n').map((paragraph: string, i: number) => (
                        <p key={i} className="mt-2">{paragraph}</p>
                      ))}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* CTA Block */}
        <div className="mt-16 text-center bg-indigo-50 p-8 rounded-xl">
          <h2 className="text-2xl font-medium text-gray-900">Still have questions?</h2>
          <p className="mt-4 text-lg text-gray-600">
            We're here to help. Reach out to us anytime at:
          </p>
          <div className="mt-4">
            <a 
              href="/contact" 
              className="text-lg font-medium text-indigo-600 hover:text-indigo-500"
            >
              📧 support@fluxedita.com
            </a>
          </div>
          <div className="mt-6">
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Visit Contact Page
            </a>
          </div>
        </div>
        <div className="text-center mt-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-gradient-to-r from-green-600 to-yellow-600 hover:opacity-90">
                        <Play className="mr-2 h-5 w-5" />
                        Watch Installation Video
                        <br />
                        <p className="text-sm text-blue-100">(Shortened Version)</p>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl w-full p-0">
                      <DialogHeader className="px-6 pt-6">
                        <DialogTitle>Installation Video</DialogTitle>
                      </DialogHeader>
                      <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0 }}>
                        <iframe
                          src="https://www.youtube.com/embed/h7NSqtp8n-0"
                          title="Fluxedita Installation Guide"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute top-0 left-0 w-full h-full rounded-lg"
                          width="100%"
                          height="100%"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
      </main>
      <Footer />
    </div>
  )
}