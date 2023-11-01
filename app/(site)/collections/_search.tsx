"use client"

import { Search } from "lucide-react"
import { useDebouncedCallback } from "use-debounce"
import * as z from "zod"

import { useTypedQuery } from "@/hooks/use-typed-query"
import { Input } from "@/components/ui/input"

type Props = {}

export const SearchCollections: React.FC<Props> = ({}) => {
  const {
    setQuery,
    data: { q },
    removeByKey,
  } = useTypedQuery(
    z.object({
      q: z.string().optional().nullable(),
    })
  )
  const debouncedUpdates = useDebouncedCallback(async (string) => {
    if (string === "") {
      removeByKey("q")
      return
    }
    setQuery("q", string)
  }, 1000)
  return (
    <div className="flex w-full grow items-center gap-2 rounded-full bg-accent pl-6 sm:w-fit">
      <Search className="h-4 w-4 text-accent-foreground/50" />
      <Input
        defaultValue={q ?? ""}
        onInput={(e) => debouncedUpdates(e.currentTarget.value)}
        variant={"ghost"}
        placeholder="Find Collections"
        rounded={"full"}
      ></Input>
    </div>
  )
}
