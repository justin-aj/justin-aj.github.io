import type { NextConfig } from 'next';

// The studio (rich-text editor + file-writing route handler) only exists in dev.
// Production builds are a static export for GitHub Pages, which cannot serve
// route handlers, so those files are excluded from the build by extension.
const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  ...(isDev ? {} : { output: 'export' as const }),
  pageExtensions: isDev ? ['tsx', 'ts', 'dev.tsx', 'dev.ts'] : ['tsx', 'ts'],
  trailingSlash: true,
  images: { unoptimized: true },
  agentRules: false,
};

export default nextConfig;
