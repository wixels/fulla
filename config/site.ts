export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Fulla",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/browse/desks/agile",
    },
    {
      title: "Collections",
      href: "/collections",
    },
    {
      title: "Blog",
      href: "/blog",
    },
  ],
  links: {
    twitter: "https://twitter.com/ItsDaaaaniel",
    github: "https://github.com/shadcn/ui",
    docs: "https://wixels.com",
  },
}
