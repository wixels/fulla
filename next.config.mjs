/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
    serverActions: true,
    // serverActions: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/browse/desks/agile",
        permanent: true,
      },
      {
        source: "/desks/:path*",
        destination: "/browse/desks/agile",
        permanent: true,
      },
    ]
  },
  images: {
    domains: [
      "images.unsplash.com",
      "localhost",
      "uploadthing.com",
      "https:/uploadthing.com",
      "plus.unsplash.com",
    ],
  },
}

export default nextConfig
