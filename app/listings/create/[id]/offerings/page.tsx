import { redirect } from "next/navigation"

import { Amenity, Listing, Offering } from "@/types/payload-types"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { ListingHeader } from "@/components/listings-header"

import { OfferingsForm } from "./_offerings-form"

export type OfferingsType = Pick<Listing, "offerings" | "amenities">

async function getOfferings() {
  const res = await fetch("http://localhost:8000/api/offerings")
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}
async function getAmenities() {
  const res = await fetch("http://localhost:8000/api/amenities")
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}
async function getListing(id: string): Promise<Listing> {
  const res = await fetch(
    `http://localhost:8000/api/listings/${id}?draft=true`,
    {
      cache: "no-cache",
    }
  )
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default async function OfferingsPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const [listing, { docs: offerings }, { docs: amenities }] = await Promise.all(
    [await getListing(id), await getOfferings(), await getAmenities()]
  )

  async function update(payload: {
    offerings: Offering["id"][] | null
    amenities: Amenity["id"][] | null
  }) {
    "use server"

    await fetch(`http://localhost:8000/api/listings/${id}?draft=true`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    redirect(`/listings/create/${id}/media`)
  }
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start">
      <ListingHeader />
      <section className="mx-auto mt-28 w-full max-w-xl pb-32">
        <Title showAs={2} className="font-semibold">
          Tell guests what your place has to offer
        </Title>
        <Paragraph className="text-muted-foreground">
          You can add more amenities after you publish your listing.
        </Paragraph>
        <OfferingsForm
          offerings={offerings}
          amenities={amenities}
          update={update}
          listing={JSON.parse(JSON.stringify(listing))}
        />
      </section>
    </div>
  )
}
