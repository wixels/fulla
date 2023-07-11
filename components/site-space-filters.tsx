"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

type Props = {}

let tabs: { title: string; href: string }[] = [
  { title: "Desks", href: "desks" },
  { title: "Rooms", href: "rooms" },
  { title: "Floors", href: "floors" },
]
export const SiteSpaceFilters: React.FC<Props> = ({}) => {
  const path = usePathname()
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)

  console.log('path?.split("/")?::: ', path?.split("/")?.[2])

  return (
    <motion.nav
      onHoverEnd={() => setHoveredTab(null)}
      className="gutter mt-8 flex"
    >
      {tabs.map(({ href, title }) => (
        <Link
          href={`browse/${href}/${
            path?.split("/")?.[3] ? path?.split("/")?.[3] : ""
          }`}
          key={href}
          className={cn(
            "relative px-2 py-1 text-3xl font-semibold text-muted-foreground/50",
            {
              "text-foreground": href === path?.split("/")?.[2],
            }
          )}
        >
          <motion.div onHoverStart={() => setHoveredTab(href)}>
            {hoveredTab === href && (
              <motion.div
                layoutId="filtersHover"
                className="absolute inset-0 rounded-md bg-stone-600/10"
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
            <span>{title}</span>
          </motion.div>
        </Link>
      ))}
    </motion.nav>
  )
}
