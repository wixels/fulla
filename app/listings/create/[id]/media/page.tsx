import { useState } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Image } from "@prisma/client"

import { Listing } from "@/types/payload-types"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { ListingFooter } from "@/components/listing-footer"
import { ListingHeader } from "@/components/listings-header"

import { MediaForm } from "./_media-form"

type FileObject = File & { preview: string }

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
    include: {
      images: true,
    },
  })

  async function update(payload: { fileKey: string; fileUrl: string }[]) {
    "use server"
    await db.listing.update({
      where: { id },
      data: {
        featureImageUrl: payload?.[0].fileUrl,
        images: {
          create: payload.map((image) => ({
            fileKey: image.fileKey,
            fileUrl: image.fileUrl,
          })),
        },
      },
    })
    redirect(`/listings/create/${id}/title`)
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start">
      <ListingHeader />
      <section className="mx-auto mt-28 flex w-full max-w-xl flex-col gap-8 pb-32">
        <Title style={{ marginBottom: 0 }} showAs={2} className="font-semibold">
          Add some photos of your guesthouse
        </Title>
        <Paragraph className="text-muted-foreground">
          {
            "You'll need 5 photos to get started. You can add more or make changes later."
          }
        </Paragraph>
        <MediaForm update={update} listing={listing} />
      </section>
    </div>
  )
}
