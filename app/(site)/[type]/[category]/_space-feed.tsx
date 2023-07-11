"use client"

import { useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config"
import { Prisma, Space } from "@prisma/client"
import { useInfiniteQuery } from "@tanstack/react-query"

import { useIntersection } from "@/hooks/use-intersection"
import { Icons } from "@/components/icons"

type Props = {
  initial: Prisma.SpaceGetPayload<{
    include: { type: true; category: true }
  }>[]
  category: string
  type: string
}
export const SpaceFeed: React.FC<Props> = ({ initial, category, type }) => {
  const searchParams = useSearchParams()

  const lastSpaceRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastSpaceRef.current,
    threshold: 1,
  })

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    [`infinite-space-${type}-${category}`],
    async ({ pageParam = 1 }) => {
      const obj = {
        limit: INFINITE_SCROLL_PAGINATION_RESULTS.toString(),
        page: pageParam.toString(),
        rooms: searchParams.get("rooms") ? searchParams.get("rooms") : null,
        desks: searchParams.get("desks") ? searchParams.get("desks") : null,
      }

      let params = {}

      Object.keys(obj).forEach((key: string) => {
        if (obj?.[key as keyof typeof obj]) {
          params = {
            ...params,
            [key]: obj?.[key as keyof typeof obj],
          }
        }
      })
      const urlSearchParams = new URLSearchParams(params).toString()

      console.log("urlSearchParams from client::: ", urlSearchParams)

      const query = `/api/spaces/${type}/${category}${
        urlSearchParams && urlSearchParams?.length ? `?${urlSearchParams}` : ""
      }`

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
        {spaces?.map(({ id, title, rooms, desks }, index) => {
          if (index === spaces.length - 1) {
            return (
              <div key={id} ref={ref} className="aspect-square bg-red-200">
                {title} - Rooms: {rooms} - Desks: {desks}
              </div>
            )
          } else {
            return (
              <div key={id} className="aspect-square bg-red-200">
                {title} - Rooms: {rooms} - Desks: {desks}
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