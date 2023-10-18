"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

type Props = {}
const links = [
  {
    label: "My Details",
    href: "/profile",
  },
  {
    label: "Password",
    href: "/profile/password",
  },
  {
    label: "Billing",
    href: "/profile/billing",
  },
  {
    label: "Notifications",
    href: "/profile/notifications",
  },
]
export const Nav: React.FC<Props> = ({}) => {
  const path = usePathname()
  return (
    <div className="col-span-2 flex flex-col gap-2">
      {links.map((link) => (
        <Link
          className={cn("rounded-xl px-4 py-3 font-normal text-foreground/50", {
            "bg-accent text-foreground font-semibold": path === link.href,
          })}
          key={link.href}
          href={link.href}
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}
