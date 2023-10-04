import { Suspense } from "react"
import {
  Check,
  ChevronRight,
  Circle,
  CircleDot,
  DollarSign,
  Loader2,
} from "lucide-react"
import Balancer from "react-wrap-balancer"

import { db } from "@/lib/db"
import { serverClient } from "@/lib/trpc/server"
import { Badge, badgeVariants } from "@/components/ui/badge"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { Await } from "@/components/await"
import { PlaiceholderImage } from "@/components/plaiceholder-image"

import { SpaceActions } from "./_space-actions"

type Props = { params: { id: string } }
const SpacePage: React.FC<Props> = async ({ params: { id } }) => {
  const space = await serverClient.space.published({ id })
  return (
    <div>
      <div className="relative">
        <PlaiceholderImage
          src={space?.featureImageUrl!}
          alt={space?.title! + "feature image"}
          className="aspect-video max-h-[50vh] w-screen overflow-hidden"
        />
        <div className="absolute inset-x-0 bottom-0 z-10 h-3/4 bg-gradient-to-t from-background to-transparent"></div>
      </div>
      <div className="gutter relative z-10 mx-auto -mt-16 flex max-w-screen-xl flex-col">
        <div className="flex gap-4">
          <div className="w-2/3 grow">
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
              <ul className="flex w-full flex-wrap gap-2 lg:w-1/2">
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
              <SpaceActions />
            </div>
          </div>
          <StatCard
            category={space?.category?.key!}
            type={space?.type?.key!}
            price={space?.price!}
          />
        </div>
      </div>
    </div>
  )
}
export default SpacePage

type StatCarProps = {
  category: string
  type: string
  price: number
}
export const StatCard: React.FC<StatCarProps> = async ({
  category,
  price,
  type,
}) => {
  return (
    <ul className="flex h-fit w-1/3 flex-col gap-6 rounded-xl border border-border bg-background/20 p-5 backdrop-blur-md">
      <li className="flex flex-col gap-1">
        <Circle className="h-4 w-4" />
        <Paragraph size={"xs"} className="text-muted-foreground">
          Category
        </Paragraph>
        <Paragraph
          size="sm"
          className="flex cursor-pointer items-center gap-2 transition-all hover:underline"
        >
          {category}{" "}
          <Suspense fallback={<Loader2 className="h-3 w-3 animate-spin" />}>
            <Await
              promise={db.space.count({
                where: {
                  category: {
                    key: {
                      equals: category,
                    },
                  },
                },
              })}
            >
              {(count) => (
                <>
                  (+{count} Similar) <ChevronRight className="h-3 w-3" />
                </>
              )}
            </Await>
          </Suspense>
        </Paragraph>
      </li>
      <li className="flex flex-col gap-1">
        <CircleDot className="h-4 w-4" />
        <Paragraph size={"xs"} className="text-muted-foreground">
          Type
        </Paragraph>
        <Paragraph
          size="sm"
          className="flex cursor-pointer items-center gap-2 transition-all hover:underline"
        >
          {type}{" "}
          <Suspense fallback={<Loader2 className="h-3 w-3 animate-spin" />}>
            <Await
              promise={db.space.count({
                where: {
                  type: {
                    key: {
                      equals: type,
                    },
                  },
                },
              })}
            >
              {(count) => (
                <>
                  (+{count} Similar) <ChevronRight className="h-3 w-3" />
                </>
              )}
            </Await>
          </Suspense>
        </Paragraph>
      </li>
      <li className="flex flex-col gap-1">
        <DollarSign className="h-4 w-4" />
        <Paragraph size={"xs"} className="text-muted-foreground">
          Price
        </Paragraph>
        <Paragraph
          size="sm"
          className="flex cursor-pointer items-center gap-2 transition-all hover:underline"
        >
          {new Intl.NumberFormat().format(price || 0)} / month{" "}
          <Suspense fallback={<Loader2 className="h-3 w-3 animate-spin" />}>
            <Await
              promise={db.space.count({
                where: {
                  OR: [
                    {
                      price: {
                        lte: price + (price * 10) / 100,
                        gte: price - (price * 10) / 100,
                      },
                    },
                  ],
                },
              })}
            >
              {(count) => (
                <>
                  (+{count} at this rate) <ChevronRight className="h-3 w-3" />
                </>
              )}
            </Await>
          </Suspense>
        </Paragraph>
      </li>
    </ul>
  )
}
