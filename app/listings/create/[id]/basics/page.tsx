import { redirect } from "next/navigation"
import { Listing } from "@prisma/client"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Title } from "@/components/ui/title"
import { ListingHeader } from "@/components/listings-header"

import { BasicsForm } from "./_basics-form"

export type BasicsType = Pick<
  Listing,
  "bathroomCount" | "bedCount" | "roomCount" | "guestCount"
>

export default async function TypePage({
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

  async function update(payload: BasicsType) {
    "use server"

    await db.listing.update({
      data: payload,
      where: {
        id,
      },
    })
    redirect(`listings/create/${id}/offerings`)
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start lg:justify-center">
      <ListingHeader />
      <section className="mx-auto -mt-11 flex w-full max-w-xl flex-col gap-8">
        <Title showAs={2} className="font-semibold">
          Share some basics about your place
        </Title>
        <BasicsForm update={update} listing={listing} />
      </section>
    </div>
  )
}
