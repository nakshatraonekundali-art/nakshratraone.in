/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Exclude pages from prerendering to avoid issues with client-only features
  unstable_excludePages: ["/admin/reset-password"],
};

module.exports = nextConfig;
