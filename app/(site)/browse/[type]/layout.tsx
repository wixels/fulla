import { Suspense } from "react"
import { Loader2, Plus } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SiteTypeFilters } from "@/components/site-type-filters"

import { FiltersModalWrapper } from "./[category]/_filters-modal-wrapper"

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
  const { agileCount, furnishedCount, privateCount } = await getCounts(type)

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
          <Suspense
            fallback={
              <Button size={"sm"} variant={"secondary"} disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Setting up filters
              </Button>
            }
          >
            <FiltersModalWrapper />
          </Suspense>
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
      {children}
    </div>
  )
}
