import Link from "next/link"

import { cn } from "@/lib/utils"

import { Icons } from "../icons"
import { buttonVariants } from "../ui/button"
import { ProfileAvatar } from "./profile-avatar"
import { Search } from "./search"

type Props = {
  active?: string
}
export const Header: React.FC<Props> = ({ active }) => {
  return (
    <header
      className={cn(
        "gutter sticky top-0 z-10 grid grid-cols-3 items-center gap-3 bg-background py-2"
      )}
    >
      <div className="flex items-center gap-3">
        <Icons.logo className="h-6 w-6" />
        <Link
          href={"/"}
          className={buttonVariants({
            size: "xs",
            rounded: "full",
            variant: active === "/" ? "default" : "ghost",
          })}
        >
          Browse
        </Link>
        <Link
          href={"/collections"}
          className={buttonVariants({
            size: "xs",
            rounded: "full",
            variant: active === "/collections" ? "default" : "ghost",
          })}
        >
          Collections
        </Link>
      </div>
      <Search />
      <div className="flex items-center justify-end gap-3">
        <ProfileAvatar />
      </div>
    </header>
  )
}
