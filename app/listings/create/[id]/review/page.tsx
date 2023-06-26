import { revalidatePath } from "next/cache"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Calendar, Check, Pencil } from "lucide-react"

import { Listing } from "@/types/payload-types"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Button, buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { DraftListingCard } from "@/components/listing-card/draft-listing-card"
import { ListingHeader } from "@/components/listings-header"

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
export default async function ListingPrice({
  params: { id },
}: {
  params: { id: string }
}) {
  const user = await getCurrentUser()

  const listing = await db.listing.findFirstOrThrow({
    where: {
      id: {
        equals: id,
      },
      authorId: {
        equals: user?.id,
      },
    },
  })

  async function publish() {
    "use server"

    await db.listing.update({
      data: {
        status: "published",
      },
      where: {
        id,
      },
    })
    revalidatePath("/")
    redirect("/")
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start lg:justify-center">
      <ListingHeader />
      <section className="mx-auto -mt-11 w-full max-w-5xl">
        <Title style={{ marginBottom: 0 }} showAs={2} className="font-semibold">
          Review your listing
        </Title>
        <Paragraph className="mt-2 text-muted-foreground">
          {
            "Here's what we'll show to potential tenants. Make sure everything looks good."
          }
        </Paragraph>
        <div className="mt-12 flex items-start gap-16">
          <div className="w-full lg:w-1/2">
            <DraftListingCard listing={listing} />
          </div>
          <div className="h-96 w-full lg:w-1/2">
            <Title className="font-semibold" level={4}>
              {"What's next?"}
            </Title>
            <ul className="flex flex-col gap-12">
              <li className="flex items-start gap-4">
                <Check size={36} />
                <div>
                  <Paragraph>Confirm a few details and publish</Paragraph>
                  <Paragraph size={"sm"} className="text-muted-foreground">
                    {
                      "We'll let you know if you need to verify your identity or register with the local government"
                    }
                  </Paragraph>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Calendar size={36} />
                <div>
                  <Paragraph>Setup your calendar</Paragraph>
                  <Paragraph size={"sm"} className="text-muted-foreground">
                    {
                      "Choose when your listing will be available. It will be visible immediately after you publish"
                    }
                  </Paragraph>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Pencil size={36} />
                <div>
                  <Paragraph>Finalize your settings</Paragraph>
                  <Paragraph size={"sm"} className="text-muted-foreground">
                    {
                      "Set maintainence rules, deposit amount, communication preferences, and more."
                    }
                  </Paragraph>
                </div>
              </li>
              <form action={publish}>
                <Button className="w-full">Complete Listing</Button>
              </form>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
