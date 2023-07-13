"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { useHotkeys } from "@/hooks/use-hotkeys"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Title } from "../ui/title"
import { ProfileAvatar } from "./profile-avatar"

let commandTabs: { title: string; value: string }[] = [
  { title: "Desks", value: "browse/desks" },
  { title: "Rooms", value: "browse/rooms" },
  { title: "Floors", value: "browse/floors" },
]
export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(siteConfig.mainNav[0].href)
  const [hoveredTab, setHoveredTab] = useState<string | null>(
    siteConfig.mainNav[0].href
  )

  const [activeCommandTab, setActiveCommandTab] = useState(commandTabs[0].value)
  const [hoveredCommandTab, setHoveredCommandTab] = useState<string | null>(
    null
  )

  useHotkeys([["mod+k", () => setOpen((open) => !open)]])

  return (
    <>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        dialogContentModifier="top-2 translate-y-0"
      >
        <motion.header
          onHoverEnd={() => setHoveredCommandTab(null)}
          className="flex border-b p-3"
        >
          {commandTabs.map(({ title, value }) => (
            <div
              onClick={() => setActiveCommandTab(value)}
              key={value}
              className={cn(
                "relative px-2 py-1 text-base font-semibold text-muted-foreground/50",
                {
                  "text-foreground": value === activeCommandTab,
                }
              )}
            >
              <motion.div onHoverStart={() => setHoveredCommandTab(value)}>
                {hoveredCommandTab === value && (
                  <motion.div
                    layoutId="commandFiltersHover"
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
            </div>
          ))}
        </motion.header>
        <CommandInput
          className="grow py-3"
          placeholder="Discover the ideal space to grow your business..."
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Popular Companies">
            <CommandItem className="flex gap-4">
              <div className="rounded-md bg-stone-200 p-2 shadow-lg">
                <Icons.google />
              </div>
              <div className="flex flex-col">
                <Title style={{ margin: 0 }} level={6}>
                  Google
                </Title>
                <Label className="text-muted-foreground">
                  <span className="text-blue-500">1024 • </span>
                  Spaces
                </Label>
              </div>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <header className="gutter sticky top-0 z-10 grid grid-cols-3 items-center gap-3 bg-background py-2">
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
        <div className="flex items-center justify-between gap-3 rounded-full border border-input bg-muted-foreground/10 px-4">
          <Search size={14} className="text-muted-foreground/50" />
          <Input
            onFocus={() => setOpen(true)}
            className="grow"
            placeholder="Discover the ideal space to grow your business..."
            variant={"ghost"}
            rounded={"full"}
          />
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
        <div className="flex items-center justify-end gap-3">
          <Button size={"sm"} className="hidden lg:flex" rounded={"full"}>
            Rent your space
          </Button>
          <ProfileAvatar />
        </div>
      </header>
    </>
  )
}
