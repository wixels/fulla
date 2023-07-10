"use client"

import { useEffect, useRef } from "react"
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config"
import { Space } from "@prisma/client"
import { useInfiniteQuery } from "@tanstack/react-query"

import { useIntersection } from "@/hooks/use-intersection"
import { Icons } from "@/components/icons"

type Props = {
  initial: Space[]
  category: string
  type: string
}
export const SpaceFeed: React.FC<Props> = ({ initial, category, type }) => {
  const lastSpaceRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastSpaceRef.current,
    threshold: 1,
  })

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    [`infinite-space-${type}-${category}`],
    async ({ pageParam = 1 }) => {
      const query = `/api/spaces/${type}/${category}?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}`

      const res = await fetch(query)
      const data = await res.json()
      return data as Space[]
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1
      },
      initialData: { pages: [initial], pageParams: [1] },
    }
  )

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage()
    }
  }, [entry, fetchNextPage])

  const spaces = data?.pages.flatMap((page) => page) ?? initial

  return (
    <>
      <div className="gutter grid w-full grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {spaces?.map(({ id, title }, index) => {
          if (index === spaces.length - 1) {
            return (
              <div key={id} ref={ref} className="aspect-square bg-red-200">
                {title}
              </div>
            )
          } else {
            return (
              <div key={id} className="aspect-square bg-red-200">
                {title}
              </div>
            )
          }
        })}
      </div>
      {isFetchingNextPage && (
        <li className="my-8 flex justify-center">
          <Icons.spinner className="h-6 w-6 animate-spin text-zinc-500" />
        </li>
      )}
    </>
  )
}
