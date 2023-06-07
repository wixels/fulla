import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"

import { Listing, Media } from "@/types/payload-types"

import { Badge } from "./ui/badge"
import { Paragraph } from "./ui/paragraph"
import { Title } from "./ui/title"

type Props = {
  listing?: Listing & { featureImage: Media }
}

export const ListingCard: React.FC<Props> = ({ listing }) => {
  return (
    <Link href={`/listings/${listing?.id}`} className="w-full grid-cols-1">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <div className="absolute inset-x-0 top-0 z-[1] flex w-full items-center justify-between p-8">
          <Badge
            size={"lg"}
            variant={"border"}
            color={listing?._status === "draft" ? "green" : "blue"}
            style={{ color: "white" }}
          >
            {listing?._status === "draft" ? "New" : ""}
          </Badge>
          <div className="flex cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:text-red-500">
            <Heart size={14} />
          </div>
        </div>
        <Image
          fill
          className="object-cover"
          alt="house primary image"
          src={listing?.featureImage?.url ?? ""}
        />
      </div>
      <div className="mt-4 flex flex-row items-center justify-between gap-10">
        <Title
          className="line-clamp-2 grow"
          style={{ margin: 0 }}
          level={3}
          showAs={5}
        >
          {listing?.title}
        </Title>
        <Badge>R{listing?.price} / month</Badge>
      </div>
      <Paragraph size={"sm"} className="text-muted-foreground">
        {listing?.suburb}, {listing?.province}
      </Paragraph>
    </Link>
  )
}
