"use client"

import { useCallback, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Plus, Search as SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useHotkeys } from "@/hooks/use-hotkeys"

import { useNav } from "../providers/nav-provider"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import { Input } from "../ui/input"

type Props = {}
export const Search: React.FC<Props> = ({}) => {
  const { state } = useNav()
  const path = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])
  useHotkeys([["mod+k", () => setOpen((open) => !open)]])
  return (
    <>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        dialogContentModifier="top-2 translate-y-0"
      >
        <CommandInput
          className="grow py-3"
          placeholder="Discover the ideal space to grow your business..."
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/create/space"))}
            >
              <Plus className="mr-2 h-4 w-4" />
              <span>Create A New Space</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => router.push("/browse/desks/agile"))
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              <span>Browse Spaces</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <div
        className={cn(
          "flex items-center justify-between gap-3 rounded-full border border-input bg-background px-4 transition duration-300 ease-in-out",
          {
            "bg-muted-foreground/10": state.background,
          }
        )}
      >
        <SearchIcon size={14} className="text-muted-foreground/50" />
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
    </>
  )
}
