"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useTransform } from "framer-motion"
import {
  CreditCard,
  LogOut,
  Moon,
  PlusCircle,
  Search,
  Settings,
  Sun,
  User,
} from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useTheme } from "next-themes"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { useBoundedScroll } from "@/hooks/use-bounded-scroll"

import { Icons } from "../icons"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Input } from "../ui/input"
import { ProfileAvatar } from "./profile-avatar"

export function SiteHeader() {
  let [activeTab, setActiveTab] = useState(siteConfig.mainNav[0].href)
  const [hoveredTab, setHoveredTab] = useState<string | null>(
    siteConfig.mainNav[0].href
  )

  const { setTheme } = useTheme()

  return (
    <header className="gutter sticky top-0 z-10 grid grid-cols-3 items-center gap-3 bg-background py-2">
      <div className="flex items-center gap-3">
        <Icons.logo className="h-6 w-6" />
        <motion.div
          onHoverEnd={() => setHoveredTab(null)}
          className="flex space-x-1"
        >
          {siteConfig.mainNav.map(({ href, title }) => (
            <Link
              href={href}
              key={href}
              onClick={() => setActiveTab(href)}
              className={cn(
                "relative rounded-full px-3 py-1.5 text-sm font-medium text-white transition hover:text-white/50 focus-visible:outline-2"
              )}
            >
              <motion.div onHoverStart={() => setHoveredTab(href)}>
                {activeTab === href && (
                  <motion.div
                    layoutId="pill"
                    className="absolute inset-0 bg-foreground"
                    style={{
                      borderRadius: 9999,
                    }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {hoveredTab === href && (
                  <motion.div
                    layoutId="hover"
                    className="absolute inset-0 bg-stone-600/10"
                    style={{
                      borderRadius: 9998,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                )}
                <span
                  className={cn("relative z-10 mix-blend-exclusion", {
                    "text-white": activeTab === href,
                  })}
                >
                  {title}
                </span>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
      <div className="flex items-center justify-between gap-3 rounded-full border border-input bg-muted-foreground/10 px-4">
        <Search size={14} className="text-muted-foreground/50" />
        <Input
          className="grow"
          placeholder="Discover the ideal space to grow your business..."
          variant={"ghost"}
          rounded={"full"}
        />
      </div>
      <div className="flex items-center justify-end gap-3">
        <Button rounded={"full"}>Rent your space</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ProfileAvatar />
      </div>
    </header>
  )
}
