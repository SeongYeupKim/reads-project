/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Explicit for Vercel: avoid wrong Output Directory
  distDir: ".next",
};

module.exports = nextConfig;
