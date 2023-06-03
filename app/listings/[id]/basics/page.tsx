import { redirect } from "next/navigation"

import { Listing } from "@/types/payload-types"
import { Title } from "@/components/ui/title"
import { ListingHeader } from "@/components/listings-header"

import { BasicsForm } from "./_basics-form"

export type BasicsType = Pick<
  Listing,
  "bathroomCount" | "bedCount" | "roomCount" | "guestCount"
>

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

export default async function TypePage({
  params: { id },
}: {
  params: { id: string }
}) {
  const listing = await getListing(id)

  async function update(payload: BasicsType) {
    "use server"

    await fetch(`http://localhost:8000/api/listings/${id}?draft=true`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    redirect(`/listings/${id}/offerings`)
  }
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start lg:justify-center">
      <ListingHeader />
      <section className="mx-auto -mt-11 flex w-full max-w-xl flex-col gap-8">
        <Title showAs={2} className="font-semibold">
          Share some basics about your place
        </Title>
        <BasicsForm
          id={id}
          update={update}
          listing={JSON.parse(JSON.stringify(listing))}
        />
      </section>
    </div>
  )
}
