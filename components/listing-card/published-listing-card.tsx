"use server"

import React from "react"
import Image from "next/image"
import Link from "next/link"

import { Favourite, Listing, Media } from "@/types/payload-types"

import { Badge } from "../ui/badge"
import { Paragraph } from "../ui/paragraph"
import { Title } from "../ui/title"
import { HandleFavouriteButton } from "./handle-favourite-button"

type Props = {
  listing?: Listing & { featureImage: Media }
  favorite?: Favourite
}
export const PublishedListingCard: React.FC<Props> = ({
  listing,
  favorite,
}) => {
  console.log("favorite from pub listing card::: ", favorite)
  return (
    <Link href={`/listings/${listing?.id}`} className="w-full grid-cols-1">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <div className="absolute inset-x-0 top-0 z-[1] flex w-full items-center justify-between p-8">
          <HandleFavouriteButton listingId={listing?.id!} favorite={favorite} />
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
          className="line-clamp-2 grow font-semibold"
          style={{ margin: 0 }}
          level={3}
          showAs={5}
        >
          {listing?.title}
        </Title>
        <Badge>
          R{new Intl.NumberFormat().format(listing?.price || 0)} / month
        </Badge>
      </div>
      <Paragraph size={"sm"} className="text-muted-foreground">
        {listing?.suburb}, {listing?.province}
      </Paragraph>
    </Link>
  )
}
