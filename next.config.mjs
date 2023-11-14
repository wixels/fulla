/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    ppr: true,
  },
  async redirects() {
    return [
      {
        source: "/browse/desks/agile",
        destination: "/",
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
