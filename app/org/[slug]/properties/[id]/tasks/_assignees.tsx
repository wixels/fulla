"use client"

import { useEffect, useState } from "react"
import { Check, Loader2, UserPlus } from "lucide-react"

import { trpc } from "@/lib/trpc/client"
import { serverClient } from "@/lib/trpc/server"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
  withoutPortal?: boolean
  // @ts-ignore
  task: Awaited<ReturnType<typeof serverClient["task.task"]>>
}
export const Assignees: React.FC<Props> = ({ withoutPortal = false, task }) => {
  const { data: people, isLoading } = trpc.org.propertyPeople.useQuery({
    propertyId: task?.propertyId as string,
  })
  const identifier = "assigness"
  const [hasChanged, setHasChanged] = useState(false)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(() => {
    const map = new Map()

    map.set(
      identifier,
      new Set(task?.assignees?.map((x: { id: string }) => x.id) ?? [])
    )
    return map
  })
  const utils = trpc.useContext()
  const { toast } = useToast()
  const addAssignee = trpc.task.updateTask.useMutation({
    onMutate: async () => {
      await utils.task.tasks.cancel()
      await utils.task.task.cancel()
    },
    onSuccess: () => {
      toast({
        description: "task updated",
      })
    },
    onSettled: () => {
      void utils.task.tasks.invalidate()
      void utils.task.task.invalidate()
    },
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        {selected.get(identifier).size > 0 ? (
          <Badge
            variant="secondary"
            className="flex gap-2 rounded-sm px-1 font-normal"
          >
            {!isLoading ? (
              <>
                {selected.get(identifier)!.size > 1 ? (
                  <>{selected.get(identifier)!.size} selected</>
                ) : (
                  people
                    ?.filter((propertyPerson) =>
                      selected.get(identifier)!.has(propertyPerson.user.id)
                    )
                    .map((propertyPerson) => propertyPerson.user.name)
                )}
                {/* {
                  people?.find((person) => person.user.id === selected)?.user
                    .name
                } */}
                {addAssignee.isLoading ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : null}
              </>
            ) : (
              <Loader2 className="h-3 w-3 animate-spin" />
            )}
          </Badge>
        ) : (
          <Badge variant="secondary" className="rounded-sm px-1 font-normal">
            <UserPlus size={12} className="mr-2" />
            None
            {addAssignee.isLoading ? (
              <Loader2 className="ml-2 h-3 w-3 animate-spin" />
            ) : null}
          </Badge>
        )}
      </PopoverTrigger>
      <PopoverContent
        withoutPrtal={withoutPortal}
        className="w-[200px] p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder="Search for people..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {!isLoading ? (
                <>
                  {people?.map((propertyPerson) => {
                    // const isSelected = selected === propertyPerson.user.id
                    const isSelected = selected
                      .get(identifier)
                      ?.has(propertyPerson.user.id)

                    return (
                      <CommandItem
                        key={propertyPerson.id}
                        onSelect={() => {
                          if (
                            selected
                              .get(identifier)!
                              .has(propertyPerson.user.id)
                          ) {
                            selected
                              .get(identifier)!
                              .delete(propertyPerson.user.id)
                          } else {
                            selected
                              .get(identifier)!
                              .add(propertyPerson.user.id)
                          }
                          setHasChanged(true)
                          setSelected(new Map(selected))
                          addAssignee.mutate({
                            id: task.id,
                            data: {
                              assignees: {
                                set: Array.from(selected.get(identifier)).map(
                                  (x) => ({ id: x })
                                ),
                              },
                            },
                          })
                        }}
                        // onSelect={() => {
                        //   setSelected(propertyPerson.user.id)
                        //   addAssignee.mutate({
                        //     id: task.id,
                        //     data: {
                        //       assignedToId: propertyPerson.user.id,
                        //     },
                        //   })
                        // }}
                      >
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible"
                          )}
                        >
                          <Check className={cn("h-4 w-4")} aria-hidden="true" />
                        </div>
                        <span>{propertyPerson.user.name}</span>
                      </CommandItem>
                    )
                  })}
                </>
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
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  const map = new Map()
                  map.set(identifier, new Set())

                  setHasChanged(true)
                  setSelected(map)
                  addAssignee.mutate({
                    id: task.id,
                    data: {
                      assignees: {
                        set: [],
                      },
                    },
                  })
                }}
                className="justify-center text-center"
              >
                Clear assignees
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
