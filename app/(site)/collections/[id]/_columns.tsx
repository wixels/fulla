"use client"

import Image from "next/image"
import Link from "next/link"
import { Prisma, ProposalStatus } from "@prisma/client"
import { createColumnHelper } from "@tanstack/react-table"

import { serverClient } from "@/lib/trpc/server"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge, badgeVariants } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { PublishedSpaceCard } from "@/components/space-cards/published-space-card"

const helper = createColumnHelper<
  // @ts-ignore
  Awaited<ReturnType<typeof serverClient["spaces.forCollection"]>>
>()

type Space = Prisma.SpaceGetPayload<{
  include: {
    property: true
    proposals: true
    organization: {
      include: {
        logo: true
      }
    }
    highlights: true
    amenities: true
    offerings: true
    type: true
    category: true
    images: true
  }
}>

export const columns = [
  helper.display({
    id: "title",
    header: "Title",
    cell: (props) => {
      const space: Space = props?.row?.original ?? {}
      return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Link
              className="text-blue-400 hover:text-blue-500 hover:underline"
              href={"/spaces/" + space.id}
            >
              {space.title}
            </Link>
          </HoverCardTrigger>
          <HoverCardContent align="start" className="flex flex-col gap-3">
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-lg">
              <Image
                fill
                src={space?.featureImageUrl!}
                alt={space?.title! + "feature image"}
                className="object-cover"
              />
            </div>
            <div className="flex items-center gap-3">
              <Avatar size={"xs"}>
                <AvatarFallback>{space.organization.name[0]}</AvatarFallback>
                <AvatarImage src={space.organization.logo?.fileUrl} />
              </Avatar>
              <div>
                <p className="line-clamp-1 text-sm font-medium transition-all group-hover:underline">
                  {space.title}
                </p>
                <p className="line-clamp-1 text-xs text-muted-foreground">
                  {space.suburb ?? ""}
                  {space.province ? `, ${space.province}` : ""}
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      )
    },
  }),
  helper.display({
    id: "proposal",
    header: "Proposal Status",
    cell: (props) => {
      const space: Space = props?.row?.original ?? {}
      function getVariantForProposalStatus(status: string) {
        switch (status) {
          case ProposalStatus.pending:
            return "blue"
          case ProposalStatus.approved:
            return "green"
          case ProposalStatus.rejected:
            return "red"
          case ProposalStatus.withdrawn:
            return "yellow"
          case ProposalStatus.expired:
            return "indigo"
          case ProposalStatus.canceled:
            return "purple"
          case ProposalStatus.waitlisted:
            return "pink"
          case ProposalStatus.in_progress:
            return "secondary"
          case ProposalStatus.completed:
            return "destructive"
          default:
            return "default"
        }
      }
      if (space.proposals?.length === 0)
        return (
          <Link
            href={`/spaces/${space.id}/apply`}
            className={buttonVariants({ size: "xs" })}
          >
            Apply Now
          </Link>
        )
      return (
        <Badge
          variant={getVariantForProposalStatus(space.proposals?.[0].status)}
          className="capitalize"
        >
          {space.proposals?.[0].status}
        </Badge>
      )
    },
  }),
  helper.display({
    id: "org",
    header: "Organization",
    cell: (props) => {
      const space: Space = props?.row?.original ?? {}
      return (
        <Link
          className="hover:text-blue-500 hover:underline"
          href={"/organizations/" + space.organizationId}
        >
          {space.organization.name}
        </Link>
      )
    },
  }),
  helper.display({
    id: "property",
    header: "Property",
    cell: (props) => {
      const space: Space = props?.row?.original ?? {}
      return (
        <Link
          className="hover:text-blue-500 hover:underline"
          href={"/properties/" + space.propertyId}
        >
          {space.property?.name}
        </Link>
      )
    },
  }),
  helper.display({
    id: "features",
    header: "Features",
    cell: (props) => {
      const space: Space = props?.row?.original ?? {}
      const features = [
        ...(space?.amenities ?? []),
        ...(space?.offerings ?? []),
        ...(space?.highlights ?? []),
      ]
      return (
        <div className="flex items-center gap-1">
          {features.slice(0, 2).map((feature) => (
            <div
              className={badgeVariants({ variant: "secondary" })}
              key={feature.id}
            >
              {feature.label}
            </div>
          ))}
          {features.length > 2 && (
            <div className={badgeVariants({ variant: "secondary" })}>
              +{features?.length - 2}
            </div>
          )}
        </div>
      )
    },
  }),
]
