/** @type {import('next').NextConfig} */
import { fileURLToPath } from 'url';
import path from 'path';
import createMDX from '@next/mdx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  eslint: {
    // Enable ESLint during builds
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Enable TypeScript type checking during builds
    ignoreBuildErrors: false,
    // Consider enabling this for stricter type checking
    // tsconfigPath: './tsconfig.json'
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    unoptimized: true,
  },
  // Enable more detailed build output
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  // Configure path aliases
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './'),
    };
    return config;
  },
}

const withMDX = createMDX({
  // Use MDX without automatically injecting the React provider from '@mdx-js/react'.
  // This avoids importing a Context provider in Server Components, which causes
  // "createContext only works in Client Components" errors.
  extension: /\.mdx?$/,
  mdxRs: true,
  options: {
    // Explicitly disable provider import to keep MDX Server Component-compatible
    providerImportSource: undefined,
  },
});

export default withMDX(nextConfig)
