"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

type Props = {
  space: string
  agile: number
  furnished: number
  private: number
}

let tabs: { title: string; href: string }[] = [
  { title: "Agile", href: "agile" },
  { title: "Furnished", href: "furnished" },
  { title: "Private", href: "private" },
]
export const SiteTypeFilters: React.FC<Props> = ({ space, ...rest }) => {
  const path = usePathname()
  return (
    <nav className="gutter flex items-center gap-2">
      {tabs?.map(({ title, href }) => (
        <Link
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-1 text-base transition-all",
            {
              "bg-foreground": href === path?.split("/")?.[3],
              "hover:bg-primary/10": href !== path?.split("/")?.[3],
            }
          )}
          key={`/browse/${space}/${href}`}
          href={`/browse/${space}/${href}`}
        >
          <span
            className={cn("font-medium text-primary", {
              "text-primary-foreground": href === path?.split("/")?.[3],
            })}
          >
            {title}
          </span>
          <span
            className={cn("font-medium text-primary", {
              "text-primary-foreground": href === path?.split("/")?.[3],
            })}
          >
            |
          </span>
          <span
            className={cn("text-primary/30", {
              "text-primary-foreground": href === path?.split("/")?.[3],
            })}
          >
            {/* @ts-ignore */}
            {rest?.[href]}
          </span>
        </Link>
      ))}
    </nav>
  )
}
