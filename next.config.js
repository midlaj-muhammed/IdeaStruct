/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  },
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint during build
  },
  typescript: {
    ignoreBuildErrors: true, // Skip type checking during build
  },
}

module.exports = nextConfig
