import { Metadata } from 'next';
import { Fragment } from 'react';
import Link from 'next/link';
import { getLegalContent } from '../utils/legalContent';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Legal Documentation | Fluxedita',
  description: 'View our legal documentation including Terms of Service, Privacy Policy, and other important legal information.',
};

async function LegalSection({ title, slug }: { title: string; slug: string }) {
  const content = await getLegalContent(slug);
  if (!content) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h2>
        <div className="prose prose-indigo text-gray-600 mb-6 relative">
          <p className="text-gray-700">{content.preview}</p>
          <div className="h-6 bg-gradient-to-b from-transparent to-white w-full -mt-6 relative"></div>
        </div>
        <div className="flex justify-center mt-4">
          <Link
            href={`/${slug}`}
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
          >
            Read Full Document
            <svg
              className="ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <Link
            href={`/${slug}`}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View full document →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default async function LegalPage() {
  // Get all legal sections from the content file
  const legalSections = [
    { title: 'Terms of Service', slug: 'terms' },
    { title: 'Privacy Policy', slug: 'privacy' },
    { title: 'Cookie Policy', slug: 'cookies' },
    { title: 'Refund Policy', slug: 'refund-policy' },
    { title: 'Acceptable Use Policy', slug: 'aup' },
    { title: 'Accessibility Statement', slug: 'accessibility' },
    { title: 'Data Processing Agreement', slug: 'dpa' },
    { title: 'EU Compliance', slug: 'eu-compliance' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Legal Documentation
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Important legal information about our services and policies
          </p>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {legalSections.map((section, index) => (
            <Fragment key={index}>
              <LegalSection
                key={section.slug}
                title={section.title}
                slug={section.slug}
              />
              {index < legalSections.length - 1 && <div className="h-px bg-gray-200"></div>}
            </Fragment>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
