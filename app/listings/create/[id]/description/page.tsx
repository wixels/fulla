import Link from "next/link"
import { redirect } from "next/navigation"

import { Listing } from "@/types/payload-types"
import { Button, buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Textarea } from "@/components/ui/textarea"
import { Title } from "@/components/ui/title"
import { ListingFooter } from "@/components/listing-footer"
import { ListingHeader } from "@/components/listings-header"
import { Spin } from "@/components/spin"

import { DescriptionForm } from "./_description-form"

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
export default async function ListingTitle({
  params: { id },
}: {
  params: { id: string }
}) {
  const listing = await getListing(id)

  async function update(payload: { description: string }) {
    "use server"

    await fetch(`http://localhost:8000/api/listings/${id}?draft=true`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    redirect(`/listings/create/${id}/price`)
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start lg:justify-center">
      <ListingHeader />
      <section className="mx-auto -mt-11 w-full max-w-xl">
        <Title style={{ marginBottom: 0 }} showAs={2} className="font-semibold">
          Create your description
        </Title>
        <Paragraph className="mt-2 text-muted-foreground">
          Share what makes your place special.
        </Paragraph>
        <DescriptionForm
          update={update}
          listing={JSON.parse(JSON.stringify(listing))}
        />
      </section>
    </div>
  )
}
