import { Suspense } from "react"
import Link from "next/link"
import { Building, Home, MapPin, Pin, Table } from "lucide-react"
import Balancer from "react-wrap-balancer"

import { db } from "@/lib/db"
import { serverClient } from "@/lib/trpc/server"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Skeleton } from "@/components/ui/skeleton"
import { Title, titleVariants } from "@/components/ui/title"
import { Await } from "@/components/await"
import { Grid } from "@/components/grid"
import { BrowseSpaceCard } from "@/components/space-cards/browse-space-card"
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
    <>
      <div
        style={{ width: "100vw" }}
        className="card 2xl:aspect-[16:4] relative mt-[-3.7rem] aspect-video w-screen bg-stone-900 md:aspect-[16/5]"
      >
        <div className="card-content gutter flex h-full w-full items-center justify-normal">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center text-center">
            <Title
              className="font-mono font-bold text-white"
              level={2}
              showAs={3}
            >
              <Balancer>Work Smarter, Not Harder – Go Pro!</Balancer>
            </Title>
            <Paragraph className="text-white">
              <Balancer>
                Stand Out, Sign Up. Pro Members Get Noticed First!
              </Balancer>
            </Paragraph>
            <Link
              href={"/profile"}
              className={buttonVariants({ className: "mt-4" })}
            >
              Go Pro!
            </Link>
          </div>
        </div>
      </div>
      <div className="gutter relative">
        <Title className="font-mono font-semibold" level={1} showAs={2}>
          Browse
        </Title>
        <div className="sticky top-[3.6rem] flex items-center gap-5 bg-background/70 backdrop-blur">
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
          <Suspense
            fallback={
              <div className="flex items-center gap-4">
                <Button variant="outline" rounded={"full"} size="xs">
                  <Skeleton className="h-5 w-12" />
                </Button>
                {Array(4)
                  .fill(null)
                  .map((_, i) => (
                    <Button
                      key={Math.floor(Math.random() * 100) + 1}
                      variant="outline"
                      className="flex items-center gap-2"
                      rounded={"full"}
                      size="xs"
                    >
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-5 w-16 rounded-md" />
                    </Button>
                  ))}
              </div>
            }
          >
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
                    <div
                      key={Math.floor(Math.random() * 100) + 1}
                      className="col-span-12 flex w-full flex-col gap-4 lg:col-span-6 2xl:col-span-3"
                    >
                      <Skeleton className="aspect-[16/11] object-cover" />
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
              promise={serverClient.spaces.published({
                ...(searchParams ?? {}),
              })}
            >
              {(spaces) => (
                <>
                  {spaces.length ? (
                    <Grid
                      gap={"xs"}
                      className="mt-1 w-full md:mt-2 lg:mt-4 xl:mt-6"
                    >
                      {spaces.map((space) => (
                        <BrowseSpaceCard key={space.id} space={space} />
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
        <div className="w-full bg-red-200 h-96"></div>
      </div>
    </>
  )
}
