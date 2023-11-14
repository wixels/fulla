import { Suspense } from "react"

import { serverClient } from "@/lib/trpc/server"
import { Button } from "@/components/ui/button"
import { Title } from "@/components/ui/title"
import { Await } from "@/components/await"
import { FiltersHoverable } from "@/components/space-filters/filters-hoverable"
import { FiltersModal } from "@/components/space-filters/filters-modal"
import { Spin } from "@/components/spin"

export default async function Page({
  searchParams,
}: {
  searchParams: QueryParams
}) {
  return (
    <div className="gutter section">
      <Title className="font-mono font-semibold" level={1} showAs={2}>
        Browse
      </Title>
      <div className="flex items-center gap-5">
        <Suspense
          fallback={
            <Button
              size={"xs"}
              variant={"outline"}
              className="flex items-center gap-2 border-dashed"
            >
              <Spin /> Filters
            </Button>
          }
        >
          <Await
            promise={Promise.all([
              await serverClient.types(),
              await serverClient.amenities(),
              await serverClient.highlights(),
              await serverClient.offerings(),
            ])}
          >
            {([types, amenities, highlights, offerings]) => (
              <FiltersModal
                types={types}
                amenities={amenities}
                highlights={highlights}
                offerings={offerings}
                defaultValues={searchParams}
              />
            )}
          </Await>
        </Suspense>
        <div className="h-5 w-[1px] bg-border"></div>
        <FiltersHoverable />
      </div>
    </div>
  )
}
