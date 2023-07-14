import { Suspense } from "react"
import { Loader2, Plus, SlidersHorizontal } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DynamicFiltering } from "@/components/dynamic-filtering"
import { FiltersModal } from "@/components/filters-modal"
import { SiteTypeFilters } from "@/components/site-type-filters"

async function getCounts(type: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/spaces/${type}/count`,
    {
      next: {
        revalidate: 60 * 5,
      },
    }
  )
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default async function Layout({
  children,
  params: { type },
}: {
  children: React.ReactNode
  params: { type: string }
}) {
  const [
    { agileCount, furnishedCount, privateCount },
    types,
    offerings,
    highlights,
    categories,
    amenities,
  ] = await Promise.all([
    await getCounts(type),
    await (async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/types`, {
        next: {
          revalidate: 60 * 30,
        },
      })
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
    <div className="mt-5 flex grow flex-col">
      <SiteTypeFilters
        agile={agileCount}
        furnished={furnishedCount}
        private={privateCount}
        space={type}
      />
      <div className="gutter sticky top-[3.65rem] flex items-center justify-between bg-background/90 py-2 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <DynamicFiltering
            options={offerings}
            identifier="offerings"
            title="Offerings"
          />
          <DynamicFiltering
            options={highlights}
            identifier="highlights"
            title="Highlights"
          />
          <DynamicFiltering
            options={amenities}
            identifier="amenities"
            title="Amenities"
          />
          {/* <div className={buttonVariants({ variant: "ghost", size: "sm" })}>
            <Plus className="text-muted-foreground" size={14} />
            <Input sizing={"sm"} placeholder="Add filter" variant={"ghost"} />
          </div> */}
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
      {children}
    </div>
  )
}
