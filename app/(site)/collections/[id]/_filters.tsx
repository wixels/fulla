"use client"

import { ProposalStatus } from "@prisma/client"
import { useDebouncedCallback } from "use-debounce"
import * as z from "zod"

import { queryStringArray, useTypedQuery } from "@/hooks/use-typed-query"
import { Input } from "@/components/ui/input"
import { Filterables } from "@/components/filterables"

type Props = {}
const filterables = [
  {
    identifier: "status",
    options: Object.entries(ProposalStatus).map(([key, value]) => ({
      id: key,
      value: key,
      label: value.replace(/_/g, " "),
    })),
  },
]
export const Filters: React.FC<Props> = ({}) => {
  const schema = z.object({
    q: z.string().optional().nullable(),
    ...Object.fromEntries(
      filterables.map(({ identifier }) => [
        identifier,
        queryStringArray.optional().nullable(),
      ])
    ),
  })
  type SchemaKeys = keyof typeof schema.shape

  type FilterData = {
    [K in SchemaKeys]?: typeof schema.shape[K]["_input"]
  }
  const {
    setQuery,
    data: { q },
    removeByKey,
  } = useTypedQuery(schema)
  const debouncedUpdates = useDebouncedCallback(async (filters: FilterData) => {
    Object.keys(filters).forEach((key) => {
      if (key in schema.shape) {
        const filterValue = filters[key as SchemaKeys]
        if (
          filterValue === null ||
          filterValue === undefined ||
          filterValue === "" ||
          !schema.shape[key as SchemaKeys].safeParse(filterValue).success
        ) {
          removeByKey(key as SchemaKeys)
        } else {
          setQuery(key as SchemaKeys, filterValue)
        }
      }
    })
  }, 1000)
  return (
    <div className="flex items-center gap-2 rounded-xl bg-muted p-4">
      <Input
        defaultValue={q ?? ""}
        onInput={(e) =>
          debouncedUpdates({
            q: e.currentTarget.value,
          })
        }
        placeholder="Search for you a space in your collection..."
        variant="ghost"
        sizing={"sm"}
      />
      <Filterables
        zodSchema={schema}
        position="end"
        filterables={filterables}
      />
    </div>
  )
}
