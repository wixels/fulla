import Image from "next/image"

import { serverClient } from "@/lib/trpc/server"
import { badgeVariants } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import DragModal from "@/components/drag-modal"

import { ApplicationForm } from "./_application-form"

type Props = {
  params: { id: string }
}
const ApplyPage: React.FC<Props> = async ({ params: { id } }) => {
  const space = await serverClient.space.published({ id })
  const badges = [
    ...(space?.amenities ?? []),
    ...(space?.offerings ?? []),
    ...(space?.highlights ?? []),
  ]

  return (
    <DragModal hideHandle>
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          fill
          src={space?.featureImageUrl!}
          alt={space?.title! + "feature image"}
          className="object-cover"
        />
      </div>
      <div className="px-6 pb-6">
        <Title className="font-semibold" showAs={4}>
          {space?.title} - Application
        </Title>
        <Paragraph size={"xs"} className="mt-4 text-muted-foreground">
          {space?.organization.name} •{" "}
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(space?.createdAt!))}
        </Paragraph>
        <ul className="my-4 flex w-full flex-wrap gap-2 lg:w-3/4">
          {badges.slice(0, 3).map((badge) => (
            <li
              className={badgeVariants({ variant: "secondary" })}
              key={badge.id}
            >
              {badge.label}
            </li>
          ))}
          {badges.length > 3 && (
            <li className={badgeVariants({ variant: "secondary" })}>
              +{badges?.length - 3}
            </li>
          )}
        </ul>
        <ApplicationForm />
        <Title level={6}>Other Spaces from this company</Title>
        <Title level={6}>Similar Spaces</Title>
      </div>
    </DragModal>
  )
}

export default ApplyPage
