// @ts-nocheck
import Link from "next/link"
import { redirect } from "next/navigation"
import { Building, Citrus, Home, Pin, Trees, Users } from "lucide-react"

import { Highlight, Listing } from "@/types/payload-types"
import { buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Textarea } from "@/components/ui/textarea"
import { Title } from "@/components/ui/title"
import { ListingFooter } from "@/components/listing-footer"
import { ListingHeader } from "@/components/listings-header"

import { HighlightForm } from "./_highlight-form"

async function getHighlights() {
  const res = await fetch("http://localhost:8000/api/highlights")
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

export default async function HighlightsPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const [listing, { docs: highlights }] = await Promise.all([
    await getListing(id),
    await getHighlights(),
  ])

  async function update(payload: { offerings: Highlight["id"][] }) {
    "use server"

    await fetch(`http://localhost:8000/api/listings/${id}?draft=true`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    redirect(`/listings/create/${id}/description`)
  }
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start lg:justify-center">
      <ListingHeader />
      <section className="mx-auto -mt-11 w-full max-w-xl">
        <Title style={{ marginBottom: 0 }} showAs={2} className="font-semibold">
          {"Next, let's describe your guesthouse"}
        </Title>
        <Paragraph className="mt-2 text-muted-foreground">
          {
            "Choose up to 2 highlights. We'll use these to get your description started."
          }
        </Paragraph>
        <HighlightForm
          listing={JSON.parse(JSON.stringify(listing))}
          highlights={highlights}
          update={update}
        />
      </section>
    </div>
  )
}
