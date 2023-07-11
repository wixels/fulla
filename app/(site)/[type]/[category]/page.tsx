import { Suspense } from "react"
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config"
import { Prisma, Space } from "@prisma/client"
import { Plus, SlidersHorizontal } from "lucide-react"

import { db } from "@/lib/db"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FiltersModal } from "@/components/filters-modal"

import { SpaceFeed } from "./_space-feed"

export default async function Page({
  params: { category, type },
  searchParams = {},
}: {
  params: { category: string; type: string }
  searchParams?: {
    search?: string
  }
}) {
  const [spaces, types, offerings, highlights, categories, amenities] =
    await Promise.all([
      await (async () => {
        let params = {
          limit: INFINITE_SCROLL_PAGINATION_RESULTS.toString(),
          page: "0",
        }

        Object.keys(searchParams).forEach((key: string) => {
          if (searchParams?.[key as keyof typeof searchParams]) {
            params = {
              ...params,
              [key]: searchParams?.[key as keyof typeof searchParams],
            }
          }
        })
        const urlSearchParams = new URLSearchParams(params).toString()
        const query = `${
          process.env.NEXT_PUBLIC_API_URL
        }/api/spaces/${type}/${category}${
          urlSearchParams && urlSearchParams?.length
            ? `?${urlSearchParams}`
            : ""
        }`

        const res = await fetch(query, {
          next: {
            revalidate: 60,
          },
        })
        const data = await res.json()
        return data as Prisma.SpaceGetPayload<{
          include: { type: true; category: true }
        }>[]
      })(),
      await (async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/types`,
          {
            next: {
              revalidate: 60 * 30,
            },
          }
        )
        return res.json()
      })(),
      await (async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/offerings`,
          {
            next: {
              revalidate: 60 * 30,
            },
          }
        )
        return res.json()
      })(),
      await (async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/highlights`,
          {
            next: {
              revalidate: 60 * 30,
            },
          }
        )
        return res.json()
      })(),
      await (async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
          {
            next: {
              revalidate: 60 * 30,
            },
          }
        )
        return res.json()
      })(),
      await (async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/amenities`,
          {
            next: {
              revalidate: 60 * 30,
            },
          }
        )
        return res.json()
      })(),
    ])

  return (
    <div className="section-bottom flex grow flex-col">
      <div className="gutter sticky top-[3.65rem] flex items-center justify-between bg-background/90 py-2 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <FiltersModal
            types={types}
            offerings={offerings}
            highlights={highlights}
            categories={categories}
            amenities={amenities}
          >
            <Button className="bg-primary/10" size={"sm"} variant={"secondary"}>
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </FiltersModal>
          <div className={buttonVariants({ variant: "ghost", size: "sm" })}>
            <Plus className="text-muted-foreground" size={14} />
            <Input sizing={"sm"} placeholder="Add filter" variant={"ghost"} />
          </div>
        </div>
        <Select defaultValue="Latest">
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Latest">Latest</SelectItem>
            <SelectItem value="Most Popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Suspense fallback="Fetching Spaces">
        <SpaceFeed initial={spaces ?? []} category={category} type={type} />
      </Suspense>
    </div>
  )
}
