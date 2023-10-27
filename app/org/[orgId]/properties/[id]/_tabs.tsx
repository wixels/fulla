"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

type Props = {
  id: string
}

const tabsList = [
  {
    title: "Overview",
    value: "/overview",
  },
  {
    title: "Tasks",
    value: "/tasks",
  },
  // {
  //   title: "Resources",
  //   value: "/resources",
  // },
  {
    title: "Spaces",
    value: "/spaces",
  },
]

export const Tabs: React.FC<Props> = ({ id }) => {
  const [activeTab, setActiveTab] = useState(tabsList[0].value)
  const [hoveredTab, setHoveredTab] = useState<string | null>(tabsList[0].value)
  return (
    <motion.div
      onHoverEnd={() => setHoveredTab(activeTab)}
      className="hidden space-x-1 lg:flex"
    >
      {tabsList.map(({ title, value }) => (
        <Link
          href={"." + value}
          key={value}
          onClick={() => setActiveTab(value)}
          className={cn(
            "relative rounded-full px-3 py-1.5 text-sm font-medium text-white transition hover:text-white/50 focus-visible:outline-2"
          )}
        >
          <motion.div onHoverStart={() => setHoveredTab(value)}>
            {activeTab === value && (
              <motion.div
                layoutId="pill"
                className={buttonVariants({
                  rounded: "lg",
                  size: "xs",
                  className: "absolute inset-0 z-10",
                })}
                transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.6,
                }}
              />
            )}
            {hoveredTab === value && (
              <motion.div
                layoutId="hover"
                className={buttonVariants({
                  rounded: "lg",
                  size: "xs",
                  className: "absolute inset-0",
                  variant: "secondary",
                })}
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
                "text-white": activeTab === value,
              })}
            >
              {title}
            </span>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  )
}
