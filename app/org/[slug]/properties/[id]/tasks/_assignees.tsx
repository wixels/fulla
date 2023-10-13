"use client"

import { useEffect, useState } from "react"
import { Todo } from "@prisma/client"
import { Check, Loader2, UserPlus } from "lucide-react"

import { trpc } from "@/lib/trpc/client"
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
  propertyId: string
  todo: Todo
}
export const Assignees: React.FC<Props> = ({ propertyId, todo }) => {
  const { data: people, isLoading } = trpc.org.propertyPeople.useQuery({
    propertyId,
  })
  const [selected, setSelected] = useState(todo.assignedToId ?? "")
  const [open, setOpen] = useState(false)
  const utils = trpc.useContext()
  const { toast } = useToast()
  const addAssignee = trpc.org.updatePropertyTodo.useMutation({
    onMutate: async () => {
      await utils.org.propertyTodos.cancel()
    },
    onSuccess: () => {
      console.log("inside onSuccess")
      toast({
        description: "Todo updated",
      })
    },
    onSettled: () => {
      void utils.org.propertyTodos.invalidate()
    },
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        {selected ? (
          <Badge
            variant="secondary"
            className="flex gap-2 rounded-sm px-1 font-normal"
          >
            {!isLoading ? (
              <>
                <Avatar size={"xs"}>
                  <AvatarFallback>
                    {
                      people?.find((person) => person.user.id === selected)
                        ?.user.name?.[0]
                    }
                  </AvatarFallback>
                  <AvatarImage
                    src={
                      people?.find((person) => person.user.id === selected)
                        ?.user.image ?? undefined
                    }
                  />
                </Avatar>
                {
                  people?.find((person) => person.user.id === selected)?.user
                    .name
                }
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
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search for people..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {!isLoading ? (
                <>
                  {people?.map((propertyPerson) => {
                    const isSelected = selected === propertyPerson.user.id

                    return (
                      <CommandItem
                        key={propertyPerson.id}
                        onSelect={() => {
                          setSelected(propertyPerson.user.id)
                          addAssignee.mutate({
                            id: todo.id,
                            data: {
                              assignedToId: propertyPerson.user.id,
                            },
                          })
                        }}
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
                  setSelected("")
                  addAssignee.mutate({
                    id: todo.id,
                    data: {
                      assignedToId: null,
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
