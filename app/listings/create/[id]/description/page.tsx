import Link from "next/link"
import { redirect } from "next/navigation"

import { Listing } from "@/types/payload-types"
import { openai } from "@/config/openai"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Button, buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Textarea } from "@/components/ui/textarea"
import { Title } from "@/components/ui/title"
import { ListingFooter } from "@/components/listing-footer"
import { ListingHeader } from "@/components/listings-header"
import { Spin } from "@/components/spin"

import { DescriptionForm } from "./_description-form"

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

  async function update(payload: { description: string }) {
    "use server"

    await db.listing.update({
      data: payload,
      where: {
        id,
      },
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
        <DescriptionForm update={update} listing={listing} />
      </section>
    </div>
  )
}
