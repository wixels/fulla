"use client"

import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export function SiteHeader() {
  const path = usePathname()
  if (path?.includes("/listings/")) return null
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="gutter flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            <Avatar size={"sm"}>
              <AvatarFallback>
                <Icons.user />
              </AvatarFallback>
            </Avatar>
          </nav>
        </div>
      </div>
    </header>
  )
}