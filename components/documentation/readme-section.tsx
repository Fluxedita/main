"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, Zap, ShieldCheck, Users } from "lucide-react"

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.7, 
      ease: [0.16, 1, 0.3, 1] // easeOutExpo
    } 
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
    },
  },
}

const introHighlights = [
  {
    icon: Zap,
    title: "Modern & Full-Featured",
    description: "Built with Next.js, Supabase, and Cloudinary for a powerful, scalable platform.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: ShieldCheck,
    title: "Live Editing & Security",
    description: "Instantly edit your site live in the browser with robust admin controls and security.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Users,
    title: "For Creators & Pros",
    description: "Designed for professionals to manage content, media, and offer a seamless experience.",
    color: "from-purple-500 to-violet-600",
  },
]

// Manually convert markdown to JSX for better control and styling
const readmeContent = {
  title: "Premium Portfolio Website",
  overview: (
    <>
      <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
        A modern, full-featured editable website platform built with Next.js, Supabase, and Cloudinary. Instantly
        create, edit, update your website, live in the browser with robust security and admin controls.
      </p>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">Overview</h3>
      <p className="text-lg text-gray-700 max-w-3xl mx-auto">
        This editable website is designed for creators and professionals who want to:
      </p>
      <ul className="list-disc list-inside ml-4 mt-2 text-lg text-gray-700 max-w-3xl mx-auto">
        <li>Manage content and media with a user-friendly admin dashboard</li>
        <li>Offer a seamless, responsive experience across all devices</li>
        <li>Leverage modern authentication, analytics, and security best practices</li>
      </ul>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2 max-w-3xl mx-auto">Key Features:</h4>
      <ul className="list-disc list-inside ml-4 mt-2 text-lg text-gray-700 max-w-3xl mx-auto">
        <li>Products Page with preview content for all visitors</li>
        <li>About page with rich personal information</li>
        <li>Responsive design for mobile, tablet, and desktop</li>
        <li>Powerful admin controls for content, media, and media management</li>
        <li>Real-time updates and analytics</li>
        <li>Legal docs: Cookies, Terms, Privacy pages</li>
      </ul>
    </>
  ),
  full: (
    <>
      <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-3">Features & Architecture</h3>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Dynamic Content Management</h4>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>Create, edit, and organize pages and sections (public, premium, and custom)</li>
        <li>Rich text and media support</li>
        <li>Real-time updates for content and media</li>
        <li>Customizable pages and sections with rich text editing</li>
        <li>Intuitive media management with Cloudinary optimization</li>
        <li>Create premium member-exclusive content areas</li>
      </ul>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Media Optimization</h4>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>Seamless Cloudinary integration for images and videos</li>
        <li>Responsive, optimized media delivery</li>
        <li>Automatic format conversion and lazy loading</li>
        <li>Efficient bandwidth usage</li>
      </ul>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Public & Admin Access Control</h4>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>Public, member, and admin content areas (can be extended to premium routes, fully scalable database)</li>
        <li>Secure authentication and authorization with Supabase</li>
        <li>Robust Row Level Security (RLS) for all sensitive data</li>
        <li>Admin-only features and regular security reviews</li>
      </ul>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Admin Dashboard</h4>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>Manage content, media, and site settings</li>
        <li>Analytics and activity tracking</li>
      </ul>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Comments System (optional Integration)</h4>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>Public and member comments with moderation tools</li>
        <li>Real-time updates and notifications</li>
      </ul>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Analytics & Tracking</h4>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>Page view and user interaction analytics</li>
        <li>Media engagement and premium content access tracking</li>
        <li>Performance metrics</li>
      </ul>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Security</h4>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>Comprehensive RLS policies (see `supabase/combined_rls_policies.sql`)</li>
        <li>Password validation and audit trails</li>
        <li>Admin-only features and regular security reviews</li>
      </ul>

      <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-3">Tech Stack</h3>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>
          <strong>Framework:</strong> Next.js 14 (App Router)
        </li>
        <li>
          <strong>Language:</strong> TypeScript
        </li>
        <li>
          <strong>Styling:</strong> Tailwind CSS
        </li>
        <li>
          <strong>UI Components:</strong> shadcn/ui
        </li>
        <li>
          <strong>State Management:</strong> React Hooks & Context
        </li>
        <li>
          <strong>Media Storage & Optimization:</strong> Cloudinary
        </li>
        <li>
          <strong>Authentication & Database:</strong> Supabase (with RLS)
        </li>
        <li>
          <strong>Animations:</strong> Framer Motion
        </li>
        <li>
          <strong>Icons:</strong> Lucide Icons
        </li>
        <li>
          <strong>Notifications:</strong> Sonner
        </li>
        <li>
          <strong>Testing:</strong> (add your testing framework if used)
        </li>
        <li>
          <strong>CI/CD:</strong> (add your CI/CD tool if used)
        </li>
      </ul>

      <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-3">Application Architecture & Patterns</h3>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Page Structure Pattern</h4>
      <p>The application follows a consistent architecture pattern for all major pages:</p>
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
        <code className="language-bash">
          {`app/
├── page.tsx               # Server component (page definition)
└── PageClient.tsx         # Client component (complex logic)`}
        </code>
      </pre>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Benefits:</h4>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>
          <strong>Separation of Concerns</strong>: Page definitions vs. complex logic
        </li>
        <li>
          <strong>Performance</strong>: Server-side rendering with client-side interactivity
        </li>
        <li>
          <strong>Maintainability</strong>: Easier to work with and modify components
        </li>
        <li>
          <strong>Consistency</strong>: All pages follow the same pattern
        </li>
      </ul>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Example Structure:</h4>
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
        <code className="language-tsx">
          {`// app/page.tsx (Server Component)
import { Suspense } from 'react';
import HomePageClient from './HomePageClient';

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageClient />
    </Suspense>
  );
}`}
        </code>
      </pre>
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
        <code className="language-tsx">
          {`// app/HomePageClient.tsx (Client Component)
'use client'
import { useState, useEffect } from 'react'
// ... complex logic, state management, handlers
export default function HomePageClient() {
  // All the complex logic here
  return (
    <main>
      {/* Page content */}
    </main>
  )
}`}
        </code>
      </pre>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Authentication Flow</h4>
      <p>The application uses Supabase Auth with a robust authentication system:</p>
      <p>
        We are using Supabase for authentication and have a `getAdminSession` function that checks for admin status.
      </p>
      <h5 className="text-lg font-semibold text-gray-900 mt-4 mb-2">1. Authentication Provider</h5>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>Manages user session state</li>
        <li>Provides authentication context</li>
        <li>Handles login/logout flows</li>
        <li>Integrates with Supabase Auth</li>
      </ul>
      <h5 className="text-lg font-semibold text-gray-900 mt-4 mb-2">2. Protected Routes</h5>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>
          <strong>Public Routes</strong>: Home, Products, About, Contact, Terms, Privacy, cookies
        </li>
        <li>
          <strong>Admin Routes</strong>: Admin dashboard, Media management
        </li>
      </ul>
      <h5 className="text-lg font-semibold text-gray-900 mt-4 mb-2">3. Authentication Hooks</h5>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>`useAuth()`: Provides user state and auth methods via context</li>
        <li>Automatic session management</li>
        <li>Redirect handling for protected routes</li>
      </ul>
      <h5 className="text-lg font-semibold text-gray-900 mt-4 mb-2">4. Row Level Security (RLS)</h5>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>Database-level security policies</li>
        <li>User-specific data access</li>
        <li>Premium content protection (scalable process, pre-built into your Supabase table structure)</li>
        <li>Admin-only operations</li>
      </ul>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
        Supabase Client Usage (<strong>Important</strong>)
      </h4>
      <p>All client-side code must use the shared Supabase client instance:</p>
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
        <code className="language-js">{"import supabase from '@/lib/supabase/client'"}</code>
      </pre>
      <p>
        <strong>Do not</strong> use `createBrowserSupabaseClient`, `createClientComponentClient`, or any custom client
        creation in the browser. This ensures correct session handling and avoids issues with authentication and RLS.
      </p>
      <p>
        If you see a warning about "Multiple GoTrueClient instances," check your imports and ensure only the shared
        client is used.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-3">API Routes Organization</h3>
      <p>API routes are organized by feature under `app/api/` (auth, gallery, media, pages, etc.).</p>

      <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-3">State Management</h3>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>
          <strong>Local State:</strong> React hooks (`useState`, `useEffect`)
        </li>
        <li>
          <strong>Global State:</strong> Context API for auth state, custom hooks for shared logic
        </li>
        <li>
          <strong>Server State:</strong> Server actions for mutations, API routes for data fetching, Supabase client for
          database operations
        </li>
      </ul>

      <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-3">Media Management</h3>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>
          <strong>Cloudinary Integration:</strong> Automatic image optimization, responsive delivery, video processing
        </li>
        <li>
          <strong>Media Workflow:</strong>
          <ol className="list-decimal list-inside ml-8 mt-2">
            <li>
              <strong>Upload:</strong> Client → Cloudinary → Supabase
            </li>
            <li>
              <strong>Storage:</strong> Cloudinary CDN + Supabase metadata
            </li>
            <li>
              <strong>Delivery:</strong> Optimized images via Cloudinary
            </li>
            <li>
              <strong>Management:</strong> Admin interface for organization
            </li>
          </ol>
        </li>
      </ul>

      <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-3">Database Schema & Security</h3>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>
          <strong>Core Tables:</strong> users, profiles, pages, media, subscriptions, analytics
        </li>
        <li>
          <strong>Security Policies:</strong> RLS enabled on all tables, user-specific data access, premium content
          protection, admin-only operations
        </li>
      </ul>

      <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-3">Error Handling & User Experience</h3>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>
          <strong>Client-Side:</strong> Toast notifications (Sonner), error boundaries, graceful fallbacks
        </li>
        <li>
          <strong>Server-Side:</strong> API route error handling, database error management, authentication error
          handling
        </li>
        <li>
          <strong>UX:</strong> Loading states, error messages, retry mechanisms
        </li>
      </ul>

      <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-3">Getting Started</h3>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">1. Clone the Repository</h4>
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
        <code className="language-bash">{"git clone [repository-url]\ncd fluxedita_custom_website_package"}</code>
      </pre>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">2. Install Dependencies</h4>
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
        <code className="language-bash">{"npm install"}</code>
      </pre>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">3. Environment Setup</h4>
      <p>Copy the example environment file and fill in your credentials:</p>
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
        <code className="language-bash">{"cp .env.example .env.local"}</code>
      </pre>
      <p>Edit `.env.local` and set the following variables:</p>
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
        <code className="language-env">
          {`# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
# (Add any other required variables for your setup, please see the default env.example file. Rename this to env.local and add your personal details. Please see the fluxedita installation video if you run into dificulties.`}
        </code>
      </pre>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">4. Start the Development Server</h4>
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
        <code className="language-bash">{"npm run dev"}</code>
      </pre>
      <p>
        Visit{" "}
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          http://localhost:3000
        </a>{" "}
        to view the app.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-3">Supabase Database Setup</h3>
      <p>
        For full details, see{" "}
        <a href="./supabase/SETUP_README.md" className="text-blue-600 hover:underline">
          `supabase/SETUP_README.md`
        </a>
        .
      </p>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Quick Start (Local Development):</h4>
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
        <code className="language-bash">
          {`# 1. Start Supabase locally
supabase start
# 2. Run main initialization script
supabase db reset
# 3. Apply RLS policies
psql -h localhost -U postgres -d your_database -f supabase/combined_rls_policies.sql
# 4. Create first user and promote to admin
#    (See supabase/FIRST_USER_SETUP.md)`}
        </code>
      </pre>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>The first user should be created via the Supabase Auth Dashboard or your app's sign-up flow.</li>
        <li>After user creation, promote to admin using the SQL in FIRST_USER_SETUP.md or promote_to_admin.sql.</li>
      </ul>
      <p>
        <strong>Production setup:</strong> Follow the same steps, but connect to your production database.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-3">Seeding Initial Data</h3>
      <p>If you need to seed the database with homepage and essential pages, use the provided script:</p>
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
        <code className="language-bash">{"node scripts/init-homepage-data.js"}</code>
      </pre>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>This script creates the homepage and other essential pages with default content.</li>
        <li>You can re-run this script after a fresh database setup or when adding new core pages.</li>
      </ul>

      <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-3">Available Scripts</h3>
      <p>
        The project includes several utility scripts for common tasks. <strong>Note:</strong> For core database setup
        and security, always use the SQL scripts in `supabase/` as described above.
      </p>
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
        <code className="language-bash">
          {`# Seed the database with homepage and essential pages
node scripts/init-homepage-data.js
# Create a new admin user (alternative to SQL-based admin creation)
node scripts/create-admin-user.js
# Check gallery setup
node scripts/check-gallery-setup.js
# Create a backup of the database
./scripts/backup.sh`}
        </code>
      </pre>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Other scripts:</h4>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>`scripts/setup-gallery-sections.js` — Sets up gallery sections and policies</li>
        <li>`scripts/check-gallery-setup.js` — Verifies gallery setup is correct</li>
        <li>`scripts/clean-uploads.js` — Cleans up unused uploads</li>
      </ul>
      <p className="italic text-sm text-gray-500">
        <strong>Tip:</strong> For all critical database structure, RLS, and admin setup, use the SQL scripts in
        `supabase/` for consistency and security.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-3">Database Migrations</h3>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">What are Migrations?</h4>
      <p>Migrations are version-controlled scripts that track changes to your database schema. They help you:</p>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>Keep development and production databases in sync</li>
        <li>Safely evolve your schema over time</li>
        <li>Share changes with your team</li>
      </ul>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Migration Workflow</h4>
      <ol className="list-decimal list-inside ml-4 mt-2">
        <li>
          <strong>First Time Setup</strong>
          <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
            <code className="language-bash">
              {`# This will create your local database and apply all migrations
npx supabase db reset`}
            </code>
          </pre>
        </li>
        <li>
          <strong>After Pulling New Changes</strong>
          <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
            <code className="language-bash">
              {`# If you see new migration files, run:
npx supabase db push`}
            </code>
          </pre>
        </li>
        <li>
          <strong>Creating a New Migration</strong>
          <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
            <code className="language-bash">{`npx supabase migration new your_migration_name`}</code>
          </pre>
        </li>
        <li>
          <strong>Testing Your Changes</strong>
          <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
            <code className="language-bash">{`npx supabase db reset`}</code>
          </pre>
        </li>
      </ol>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Our Migration Files</h4>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>
          The main schema and RLS are managed in:
          <ul className="list-disc list-inside ml-8 mt-2">
            <li>`supabase/supabase_first_init_script.sql`</li>
            <li>`supabase/combined_rls_policies.sql`</li>
            <li>`supabase/FIRST_USER_SETUP.md` (guide for first user and admin creation)</li>
          </ul>
        </li>
        <li>Additional migrations are in `supabase/migrations/` and should be used for incremental changes.</li>
      </ul>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Best Practices</h4>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>Test migrations locally before pushing to production</li>
        <li>Keep migration files in version control</li>
        <li>Never modify existing migration files after they've been applied</li>
        <li>Always back up your database before running new migrations</li>
      </ul>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Troubleshooting</h4>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>
          <strong>Migration failed?</strong>
          <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
            <code className="language-bash">{"npx supabase migration list"}</code>
          </pre>
        </li>
        <li>
          <strong>Database out of sync?</strong>
          <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
            <code className="language-bash">{"npx supabase db reset"}</code>
          </pre>
        </li>
        <li>
          <strong>Check database structure</strong>
          <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
            <code className="language-sql">
              {"SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"}
            </code>
          </pre>
        </li>
      </ul>

      <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-3">Backup & Recovery</h3>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Regular Backups</h4>
      <p>The project includes an automated backup script for the Supabase database:</p>
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
        <code className="language-bash">{"./scripts/backup.sh"}</code>
      </pre>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>Backups are stored in the `./backups` directory with timestamps for easy tracking.</li>
        <li>It is recommended to run this script before applying new migrations or making major changes.</li>
      </ul>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Disaster Recovery</h4>
      <p>
        A comprehensive disaster recovery plan is available in{" "}
        <a href="./docs/disaster_recovery_plan.md" className="text-blue-600 hover:underline">
          `docs/disaster_recovery_plan.md`
        </a>
        , covering:
      </p>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>Backup procedures and schedules</li>
        <li>Step-by-step recovery process</li>
        <li>Testing and verification steps</li>
        <li>Documentation requirements</li>
        <li>Emergency contact procedures</li>
      </ul>

      <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-3">Project Structure</h3>
      <p>The project is organized for clarity and maintainability:</p>
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
        <code className="language-bash">
          {`premium_portfolio/
├── app/                   # Next.js 14 App Router pages and features
│   ├── about/             # About page
│   ├── actions/           # Server actions
│   ├── admin/             # Admin dashboard & member management
│   ├── api/               # API routes (grouped by feature)
│   ├── auth/              # Authentication pages
│   ├── contact/           # Contact page
│   ├── cookies/           # Cookie policy page
│   ├── dashboard/         # User dashboard
│   ├── login/             # Login page
│   ├── media/             # Media management
│   ├── members/           # Member area
│   ├── privacy/           # Privacy policy page
│   ├── product/           # Default products page
│   ├── subscription/      # Subscription management
│   └── terms/             # Terms of service
├── components/            # React reusable components
├── lib/                   # Utility functions & service clients
├── public/                # Static assets
├── scripts/               # Utility scripts (seeding, backup, admin, etc.)
├── supabase/              # Supabase configuration, SQL scripts, migrations
│   └── migrations/        # Database migrations
├── docs/                  # Documentation (disaster recovery, guides, etc.)`}
        </code>
      </pre>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Notes:</h4>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>Root Pages (like `/home`, `/products`, `/about`) use `root_page_components`.</li>
        <li>Custom Pages (user-created pages) use the `custom_pages` table.</li>
        <li>
          The `/api/pages/list` route only shows custom pages from the `custom_pages` table, not root pages. Root pages
          show in the standard nav menu links.
        </li>
      </ul>

      <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-3">Environment Variables</h3>
      <p>Required environment variables for development:</p>
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
        <code className="language-env">
          {`# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret`}
        </code>
      </pre>

      <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-3">Security & Best Practices</h3>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>
          <strong>Row Level Security (RLS):</strong> All sensitive tables are protected by RLS, with policies managed in
          `supabase/combined_rls_policies.sql`.
        </li>
        <li>
          <strong>Admin User Management:</strong> Admin users are created and verified via the SQL scripts in
          `supabase/` or via secure admin scripts. Always use strong, unique passwords and change them after first
          login.
        </li>
        <li>
          <strong>Environment Variables:</strong> Never commit secrets or credentials to version control. Use
          `.env.local` for local development and environment variables for production.
        </li>
        <li>
          <strong>Backups:</strong> Run `./scripts/backup.sh` before major changes or migrations. Store backups
          securely.
        </li>
        <li>
          <strong>Disaster Recovery:</strong> Follow the plan in{" "}
          <a href="./docs/disaster_recovery_plan.md" className="text-blue-600 hover:underline">
            `docs/disaster_recovery_plan.md`
          </a>{" "}
          for backup and restore procedures.
        </li>
        <li>
          <strong>Code Reviews:</strong> All changes should be reviewed via Pull Requests. Use the security checklist in
          `supabase/SETUP_README.md` after major updates.
        </li>
        <li>
          <strong>Regular Audits:</strong> Periodically review RLS policies, admin access, and database logs for unusual
          activity.
        </li>
      </ul>

      <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-3">Contributing</h3>
      <p>We welcome contributions! Please follow these steps:</p>
      <ol className="list-decimal list-inside ml-4 mt-2">
        <li>Fork the repository</li>
        <li>Create a feature branch (`git checkout -b feature/amazing-feature`)</li>
        <li>Commit your changes (`git commit -m 'Add amazing feature'`)</li>
        <li>Push to the branch (`git push origin feature/amazing-feature`)</li>
        <li>Open a Pull Request</li>
      </ol>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Best Practices:</h4>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>Write clear, descriptive commit messages</li>
        <li>Add or update documentation as needed</li>
        <li>Test your changes locally before submitting</li>
        <li>Reference related issues or discussions in your PR</li>
      </ul>

      <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-3">License</h3>
      <p>
        This project is licensed under the MIT License - see the{" "}
        <a href="./LICENSE" className="text-blue-600 hover:underline">
          LICENSE
        </a>{" "}
        file for details.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-3">Support</h3>
      <p>For support and assistance:</p>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>Contact us at <a href="mailto:support@fluxedita.com" className="text-blue-600 hover:underline">support@fluxedita.com</a></li>
        <li>
          Check our{" "}
          <a
            href="https://your-docs-url"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            documentation
          </a>{" "}
          for detailed guides
        </li>
      </ul>
      <p className="italic text-sm text-gray-500">
        <strong>Note:</strong> This project is actively maintained. For the latest updates and features, please check
        the{" "}
        <a
          href="https://github.com/your-username/premium-portfolio/releases"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          releases page
        </a>
        .
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-3">Admin User Management</h3>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Creating a New Admin User</h4>
      <p>
        If you need to create a new admin user for the application, you can use the following script. This script will:
      </p>
      <ol className="list-decimal list-inside ml-4 mt-2">
        <li>Create a new user in Supabase Auth</li>
        <li>Set that user as the application administrator</li>
      </ol>
      <h5 className="text-lg font-semibold text-gray-900 mt-4 mb-2">Step 1: Create the script file</h5>
      <p>Create a new file at `scripts/create-new-admin.js` with the following content:</p>
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
        <code className="language-javascript">
          {`const { createClient } = require('@supabase/supabase-js');

// --- Configuration ---
const newAdminEmail = 'your-new-admin@example.com';   // Change this to your desired email
const newAdminPassword = 'your-secure-password';      // Change this to your desired password

// --- Supabase Credentials ---
const supabaseUrl = 'https://kohpccphgpdzcawxmviu.supabase.co';
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvaHBjY3BoZ3BkemNhd3htdml1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODY3OTQwNSwiZXhwIjoyMDY0MjU1NDA1fQ.WH6SZjzGp14dgveicznlN6YR6zd_0yRXtNamkoWQkS0';

// --- Script Logic ---
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createNewAdmin() {
  console.log(\`--- Step 1: Creating user for \${newAdminEmail}...\`);
  // Step 1: Create the user in Supabase Auth
  const { data: userData, error: userError } = await supabase.auth.admin.createUser({
    email: newAdminEmail,
    password: newAdminPassword,
    email_confirm: true, // Auto-confirm the email so they can log in immediately
  });

  if (userError) {
    // Check if the error is because the user already exists
    if (userError.message.includes('User already registered')) {
      console.log(\`User \${newAdminEmail} already exists. Skipping creation.\`);
    } else {
      console.error('Error creating user:', userError.message);
      console.error('Aborting script.');
      return;
    }
  } else {
    console.log(\`✅ User \${userData.user.email} created successfully.\`);
  }

  console.log(\`--- Step 2: Setting \${newAdminEmail} as the application admin...\`);
  // Step 2: Set this new user as the admin in the app_settings table
  const { error: settingsError } = await supabase
    .from('app_settings')
    .upsert({ key: 'admin_email', value: newAdminEmail }, { onConflict: 'key' });

  if (settingsError) {
    console.error('Error updating admin email setting:', settingsError.message);
  } else {
    console.log('✅ Admin email setting updated successfully.');
  }

  console.log('---');
  console.log('🚀 All done! You can now log in with the new admin account.');
  console.log(\`   Email: \${newAdminEmail}\`);
  console.log(\`   Password: \${newAdminPassword}\`);
  console.log('---');
  console.log('SECURITY WARNING: Please delete this script file now.');
  console.log('---');
}

createNewAdmin();`}
        </code>
      </pre>
      <h5 className="text-lg font-semibold text-gray-900 mt-4 mb-2">Step 2: Update the configuration</h5>
      <p>Before running the script, make sure to update these variables at the top of the script:</p>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>`newAdminEmail`: Set to the email address you want to use for the admin account</li>
        <li>`newAdminPassword`: Set to a secure password for the admin account</li>
      </ul>
      <h5 className="text-lg font-semibold text-gray-900 mt-4 mb-2">Step 3: Run the script</h5>
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
        <code className="language-bash">{"node scripts/create-new-admin.js"}</code>
      </pre>
      <h5 className="text-lg font-semibold text-gray-900 mt-4 mb-2">Step 4: Clean up (IMPORTANT)</h5>
      <p>
        After the script runs successfully, <strong>delete the script file</strong> to remove the hardcoded credentials:
      </p>
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
        <code className="language-bash">{"rm scripts/create-new-admin.js"}</code>
      </pre>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Verify User by user ID</h4>
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
        <code className="language-sql">
          {`UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE id = '178a0c11-d11e-462a-8c64-441534e5b774';`}
        </code>
      </pre>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Important Security Notes</h4>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>
          <strong>Use strong passwords</strong>: The admin account has full access to the application
        </li>
        <li>
          <strong>Delete the script</strong>: Always remove the script file after use to prevent credential exposure
        </li>
        <li>
          <strong>Change passwords</strong>: Consider changing the admin password after first login
        </li>
        <li>
          <strong>Limit access</strong>: Only create admin accounts for trusted users who need administrative access
        </li>
      </ul>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Troubleshooting</h4>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>
          <strong>User already exists</strong>: The script will skip creation if the email is already registered
        </li>
        <li>
          <strong>Database errors</strong>: Ensure your Supabase credentials are correct and the service has proper
          permissions
        </li>
        <li>
          <strong>Login issues</strong>: Make sure the `app_settings` table exists and has the correct structure
        </li>
      </ul>

      <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-3">Key Component Guide</h3>
      <p>
        To help future developers, here's a guide to some of the most important components and their roles in the
        application.
      </p>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Members Management Components</h4>
      <p>
        There are several components for managing and displaying members, each with a specific purpose and location:
      </p>
      <h5 className="text-lg font-semibold text-gray-900 mt-4 mb-2">1. `MembersManager.tsx`</h5>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>
          <strong>Purpose:</strong> Main, feature-rich component for managing members (table, search, filters, add
          member, etc.)
        </li>
        <li>
          <strong>Location:</strong> Displayed on the main `/members` page for administrators.
        </li>
        <li>
          <strong>Data Source:</strong> Fetches live user data from Supabase via the `getMembers` server action.
        </li>
        <li>
          <strong>File Path:</strong> `components/admin/MembersManager.tsx`
        </li>
      </ul>
      <h5 className="text-lg font-semibold text-gray-900 mt-4 mb-2">2. `NewMembersTable.tsx`</h5>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>
          <strong>Purpose:</strong> Displays the members table in the admin dashboard, with search and update features.
        </li>
        <li>
          <strong>Location:</strong> `/admin/members` page for administrators.
        </li>
        <li>
          <strong>Data Source:</strong> Fetches live user data from Supabase via the `getMembers` server action.
        </li>
        <li>
          <strong>File Path:</strong> `components/admin/NewMembersTable.tsx`
        </li>
      </ul>
      <h5 className="text-lg font-semibold text-gray-900 mt-4 mb-2">3. `PublicMembersList.tsx`</h5>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>
          <strong>Purpose:</strong> Displays the members table for users (public/member view).
        </li>
        <li>
          <strong>Location:</strong> `/members` page for users.
        </li>
        <li>
          <strong>Data Source:</strong> Fetches member data using the `getMembers` function from
          `@/app/actions/members`.
        </li>
        <li>
          <strong>File Path:</strong> `components/members/PublicMembersList.tsx`
        </li>
      </ul>
      <h5 className="text-lg font-semibold text-gray-900 mt-4 mb-2">4. `MembersPageClient.tsx`</h5>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>
          <strong>Purpose:</strong> Renders the testimonials carousel on the `/members` page (not the main members data
          table).
        </li>
        <li>
          <strong>Data Source:</strong> Uses a hardcoded array of testimonial objects.
        </li>
        <li>
          <strong>File Path:</strong> `app/members/MembersPageClient.tsx`
        </li>
      </ul>

      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Comments System</h4>
      <h5 className="text-lg font-semibold text-gray-900 mt-4 mb-2">Overview</h5>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>
          <strong>Database:</strong> Comments table with relationships to profiles, RLS policies, indexes, and triggers
          for timestamps.
        </li>
        <li>
          <strong>Admin Management:</strong> `/admin/comments` page with full CRUD, moderation tools, and summary
          dashboard.
        </li>
        <li>
          <strong>Public Component:</strong> `CommentsSection` component for any page, with authentication required for
          posting.
        </li>
        <li>
          <strong>API Endpoints:</strong> `/api/comments` for fetching and creating comments, with proper authentication
          and validation.
        </li>
      </ul>
      <h5 className="text-lg font-semibold text-gray-900 mt-4 mb-2">Key Features</h5>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li>
          <strong>For Members:</strong>
          <ul className="list-disc list-inside ml-8 mt-2">
            <li>Post comments (authenticated users only)</li>
            <li>View approved comments with user avatars</li>
            <li>Click avatars to visit user profiles</li>
            <li>Real-time character counter and validation</li>
          </ul>
        </li>
        <li>
          <strong>For Admins:</strong>
          <ul className="list-disc list-inside ml-8 mt-2">
            <li>View all comments (approved, flagged, pending)</li>
            <li>Approve/flag/edit/delete comments</li>
            <li>Summary statistics dashboard</li>
            <li>User profile links for easy navigation</li>
          </ul>
        </li>
        <li>
          <strong>Security & Performance:</strong>
          <ul className="list-disc list-inside ml-8 mt-2">
            <li>Row-Level Security (RLS) policies</li>
            <li>Proper database indexes</li>
            <li>Input validation and sanitization</li>
            <li>Rate limiting considerations</li>
            <li>Optimized queries with joins</li>
          </ul>
        </li>
      </ul>
      <h5 className="text-lg font-semibold text-gray-900 mt-4 mb-2">Usage Example</h5>
      <p>To add comments to any page:</p>
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4">
        <code className="language-tsx">
          {`import CommentsSection from '@/components/CommentsSection'

<CommentsSection
  title="Your Title"
  description="Your description"
/>`}
        </code>
      </pre>
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Admin Access</h4>
      <p>
        Admin access is determined by the `role` column in the `profiles` table. Membership is determined by the
        'membership_type' column in the 'profiles' table.
      </p>
      <p>The `is_admin()` function is used in RLS policies to check for admin privileges.</p>
    </>
  ),
}

export function ReadmeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [showFullContent, setShowFullContent] = useState(false)

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Read Me</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            An in-depth look at the Fluxedita platform, its features, and architecture.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showFullContent ? (
            <motion.div
              key="highlights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            >
              {introHighlights.map((item, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.08)" }}
                >
                  <Card className="h-full flex flex-col items-center text-center p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardHeader className="pb-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                      >
                        <item.icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="full-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-12"
            >
              {readmeContent.overview} {/* Include overview in full content as well */}
              {readmeContent.full}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => setShowFullContent(!showFullContent)}
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            {showFullContent ? (
              <>
                Show Less <ArrowUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Show More <ArrowDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  )
}
