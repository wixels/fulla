"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Amenity, Highlight, Offering } from "@prisma/client"
import { useQueryClient } from "@tanstack/react-query"
import { Check, Plus, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

type Props = {
  offerings: Offering[]
  amenities: Amenity[]
  highlights: Highlight[]
}
export const TypeCategoryFilters: React.FC<Props> = ({
  amenities,
  offerings,
  highlights,
}) => {
  const searchParams = useSearchParams()
  const path = usePathname()

  const [selected, setSelected] = useState(() => {
    const map = new Map()
    map.set(
      "amenities",
      new Set(
        searchParams
          .get("amenities")
          ?.split(",")
          ?.filter((x) => x !== "")
      )
    )
    map.set(
      "offerings",
      new Set(
        searchParams
          .get("offerings")
          ?.split(",")
          ?.filter((x) => x !== "")
      )
    )
    map.set(
      "highlights",
      new Set(
        searchParams
          .get("highlights")
          ?.split(",")
          ?.filter((x) => x !== "")
      )
    )

    return map
  })

  const filterables: {
    options: { id: string; label: string }[]
    identifier: string
  }[] = [
    {
      options: offerings,
      identifier: "offerings",
    },
    {
      options: amenities,
      identifier: "amenities",
    },
    {
      options: highlights,
      identifier: "highlights",
    },
  ]

  const hasValues = useMemo(() => {
    return Array.from(selected.values()).some((set) => set.size > 0)
  }, [selected])

  return (
    <div className="flex items-center gap-2">
      {filterables.map(({ identifier, options }) => (
        <FilterDropwdown
          key={identifier}
          options={options}
          identifier={identifier}
          selected={selected}
          setSelected={setSelected}
        />
      ))}
      {hasValues ? (
        <Button
          asChild
          onClick={() => {
            const map = new Map()
            map.set("amenities", new Set())
            map.set("offerings", new Set())
            map.set("highlights", new Set())

            setSelected(map)
          }}
          className="h-8"
          variant="ghost"
          size="sm"
        >
          <Link href={path}>
            Reset
            <X size={12} className="ml-2" />
          </Link>
        </Button>
      ) : null}
    </div>
  )
}

export const FilterDropwdown: React.FC<{
  options: { id: string; label: string }[]
  identifier: string
  selected: Map<string, Set<any>>
  setSelected: React.Dispatch<React.SetStateAction<Map<string, Set<any>>>>
}> = ({ options, identifier, selected, setSelected }) => {
  const [hasOpened, setHasOpened] = useState(false)
  const [open, setOpen] = useState(false)

  const path = usePathname()
  const router = useRouter()
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!open && hasOpened) {
      let params: Record<string, string | string[]> = {}
      searchParams.forEach((value, key) => {
        if (value && key !== identifier) {
          params[key] = value
        }
      })

      if (selected.get(identifier)!.size > 0) {
        params[identifier] = Array.from(selected.get(identifier)!) as string[]
      }
      // @ts-ignore
      const newSearchParams = new URLSearchParams(params).toString()

      queryClient.clear()
      router.push(
        `${path}${
          newSearchParams && newSearchParams?.length
            ? `?${newSearchParams}`
            : ""
        }`
      )
    }
    if (open) {
      setHasOpened(true)
    }
  }, [open, hasOpened])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <Plus size={12} className="mr-2" />
          <span className="capitalize">{identifier}</span>
          {selected.get(identifier)!.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selected.get(identifier)!.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selected.get(identifier)!.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selected.get(identifier)!.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) =>
                      selected.get(identifier)!.has(option.label)
                    )
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.label}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Filter by amenities..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map(({ id, label }) => {
                const isSelected = selected.get(identifier)?.has(label)

                return (
                  <CommandItem
                    key={id}
                    onSelect={() => {
                      if (selected.get(identifier)!.has(label)) {
                        selected.get(identifier)!.delete(label)
                      } else {
                        selected.get(identifier)!.add(label)
                      }
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
                    <span>{label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  const map = new Map()
                  map.set("amenities", new Set())
                  map.set("offerings", new Set())
                  map.set("highlights", new Set())

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
