import Image from "next/image"
import { Listing, Prisma } from "@prisma/client"
import { Bath, BedSingle, Calendar, ChevronRight, Users } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Paragraph } from "@/components/ui/paragraph"
import { Separator } from "@/components/ui/separator"
import { Title } from "@/components/ui/title"
import { SiteFooter } from "@/components/site-footer"

import { ApplicationDate } from "./_appliaction-date"
import ListingAuthor from "./_listing-author"
import { ListingMap } from "./_listing-map"
import ListingReviews from "./_liting-reviews"
import { ListingGallery } from "./listing-gallery"

type ListingWithIncludes = Prisma.ListingGetPayload<{
  include: { offerings: true; amenities: true; author: true; images: true }
}>

async function fetchListing(id: string): Promise<ListingWithIncludes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/api/listings/${id}/published`,
    {
      next: {
        revalidate: 60 * 60,
      },
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json() as Promise<ListingWithIncludes>
}

export default async function ListingPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const listing = await fetchListing(id)
  console.log("listing::: ", listing)
  // const listing = (await getListing(id)) as Listing & {
  //   author: User
  //   featureImage: Media
  //   offerings: Offering[]
  //   amenities: Amenity[]
  // }
  return (
    <div>
      <div className="gutter section-padding-bottom relative flex min-h-screen flex-col flex-wrap gap-16 lg:flex-row">
        <div className="section-top flex w-full flex-col gap-12 lg:w-[40%]">
          <div className="relative flex aspect-video w-full overflow-hidden rounded-lg bg-muted-foreground lg:hidden">
            <Image
              fill
              className="object-cover"
              alt="house primary image"
              src={listing?.featureImageUrl ?? ""}
            />
          </div>
          <header>
            <Title className="font-bold" style={{ margin: 0 }}>
              {listing.title}
            </Title>
            <Paragraph className="mt-4 text-muted-foreground" size={"lg"}>
              {listing.suburb}, {listing.city}, {listing.province}
            </Paragraph>
            <div className="mt-8 flex items-end">
              <Title className="font-semibold" style={{ margin: 0 }} level={4}>
                R{new Intl.NumberFormat().format(listing?.price || 0)}
              </Title>{" "}
              <Paragraph
                className="text-muted-foreground"
                style={{ margin: 0 }}
              >
                {" "}
                / month
              </Paragraph>
            </div>
          </header>
          <ApplicationDate listingId={listing.id} />
          <ul className="flex gap-7">
            <li className="flex flex-col gap-1">
              <Users />
              <Paragraph size="sm" className="font-semibold">
                {listing.guestCount} Guests
              </Paragraph>
            </li>
            <li className="flex flex-col gap-1">
              <BedSingle />
              <Paragraph size="sm" className="font-semibold">
                {listing.bedCount} Beds
              </Paragraph>
            </li>
            <li className="flex flex-col gap-1">
              <Bath />
              <Paragraph size="sm" className="font-semibold">
                {listing.bathroomCount} Bathrooms
              </Paragraph>
            </li>
          </ul>
          <Paragraph className="text-muted-foreground">
            {listing.description}
          </Paragraph>
          <div>
            <Title className="font-semibold" level={6}>
              Offerings & Amenities
            </Title>
            <Separator />
            <ul className="mt-2 grid grid-cols-2">
              {listing.offerings.map(({ id, label }) => (
                <li
                  key={id}
                  className="col-span-1 flex items-center gap-2 py-2 text-sm text-muted-foreground"
                >
                  <ChevronRight size={10} />
                  {label}
                </li>
              ))}
              {listing.amenities.map(({ id, label }) => (
                <li
                  key={id}
                  className="col-span-1 flex items-center gap-2 py-2 text-sm text-muted-foreground"
                >
                  <ChevronRight size={10} />
                  {label}
                </li>
              ))}
            </ul>
          </div>
          {/* <ListingReviews listingId={listing.id} /> */}
        </div>
        <ListingGallery images={listing.images ?? []} />
        {/* <ListingMap />
        <ListingAuthor author={listing.author} /> */}
      </div>
      <SiteFooter />
    </div>
  )
}
