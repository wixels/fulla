import Image from "next/image"
import Balancer from "react-wrap-balancer"

import { serverClient } from "@/lib/trpc/server"
import { badgeVariants } from "@/components/ui/badge"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { PlaiceholderImage } from "@/components/plaiceholder-image"

import { Gallery } from "./_gallery"
import { SpaceActions } from "./_space-actions"
import { StatCard } from "./_stat-card"

type Props = {
  params: { id: string }
}
const SpacePage: React.FC<Props> = async ({ params: { id } }) => {
  const space = await serverClient.space.published({ id })
  return (
    <div>
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
    </div>
  )
}
export default SpacePage
