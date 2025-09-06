/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // Changed from standalone to not export static HTML for client components
  // output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // No need to exclude pages as we're using dynamic import with ssr: false
  // unstable_excludePages: ["/admin/reset-password", "/admin/reset-password/"],
};

module.exports = nextConfig;
