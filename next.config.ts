import type { NextConfig } from "next";
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
};

module.exports = nextConfig;


export default nextConfig;
