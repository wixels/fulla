"use client"

import { useEffect, useState } from "react"
import { Todo } from "@prisma/client"
import { Check, UserPlus } from "lucide-react"

import { trpc } from "@/lib/trpc/client"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
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
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Props = {
  propertyId: string
  todo: Todo
}
export const Assignees: React.FC<Props> = ({ propertyId, todo }) => {
  const { data: people } = trpc.org.propertyPeople.useQuery({ propertyId })
  const identifier = "people"
  const [selected, setSelected] = useState(() => {
    const map = new Map()
    map.set(identifier, new Set())
    return map
  })
  const [open, setOpen] = useState(false)
  const [hasChanged, setHasChanged] = useState(false)
  const utils = trpc.useContext()
  const addAssignee = trpc.org.updatePropertyTodo.useMutation({
    onSuccess: () => {
      console.log("inside onSuccess")
    },
    onSettled: () => {
      void utils.org.propertyTodos.invalidate()
    },
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 border-dashed">
          {selected.get(identifier)!.size > 0 ? (
            <>
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selected.get(identifier)!.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selected.get(identifier)!.size > 1 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selected.get(identifier)!.size} selected
                  </Badge>
                ) : (
                  people
                    ?.filter((propertyPerson) =>
                      selected.get(identifier)!.has(propertyPerson.user.id)
                    )
                    .map((propertyPerson) => (
                      <Badge
                        variant="secondary"
                        key={propertyPerson.id}
                        className="rounded-sm px-1 font-normal"
                      >
                        {propertyPerson.user.name}
                      </Badge>
                    ))
                )}
              </div>
            </>
          ) : (
            <>
              <UserPlus size={12} className="mr-2" />
              <span className="capitalize">None</span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search for people..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {people?.map((propertyPerson) => {
                const isSelected = selected
                  .get(identifier)
                  ?.has(propertyPerson.user.id)

                return (
                  <CommandItem
                    key={propertyPerson.id}
                    onSelect={() => {
                      if (
                        selected.get(identifier)!.has(propertyPerson.user.id)
                      ) {
                        selected.get(identifier)!.delete(propertyPerson.user.id)
                      } else {
                        selected.get(identifier)!.add(propertyPerson.user.id)
                      }
                      setHasChanged(true)
                      setSelected(new Map(selected))
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
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  const map = new Map()
                  map.set(identifier, new Set())

                  setHasChanged(true)
                  setSelected(map)
                }}
                className="justify-center text-center"
              >
                Clear filters
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
