"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Amenity, Category, Highlight, Offering, Type } from "@prisma/client"
import { useQueryClient } from "@tanstack/react-query"
import { CheckIcon, Plus } from "lucide-react"

import { generateUrlWithSafeParams } from "@/lib/generate-url-with-safe-params"
import { cn } from "@/lib/utils"

import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Separator } from "./ui/separator"

type Props = {
  options: { id: string; label: string }[]
  identifier: string
  title: string
}

export const DynamicFiltering: React.FC<Props> = ({
  options,
  identifier,
  title,
}) => {
  const router = useRouter()
  const path = usePathname()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(() => {
    const urlValues = searchParams
      .get(identifier)
      ?.split(",")
      ?.filter((x) => x !== "")
    return new Set(urlValues)
  })

  useEffect(() => {
    if (!open) {
      let params: Record<string, string | string[]> = {}

      searchParams.forEach((value, key) => {
        if (value && key !== identifier) {
          params[key] = value
        }
      })

      if (selected.size > 0) {
        params[identifier] = Array.from(selected) as string[]
      }

      //   if (selected.size === 0 && searchParams.has(identifier)) {
      //     delete params[identifier]
      //   }
      // @ts-ignore
      const newSearchParams = new URLSearchParams(params).toString()

      console.log("newSearchParams::: ", newSearchParams)

      queryClient.clear()
      router.push(
        `${path}${
          newSearchParams && newSearchParams?.length
            ? `?${newSearchParams}`
            : ""
        }`
      )
    }
  }, [open])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <Plus size={12} className="mr-2" />
          {title}
          {selected?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selected.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selected.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selected.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selected.has(option.label))
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
                const isSelected = selected.has(label)

                return (
                  <CommandItem
                    key={id}
                    onSelect={() => {
                      if (isSelected) {
                        const set = new Set(selected)
                        set.delete(label)
                        setSelected(set)
                      } else {
                        const set = new Set(selected)
                        set.add(label)
                        setSelected(set)
                      }
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
                      <CheckIcon className={cn("h-4 w-4")} aria-hidden="true" />
                    </div>
                    <span>{label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => setSelected(new Set())}
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
