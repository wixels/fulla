import { BarChart, Building, DollarSign, Home, Users } from "lucide-react"

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
  org: [
    {
      title: "Properties",
      href: "/properties",
      icon: <Building className="h-4 w-4" />,
    },
    {
      title: "Spaces",
      href: "/spaces",
      icon: <Home className="h-4 w-4" />,
    },
    {
      title: "Clients",
      href: "/clients",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Sales",
      href: "/sales",
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: <BarChart className="h-4 w-4" />,
    },
  ],
  links: {
    twitter: "https://twitter.com/ItsDaaaaniel",
    github: "https://github.com/shadcn/ui",
    docs: "https://wixels.com",
  },
}
