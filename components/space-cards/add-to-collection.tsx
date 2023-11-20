"use client"

import { useState } from "react"
import Link from "next/link"
import { Bookmark, Loader2, PlusCircle } from "lucide-react"

import { trpc } from "@/lib/trpc/client"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

import { Button, buttonVariants } from "../ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Skeleton } from "../ui/skeleton"
import { ToastAction } from "../ui/toast"

type Props = { id: string; className?: string }
export const AddToCollection: React.FC<Props> = ({ id, className }) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [search, setSearch] = useState("")
  const { data: collections, ...collectionsQuery } = trpc.collections.useQuery(
    {},
    { enabled: open }
  )
  const utils = trpc.useContext()
  const { toast } = useToast()
  const addToCollection = trpc.updateCollection.useMutation({
    onMutate: async () => {
      await utils.collection.cancel()
      await utils.collections.cancel()
    },
    onSuccess: () => {
      toast({
        description: "Space saved to collection",
        title: "Success",
        action: (
          <Link href={"/collections/" + value}>
            <ToastAction altText="Go to collection">
              Go to collection
            </ToastAction>
          </Link>
        ),
      })
    },
    onSettled: () => {
      void utils.collection.invalidate()
      void utils.collections.invalidate()
    },
  })
  const { mutateAsync, isLoading } = trpc.createCollection.useMutation({
    onSuccess(data) {
      utils.collection.invalidate()
      utils.collections.invalidate()
    },
    onError() {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem creating a new collection.",
      })
    },
  })
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size={"icon"} rounded={"xl"} className={className}>
          <Bookmark size={12} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="h-52 z-10 p-0">
        <Command>
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder="Search collections..."
            className="h-9"
          />

          <CommandGroup>
            {collectionsQuery.isLoading ? (
              <>
                <Skeleton className="mb-1 h-9 w-full rounded-lg" />
                <Skeleton className="mb-1 h-9 w-full rounded-lg" />
                <Skeleton className="mb-1 h-9 w-full rounded-lg" />
                <Skeleton className="mb-1 h-9 w-full rounded-lg" />
              </>
            ) : (
              <>
                {collections?.map((framework) => (
                  <CommandItem
                    key={framework.id}
                    value={framework.id}
                    onSelect={(currentValue) => {
                      setOpen(false)
                      setValue(currentValue)
                      addToCollection.mutate({
                        id: currentValue,
                        data: {
                          spaces: {
                            connect: {
                              id,
                            },
                          },
                        },
                      })
                    }}
                  >
                    {framework.title}
                  </CommandItem>
                ))}
              </>
            )}
          </CommandGroup>

          {!collectionsQuery.isLoading ? (
            <CommandEmpty
              onClick={async () => {
                const col = await mutateAsync({ title: search })
                setValue(col.id)
                await addToCollection.mutateAsync({
                  id: col.id,
                  data: {
                    spaces: {
                      connect: {
                        id,
                      },
                    },
                  },
                })
                setOpen(false)
              }}
              className="m-1 flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-accent"
            >
              <span className="flex items-center rounded-sm text-sm ">
                <PlusCircle className="mr-2 h-3 w-3" />
                {search}
              </span>
              <span className="text-xs text-muted-foreground/50">
                {isLoading || addToCollection.isLoading ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  "CREATE"
                )}
              </span>
            </CommandEmpty>
          ) : null}
        </Command>
      </PopoverContent>
    </Popover>
  )
}
