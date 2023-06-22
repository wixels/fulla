import { redirect } from "next/navigation"
import { Amenity, Listing, Offering } from "@prisma/client"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { ListingHeader } from "@/components/listings-header"

import { OfferingsForm } from "./_offerings-form"

// import { OfferingsForm } from "./_offerings-form"

export default async function OfferingsPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const [user, offerings, amenities] = await Promise.all([
    await getCurrentUser(),
    await (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL!}/api/offerings`,
        {
          next: {
            revalidate: 120,
          },
        }
      )
      if (!res.ok) {
        throw new Error("Failed to fetch data")
      }

      return res.json()
    })(),
    await (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL!}/api/amenities`,
        {
          next: {
            revalidate: 120,
          },
        }
      )
      if (!res.ok) {
        throw new Error("Failed to fetch data")
      }

      return res.json()
    })(),
  ])

  const listing = await db.listing.findFirstOrThrow({
    where: {
      id: {
        equals: id,
      },
      authorId: {
        equals: user?.id,
      },
    },
    include: {
      amenities: true,
      offerings: true,
    },
  })
  console.log("listing::: ", listing)
  async function update(payload: {
    offerings: Offering["id"][] | null
    amenities: Amenity["id"][] | null
  }) {
    "use server"
    await db.listing.update({
      data: {
        offerings: {
          connect: offerings,
        },
        amenities: {
          connect: amenities,
        },
      },
      where: {
        id,
      },
    })
    redirect(`listings/create/${id}/media`)
  }
  //   const [listing, { docs: offerings }, { docs: amenities }] = await Promise.all(
  //     [await getListing(id), await getOfferings(), await getAmenities()]
  //   )

  //   async function update(payload: {
  //     offerings: Offering["id"][] | null
  //     amenities: Amenity["id"][] | null
  //   }) {
  //     "use server"

  //     await fetch(`http://localhost:8000/api/listings/${id}?draft=true`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     })
  //     redirect(`/listings/create/${id}/media`)
  //   }
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
          listing={listing}
        />
      </section>
    </div>
  )
}
