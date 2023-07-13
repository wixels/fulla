"use client"

import Link from "next/link"
import {
  CreditCard,
  LogOut,
  Moon,
  PlusCircle,
  Settings,
  Sun,
  User,
} from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useTheme } from "next-themes"

import { useHotkeys } from "@/hooks/use-hotkeys"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

type Props = {}
export const ProfileAvatar: React.FC<Props> = ({}) => {
  const { setTheme, theme } = useTheme()
  const { data: session } = useSession()

  useHotkeys([["mod+j", () => setTheme(theme === "light" ? "dark" : "light")]])
  return (
    <>
      {!session ? (
        <Link href={"/login"}>
          <Avatar size={"sm"}>
            <AvatarFallback>
              <Icons.user />
            </AvatarFallback>
          </Avatar>
        </Link>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar size={"sm"}>
              <AvatarImage src={session?.user?.image ?? undefined} />
              <AvatarFallback>
                <Icons.user />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {session.user.name ?? ""}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session.user.email ?? ""}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={"/profile"}>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span>Theme</span>
                <DropdownMenuShortcut>⌘J</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>New Team</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  )
}
