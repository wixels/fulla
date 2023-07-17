import { Suspense } from "react"
import { Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FiltersModal } from "@/components/filters-modal"
import { SiteTypeFilters } from "@/components/site-type-filters"

import { TypeCategoryFilters } from "./_type-category-filters"

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
    offerings,
    highlights,
    amenities,
  ] = await Promise.all([
    await getCounts(type),
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
        <TypeCategoryFilters
          offerings={offerings}
          amenities={amenities}
          highlights={highlights}
        />

        <div className="flex items-center gap-2">
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Select disabled defaultValue="Latest">
                  <SelectTrigger className="h-8 w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Latest">Latest</SelectItem>
                    <SelectItem value="Most Popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </TooltipTrigger>
              <TooltipContent>
                <p>Filter coming soon...</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
          <Suspense>
            {/* <FiltersModal>
              <Button size={"sm"} className="h-8">
                <Filter size={12} />
              </Button>
            </FiltersModal> */}
          </Suspense>
        </div>
      </div>
      {children}
    </div>
  )
}
