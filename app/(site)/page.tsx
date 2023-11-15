import { Suspense } from "react"

import { db } from "@/lib/db"
import { serverClient } from "@/lib/trpc/server"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Title } from "@/components/ui/title"
import { Await } from "@/components/await"
import { Grid } from "@/components/grid"
import { PublishedSpaceCard } from "@/components/space-cards/published-space-card"
import { FiltersHoverable } from "@/components/space-filters/filters-hoverable"
import { FiltersModal } from "@/components/space-filters/filters-modal"
import { Spin } from "@/components/spin"

import Empty from "./_empty"

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
              />
            )}
          </Await>
        </Suspense>
        <div className="h-5 w-[1px] bg-border"></div>
        <Suspense fallback="fetching orgs">
          <Await promise={serverClient.org.all()}>
            {(orgs) => <FiltersHoverable orgs={orgs} />}
          </Await>
        </Suspense>
      </div>
      <div className="section-bottom flex grow flex-col">
        <Suspense
          key={JSON.stringify(searchParams ?? {})}
          fallback={
            <Grid className="mt-1 w-full md:mt-2 lg:mt-4 xl:mt-6" gap="xs">
              {Array(6)
                .fill(Math.random())
                .map((_, i) => (
                  <div className="col-span-12 flex w-full flex-col gap-4 md:col-span-6 xl:col-span-4 2xl:col-span-3">
                    <Skeleton className="aspect-[16/11] object-cover" />

                    {/* <Skeleton className="w-full h-12" /> */}
                    <div className="flex items-center justify-between gap-x-3">
                      <div className="flex w-full items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="flex w-full flex-col gap-1">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-[100px]" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-9 w-9 rounded-xl" />
                        <Skeleton className="h-9 w-9 rounded-xl" />
                      </div>
                    </div>
                  </div>
                ))}
            </Grid>
          }
        >
          <Await
            promise={serverClient.spaces.published({ ...(searchParams ?? {}) })}
          >
            {(spaces) => (
              <>
                {spaces.length ? (
                  <Grid
                    gap={"xs"}
                    className="mt-1 w-full md:mt-2 lg:mt-4 xl:mt-6"
                  >
                    {spaces.map((space) => (
                      <PublishedSpaceCard key={space.id} space={space} />
                    ))}
                  </Grid>
                ) : (
                  <Empty />
                )}
              </>
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  )
}
