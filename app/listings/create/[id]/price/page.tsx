import Link from "next/link"
import { redirect } from "next/navigation"

import { Listing } from "@/types/payload-types"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Button, buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Textarea } from "@/components/ui/textarea"
import { Title } from "@/components/ui/title"
import { ListingFooter } from "@/components/listing-footer"
import { ListingHeader } from "@/components/listings-header"
import { Spin } from "@/components/spin"

import { PriceForm } from "./_price-form"

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

  async function update(payload: { price: number }) {
    "use server"

    await db.listing.update({
      data: payload,
      where: {
        id,
      },
    })
    redirect(`/listings/create/${id}/review`)
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start lg:justify-center">
      <ListingHeader />
      <section className="mx-auto -mt-11 w-full max-w-xl">
        <Title style={{ marginBottom: 0 }} showAs={2} className="font-semibold">
          Now, set your price
        </Title>
        <Paragraph className="mt-2 text-muted-foreground">
          {"Don't worry, you can change it later"}
        </Paragraph>
        <PriceForm update={update} listing={listing} />
      </section>
    </div>
  )
}
