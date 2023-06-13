/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
    serverActions: true,
    // serverActions: true,
  },
  images: {
    domains: ["images.unsplash.com", "localhost"],
  },
}

export default nextConfig
