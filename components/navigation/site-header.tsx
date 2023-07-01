"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useTransform } from "framer-motion"
import { CreditCard, LogOut, PlusCircle, Settings, User } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { useBoundedScroll } from "@/hooks/use-bounded-scroll"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { ProfileAvatar } from "./profile-avatar"

export function SiteHeader() {
  let [activeTab, setActiveTab] = useState(siteConfig.mainNav[0].href)
  const [hoveredTab, setHoveredTab] = useState<string | null>(
    siteConfig.mainNav[0].href
  )
  const path = usePathname()

  let { scrollYBoundedProgress } = useBoundedScroll(400)
  let scrollYBoundedProgressThrottled = useTransform(
    scrollYBoundedProgress,
    [0, 0.75, 1],
    [0, 0, 1]
  )

  const hideMe = useMemo(() => {
    if (path?.includes("/listings/create")) return true
    if (path?.includes("/application/type")) return true
    if (path?.includes("/login")) return true
    if (path?.includes("/register")) return true
    return false
  }, [path])

  return (
    <motion.header
      style={{
        display: hideMe ? "none" : "flex",
        height: useTransform(scrollYBoundedProgressThrottled, [0, 1], [80, 50]),
      }}
      className="gutter fixed top-0 z-40 flex w-full items-center space-x-4 bg-background  shadow backdrop-blur-md sm:justify-between sm:space-x-0"
    >
      <div className="flex items-center gap-4">
        <Link href={"/"}>
          <motion.svg
            style={{
              scale: useTransform(
                scrollYBoundedProgressThrottled,
                [0, 1],
                [1, 0.6]
              ),
            }}
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10"
          >
            <circle cx="12" cy="12" r="10"></circle>
          </motion.svg>
        </Link>
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
                "font-mediu relative rounded-full px-3 py-1.5 text-sm text-white transition hover:text-white/50 focus-visible:outline-2"
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
      <motion.nav
        style={{
          opacity: useTransform(
            scrollYBoundedProgressThrottled,
            [0, 1],
            [1, 0]
          ),
        }}
        className="flex space-x-4 "
      >
        <ProfileAvatar />
      </motion.nav>
    </motion.header>
  )
}
