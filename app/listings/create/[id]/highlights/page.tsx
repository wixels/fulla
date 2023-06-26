import { redirect } from "next/navigation"

import { Highlight, Listing } from "@/types/payload-types"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
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
  const [user, highlights] = await Promise.all([
    await getCurrentUser(),
    await (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL!}/api/highlights`,
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
      highlights: true,
    },
  })
  async function update(payload: { highlights: Highlight["id"][] | null }) {
    "use server"

    await db.listing.update({
      data: {
        highlights: {
          connect: payload.highlights
            ? payload.highlights?.map((id: string) => ({ id }))
            : [],
        },
      },
      where: {
        id,
      },
    })
    redirect(`/listings/create/${id}/description`)
  }
  console.log("highlights::: ", highlights)
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
          listing={listing}
          highlights={highlights}
          update={update}
        />
      </section>
    </div>
  )
}
