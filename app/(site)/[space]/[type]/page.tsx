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

export default async function Page({
  params: { space, type },
}: {
  params: { space: string; type: string }
}) {
  const spaces = await db.space.findMany({
    where: {
      AND: [
        {
          type: {
            key: {
              equals: space,
            },
          },
        },
        {
          category: {
            key: {
              equals: type,
            },
          },
        },
      ],
    },
    include: {
      type: true,
      category: true,
    },
  })
  return (
    <div className="flex grow flex-col">
      <div className="gutter sticky top-14 flex items-center justify-between bg-white/50 py-2 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <FiltersModal>
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
      <div className="gutter grid w-full grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {spaces?.map(({ id, title, category, type }) => (
          <div key={id} className="bg-red-200">
            {title} - {category?.label} - {type?.label}
          </div>
        ))}
      </div>
    </div>
  )
}
