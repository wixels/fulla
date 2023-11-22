import "@/styles/globals.css"
import { Metadata } from "next"
import { GeistMono, GeistSans } from "geist/font"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "@/components/providers"
import { TailwindIndicator } from "@/components/tailwind-indicator"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}
export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}

export default async function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <>
      <html
        lang="en"
        suppressHydrationWarning
        className={cn(
          "bg-background font-sans antialiased",
          `${GeistSans.variable} ${GeistMono.variable}`
        )}
      >
        <head />
        <body>
          <Providers>
            {children}
            {modal}
            <Toaster />
            <TailwindIndicator />
          </Providers>
        </body>
      </html>
    </>
  )
}
