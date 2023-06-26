import { redirect } from "next/navigation"

import { Listing } from "@/types/payload-types"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { ListingHeader } from "@/components/listings-header"

import { TitleForm } from "./_title-form"

export default async function ListingTitle({
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

  async function update(payload: { title: string }) {
    "use server"

    await db.listing.update({
      data: payload,
      where: {
        id,
      },
    })
    redirect(`/listings/create/${id}/highlights`)
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start lg:justify-center">
      <ListingHeader />
      <section className="mx-auto -mt-11 w-full max-w-xl">
        <Title style={{ marginBottom: 0 }} showAs={2} className="font-semibold">
          {"Now, let's give your home a title"}
        </Title>
        <Paragraph className="mt-2 text-muted-foreground">
          Short titles work best. Have fun with it—you can always change it
          later.
        </Paragraph>
        <TitleForm update={update} listing={listing} />
      </section>
    </div>
  )
}
