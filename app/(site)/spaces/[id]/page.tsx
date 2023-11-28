import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, ChevronLeft, Loader2, Paperclip, Pencil } from "lucide-react"
import Balancer from "react-wrap-balancer"

import { db } from "@/lib/db"
import { serverClient } from "@/lib/trpc/server"
import { badgeVariants } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Skeleton } from "@/components/ui/skeleton"
import { Title } from "@/components/ui/title"
import { Await } from "@/components/await"
import { Grid } from "@/components/grid"
import { Icons } from "@/components/icons"
import { PlaiceholderImage } from "@/components/plaiceholder-image"

import { Gallery } from "./_gallery"
import { Reviews } from "./_reviews"
import { SpaceActions } from "./_space-actions"
import { SpaceSkeleton } from "./_space-skeleton"
import { StatCard } from "./_stat-card"

type Props = {
  params: { id: string }
}
const SpacePage: React.FC<Props> = async ({ params: { id } }) => {
  return (
    <>
      <Suspense fallback={<SpaceSkeleton />}>
        <Await promise={serverClient.space.published({ id })}>
          {(space) => (
            <>
              <div className="relative">
                <div className="relative aspect-video max-h-[50vh] w-screen overflow-hidden">
                  <PlaiceholderImage
                    hasParent
                    src={space?.featureImageUrl!}
                    alt={space?.title! + "feature image"}
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 z-10 h-3/4 bg-gradient-to-t from-background to-transparent"></div>
              </div>
              <div className="gutter relative z-10 mx-auto -mt-16 flex max-w-screen-xl flex-col">
                <div className="flex gap-4">
                  <div className="relative w-2/3 grow">
                    <Link
                      href={"/"}
                      style={{ padding: 0 }}
                      className={buttonVariants({
                        variant: "link",
                        className: "flex items-center gap-2 left-0 top-[-1rem]",
                      })}
                    >
                      <ChevronLeft className="h-3 w-3" /> Browse
                    </Link>
                    <Title
                      style={{ margin: 0 }}
                      className="font-semibold"
                      level={1}
                      showAs={2}
                    >
                      <Balancer>{space?.title}</Balancer>
                    </Title>
                    <Paragraph className="mt-4 text-muted-foreground">
                      {space?.organization.name} •{" "}
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(new Date(space?.createdAt!))}
                    </Paragraph>
                    <div className="flex flex-col gap-6">
                      <Paragraph className="mt-8">
                        <Balancer>{space?.description}</Balancer>
                      </Paragraph>
                      <ul className="flex w-full flex-wrap gap-2 lg:w-3/4">
                        {space?.highlights.map((high) => (
                          <li
                            className={badgeVariants({ variant: "secondary" })}
                            key={high.id}
                          >
                            {high.label}
                          </li>
                        ))}
                        {space?.amenities.map((high) => (
                          <li
                            className={badgeVariants({ variant: "secondary" })}
                            key={high.id}
                          >
                            {high.label}
                          </li>
                        ))}
                        {space?.offerings.map((high) => (
                          <li
                            className={badgeVariants({ variant: "secondary" })}
                            key={high.id}
                          >
                            {high.label}
                          </li>
                        ))}
                      </ul>
                      <SpaceActions id={id} />
                    </div>
                  </div>
                  <StatCard
                    category={space?.category?.key!}
                    type={space?.type?.key!}
                    price={space?.price!}
                  />
                </div>
              </div>
              {space?.images && space?.images?.length > 2 ? (
                <Gallery images={space?.images} />
              ) : null}
            </>
          )}
        </Await>
      </Suspense>

      <Suspense
        fallback={
          <ul className="gutter section-bottom mx-auto w-full max-w-screen-xl">
            <Skeleton className="my-6 h-9 w-44 lg:my-7 xl:my-8"></Skeleton>
            <li className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex grow flex-col gap-2">
                  <Skeleton className="h-4 w-1/2 rounded-sm" />
                  <Skeleton className="h-4 w-1/2 rounded-sm" />
                </div>
              </div>
              <Skeleton className="h-4 w-[80%] rounded-sm" />
              <Skeleton className="h-4 w-[80%] rounded-sm" />
            </li>
          </ul>
        }
      >
        <Await promise={serverClient.reviews.reviewForSpace({ spaceId: id })}>
          {(reviews) =>
            reviews.length ? (
              <Reviews id={id} reviews={reviews} />
            ) : (
              <div className="gutter section-bottom mx-auto w-full max-w-screen-xl">
                <div className="gutter relative mt-4 flex w-full flex-col gap-2 overflow-hidden rounded-xl bg-accent py-16">
                  <Title level={2} showAs={4} style={{ margin: 0 }}>
                    This space has no reviews yet.
                  </Title>
                  <Paragraph size={"sm"}>
                    Apply now and be the first to review this space.
                  </Paragraph>
                  <Link
                    href={`/spaces/${id}/apply`}
                    className={buttonVariants({
                      size: "xs",
                      className: "w-fit",
                    })}
                  >
                    <Check className="mr-2 h-3 w-3" />
                    Apply Now
                  </Link>
                  <Paperclip
                    className="absolute right-[25%] top-0 rotate-[-20deg] text-muted-foreground/25"
                    size={300}
                  />
                </div>
              </div>
            )
          }
        </Await>
      </Suspense>
    </>
  )
}
export default SpacePage
