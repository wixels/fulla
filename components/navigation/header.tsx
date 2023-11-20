"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { Icons } from "../icons"
import { useNav } from "../providers/nav-provider"
import { ProfileAvatar } from "./profile-avatar"
import { Search } from "./search"

export function Header() {
  const {
    state: { background, blur },
    dispatch,
  } = useNav()
  const { scrollY } = useScroll()
  const path = usePathname()
  const [activeTab, setActiveTab] = useState(path ?? siteConfig.mainNav[0].href)
  const [hoveredTab, setHoveredTab] = useState<string | null>(
    path ?? siteConfig.mainNav[0].href
  )

  const hideMe = useMemo(() => {
    if (path?.includes("/create/space")) return true
    if (path?.includes("/apply")) return true
    return false
  }, [path])

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (path === "/" && latest === 0) {
      dispatch({ type: "field", payload: false, field: "background" })
      dispatch({ type: "field", payload: false, field: "blur" })
    }
    if (latest > 50 && !background) {
      dispatch({ type: "field", payload: true, field: "blur" })
    } else if (latest < 50) {
      dispatch({ type: "field", payload: false, field: "blur" })
    }
  })

  return (
    <header
      className={cn(
        "gutter sticky top-0 z-50 grid grid-cols-3 items-center gap-3 py-2 transition-all",
        {
          hidden: hideMe,
          "bg-background": background,
          "bg-background/10 backdrop-blur": blur,
        }
      )}
    >
      <div className="flex items-center gap-3">
        <Icons.logo className="h-6 w-6" />
        <motion.div
          onHoverEnd={() => setHoveredTab(activeTab)}
          className="hidden space-x-1 lg:flex"
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
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.6,
                    }}
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
      <Search />
      <div className="flex items-center justify-end gap-3">
        <ProfileAvatar />
      </div>
    </header>
  )
}
