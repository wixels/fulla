import React from "react"

import { Skeleton } from "@/components/ui/skeleton"

export const CategoryLoading = () => {
  return (
    <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {[1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
        <li
          key={i}
          className="flex h-20 cursor-pointer flex-col gap-2 rounded-lg border bg-background p-4 transition-all"
        >
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-full rounded-md" />
        </li>
      ))}
    </ul>
  )
}
