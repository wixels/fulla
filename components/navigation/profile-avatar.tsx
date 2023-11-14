"use client"

import { useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Bookmark,
  LogOut,
  Moon,
  PlusCircle,
  Settings,
  Sun,
  User,
} from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useTheme } from "next-themes"

import { trpc } from "@/lib/trpc/client"
import { useHotkeys } from "@/hooks/use-hotkeys"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Icons } from "@/components/icons"

import { Grid } from "../grid"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

type Props = {}
export const ProfileAvatar: React.FC<Props> = ({}) => {
  const { setTheme, theme } = useTheme()
  const { data: session } = useSession()
  const router = useRouter()

  useHotkeys([["mod+j", () => setTheme(theme === "light" ? "dark" : "light")]])
  const properties = trpc.org.properties.useQuery(
    {
      organizationId: session?.user.organizations?.[0]
        ?.organizationId as string,
    },
    { enabled: !!session }
  )
  const runCommand = useCallback((command: () => unknown) => {
    command()
  }, [])
  return (
    <>
      {!session ? (
        <Link href={"/login"}>
          <Avatar size={"sm"}>
            <AvatarFallback>
              <Icons.user className="h-3 w-3" />
            </AvatarFallback>
          </Avatar>
        </Link>
      ) : (
        <div className="flex items-center gap-4">
          {session.user.organizations && session.user.organizations.length ? (
            <>
              <HoverCard>
                <HoverCardTrigger>
                  <Avatar size={"sm"}>
                    <AvatarImage
                      src={
                        session.user.organizations?.[0].organization.logo
                          ?.fileUrl
                      }
                      alt="Org image"
                    />
                  </Avatar>
                </HoverCardTrigger>
                <HoverCardContent align="end" className="w-screen max-w-lg p-0">
                  <Grid gap={"none"}>
                    <Command className="col-span-6 rounded-r-none border-r ">
                      <CommandInput placeholder="Type a command or search..." />
                      <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Personal Account">
                          <CommandItem
                            onSelect={() =>
                              runCommand(() => router.push("/profile"))
                            }
                            className="flex items-center gap-2"
                          >
                            <Avatar size={"xs"}>
                              <AvatarImage
                                src={session?.user?.image ?? undefined}
                              />
                              <AvatarFallback>
                                {session.user?.name?.[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span>{session.user?.name}</span>
                          </CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Companies">
                          {session.user?.organizations.map((org) => (
                            <CommandItem
                              key={org.id}
                              onSelect={() =>
                                runCommand(() =>
                                  router.push(
                                    "/org/" +
                                      org.organization.id +
                                      "/properties"
                                  )
                                )
                              }
                              className="flex items-center gap-2"
                            >
                              <Avatar size={"xs"}>
                                <AvatarImage
                                  src={org.organization.logo?.fileUrl}
                                />
                                <AvatarFallback>
                                  {org.organization.name?.[0]}
                                </AvatarFallback>
                              </Avatar>
                              <span>{org.organization.name}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                    <Command className="col-span-6">
                      <CommandInput placeholder="Type a command or search..." />
                      <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Properties">
                          {properties.data?.map((prop) => (
                            <CommandItem
                              key={prop.id}
                              onSelect={() =>
                                runCommand(() =>
                                  router.push(
                                    "/org/" +
                                      prop.organization.id +
                                      "/properties/" +
                                      prop.id +
                                      "/overview"
                                  )
                                )
                              }
                              className="flex items-center gap-2"
                            >
                              <Avatar size={"xs"}>
                                <AvatarImage src={prop.logo?.fileUrl} />
                                <AvatarFallback>
                                  {prop.name?.[0]}
                                </AvatarFallback>
                              </Avatar>
                              <span>{prop.name}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Favourites">
                          <CommandItem className="flex items-center gap-2"></CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </Grid>
                </HoverCardContent>
              </HoverCard>

              <div className="h-6 w-0.5 rotate-[-25deg] bg-muted-foreground/20"></div>
            </>
          ) : null}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar size={"sm"}>
                <AvatarImage src={session?.user?.image ?? undefined} />
                <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
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
                <Link href={"/collections"}>
                  <DropdownMenuItem>
                    <Bookmark className="mr-2 h-4 w-4" />
                    <span>Collections</span>
                  </DropdownMenuItem>
                </Link>
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
        </div>
      )}
    </>
  )
}
