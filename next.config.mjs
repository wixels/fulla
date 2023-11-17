import withPlaiceholder from "@plaiceholder/next"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    ppr: true,
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

export default withPlaiceholder(nextConfig)
