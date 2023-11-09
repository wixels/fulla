"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Check, Plus, X } from "lucide-react"
import { useDebouncedCallback } from "use-debounce"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { queryStringArray, useTypedQuery } from "@/hooks/use-typed-query"
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

type Filterables = {
  identifier: string
  options: { id: string; label: string; value: string }[]
}[]
type Props = {
  filterables: Filterables
  className?: string
  position?: "center" | "end" | "start"
  zodSchema?: z.ZodSchema
}
export const Filterables: React.FC<Props> = ({
  filterables,
  className,
  position = "start",
  zodSchema,
}) => {
  const schema =
    zodSchema ||
    z.object(
      Object.fromEntries(
        filterables.map(({ identifier }) => [
          identifier,
          queryStringArray.optional().nullable(),
        ])
      )
    )
  // @ts-ignore
  const { data, removeAllQueryParams } = useTypedQuery(schema)
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {filterables.map(({ identifier, options }) => (
        <FilterDropwdown
          key={identifier}
          options={options}
          filterables={filterables}
          identifier={identifier}
          position={position}
          schema={schema}
        />
      ))}
      {Object.keys(data).length > 0 ? (
        <Button
          onClick={() => removeAllQueryParams()}
          className="h-8"
          variant="ghost"
          size="sm"
        >
          Reset
          <X size={12} className="ml-2" />
        </Button>
      ) : null}
    </div>
  )
}

type FilterDropwdownProps<T extends z.ZodSchema> = {
  schema: T
  options: { id: string; label: string }[]
  filterables: Filterables
  identifier: string
  position: "center" | "end" | "start"
}

export function FilterDropwdown<T extends z.ZodSchema>({
  options,
  identifier,
  position,
  schema,
}: FilterDropwdownProps<T>) {
  const {
    data: queryData,
    pushItemToKey,
    removeItemByKeyAndValue,
    removeAllQueryParams,
    // @ts-ignore
  } = useTypedQuery(schema)
  const data = queryData?.[identifier] ?? []
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <Plus size={12} className="mr-2" />
          <span className="capitalize">{identifier}</span>
          {data?.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {data?.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {data?.length > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {data?.length} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => data?.includes(option.label))
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
      <PopoverContent className="w-[200px] p-0" align={position}>
        <Command>
          <CommandInput placeholder={`Filter by ${identifier}...`} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map(({ id, label }) => {
                const isSelected = data?.includes(label)

                return (
                  <CommandItem
                    key={id}
                    onSelect={() => {
                      if (data?.includes(label)) {
                        removeItemByKeyAndValue(identifier, label)
                      } else {
                        pushItemToKey(identifier, label)
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
                      <Check className={cn("h-4 w-4")} aria-hidden="true" />
                    </div>
                    <span className="capitalize">{label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  // removeByKey(identifier)
                  removeAllQueryParams()
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
