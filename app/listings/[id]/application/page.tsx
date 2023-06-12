import { Amenity, Listing, Media, Offering, User } from "@/types/payload-types"
import { Separator } from "@/components/ui/separator"
import { Title } from "@/components/ui/title"
import { PublishedListingCard } from "@/components/listing-card/published-listing-card"

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
        <div className="flex items-center gap-4 ">
          <svg
            className="mt-1 h-8 w-8 rotate-180 cursor-pointer"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.75 6.75L19.25 12L13.75 17.25"
              stroke="#1E2B3A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 12H4.75"
              stroke="#1E2B3A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Title style={{ margin: 0 }} level={1} showAs={2}>
            Confirm and Apply
          </Title>
        </div>
        <Separator className="my-4" />
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
