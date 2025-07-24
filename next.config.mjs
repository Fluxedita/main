/** @type {import('next').NextConfig} */
import { fileURLToPath } from 'url';
import path from 'path';

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

export default nextConfig
