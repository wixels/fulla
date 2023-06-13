import { Amenity, Listing, Media, Offering, User } from "@/types/payload-types"
import { Separator } from "@/components/ui/separator"
import { Title } from "@/components/ui/title"
import { PublishedListingCard } from "@/components/listing-card/published-listing-card"

import { VoiceMemo } from "./_voice-memo"

async function getListing(id: string) {
  const res = await fetch(
    `http://localhost:3000/api/listings/published/${id}`,
    {
      next: {
        revalidate: 60,
      },
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  const data = await res.json()
  return data
}

export default async function ListingApplication({
  params: { id },
}: {
  params: { id: string }
}) {
  const listing = (await getListing(id)) as Listing & {
    author: User
    featureImage: Media
    offerings: Offering[]
    amenities: Amenity[]
  }
  return (
    <section className="gutter section-bottom section-padding-top flex flex-col items-start gap-10 md:flex-row">
      <div className="flex grow flex-col gap-4 font-semibold">
        <VoiceMemo />
      </div>
      <div
        id="right"
        className="sticky top-7 max-w-screen-sm grow lg:top-28 xl:top-28"
      >
        <PublishedListingCard listing={listing} />
      </div>
    </section>
  )
}
