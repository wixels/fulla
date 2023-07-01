export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Fulla",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Community",
      href: "/community",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Create Listing",
      href: "/listings/create/about",
    },
  ],
  links: {
    twitter: "https://twitter.com/ItsDaaaaniel",
    github: "https://github.com/shadcn/ui",
    docs: "https://wixels.com",
  },
}
