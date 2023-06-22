import Link from "next/link"
import { redirect } from "next/navigation"
import { Home } from "lucide-react"

import type { Listing } from "@/types/payload-types"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Button } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { ListingHeader } from "@/components/listings-header"

import { CreateInitialListing } from "./_create-initial-listing"

export default async function ListingCreate() {
  const user = await getCurrentUser()
  const listings = await db.listing.findMany({
    where: {
      status: {
        equals: "draft",
      },
      authorId: {
        equals: user?.id,
      },
    },
  })

  async function createListing() {
    "use server"
    const req = await db.listing.create({
      data: {
        authorId: user?.id,
      },
    })
    redirect(`/listings/create/${req.id}/category`)
  }

  return (
    <div className="relative">
      <ListingHeader />
      <section className="mx-auto mt-48 w-full max-w-lg">
        <Title className="font-semibold">Welcome back, Dan</Title>
        <CreateInitialListing createListing={createListing} />
        {listings?.length ? (
          <>
            <Title
              level={5}
              style={{ marginTop: "3.5rem" }}
              className="font-semibold"
            >
              Finish your listing
            </Title>
            <ul className="flex flex-col gap-6">
              {listings.map((listing) => (
                <li key={listing.id}>
                  <Link
                    href={`/listings/create/${listing?.id}/category`}
                    className="flex items-center gap-6 rounded-lg border p-6 hover:border-zinc-600 hover:bg-stone-100 dark:hover:bg-gray-800"
                  >
                    <Button variant={"secondary"}>
                      <Home size={16} />
                    </Button>
                    <Paragraph className="font-medium">
                      {listing.title ?? "Untitled Listing"}
                    </Paragraph>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </section>
    </div>
  )
}
