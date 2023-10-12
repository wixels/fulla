"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Drawer } from "vaul"

import { trpc } from "@/lib/trpc/client"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

const tabs = ["details", "people", "integrations"]
type Props = { params: { id: string; slug: string } }
const ManagePageModal: React.FC<Props> = ({ params: { slug, id } }) => {
  const router = useRouter()
  const [open, setOpen] = useState(true)
  const [activeTab, setActiveTab] = useState(tabs[1])
  const [hoveredTab, setHoveredTab] = useState<string | null>(tabs[1])
  const people = trpc.org.people.useQuery({ slug })
  return (
    <Drawer.Root
      shouldScaleBackground
      open={open}
      onOpenChange={(e) => {
        setOpen(e)
        if (!e) {
          setTimeout(() => router.back(), 500)
        }
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-10 bg-black/40" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-10 mx-auto h-full max-h-[96%] w-screen max-w-2xl rounded-t-[10px] bg-background p-4">
          <div className="mx-auto mb-8 h-1 w-12 shrink-0 cursor-grab rounded-full bg-gray-300" />
          <motion.div
            onHoverEnd={() => setHoveredTab(null)}
            className="flex py-3"
          >
            {tabs.map((tab) => (
              <div
                onClick={() => setActiveTab(tab)}
                key={tab}
                className={cn(
                  "relative px-2 py-1 text-base font-semibold text-muted-foreground/50",
                  {
                    "text-foreground": tab === activeTab,
                  }
                )}
              >
                <motion.div onHoverStart={() => setHoveredTab(tab)}>
                  {hoveredTab === tab && (
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
                  <span className="capitalize">{tab}</span>
                </motion.div>
              </div>
            ))}
          </motion.div>
          <Command className="h-fit">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandGroup className="mt-3" heading="Company People">
                {!people.isLoading && !people.isError ? (
                  people.data?.map((person) => (
                    <CommandItem
                      className="flex items-center justify-between gap-4"
                      key={person.id}
                    >
                      <div className="flex items-center gap-2">
                        <Avatar size={"sm"}>
                          <AvatarImage src={person?.image ?? undefined} />
                          <AvatarFallback>{person?.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <span>{person?.name}</span>
                      </div>
                      <Select
                        defaultValue={
                          person?.properties?.find((x) => x?.propertyId === id)
                            ?.role ?? ""
                        }
                      >
                        <SelectTrigger variant={"ghost"} sizing={"sm"}>
                          <SelectValue className="w-fit" placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="owner">Owner</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </CommandItem>
                  ))
                ) : (
                  <ul className="flex flex-col gap-2">
                    <Skeleton className="h-10 w-full rounded" />
                    <Skeleton className="h-10 w-full rounded" />
                    <Skeleton className="h-10 w-full rounded" />
                    <Skeleton className="h-10 w-full rounded" />
                    <Skeleton className="h-10 w-full rounded" />
                  </ul>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
          <Button className="absolute inset-x-4 bottom-4">Save</Button>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default ManagePageModal
