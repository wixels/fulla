"use client"

import React, { useTransition } from "react"
import { useRouter } from "next/navigation"

import { Listing } from "@/types/payload-types"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { Icons } from "@/components/icons"
import { Spin } from "@/components/spin"

export const CreateInitialListing = ({
  createListing,
}: {
  createListing: () => Promise<{ message: string; doc: Listing }>
}) => {
  const { replace } = useRouter()
  const [pending, startTransition] = useTransition()

  return (
    <div>
      <Title level={5} className="font-semibold">
        Create a new listing
      </Title>
      <button
        disabled={pending}
        className="flex w-full cursor-pointer items-center justify-between border-b py-8"
      >
        <div
          onClick={async () => {
            startTransition(async () => {
              const listing = await createListing()
              console.log("listing from client post::: ", listing)
              if (listing) {
                replace(`/listings/${listing.doc.id}/category`)
              }
            })
          }}
          className="flex items-center gap-2"
        >
          <Icons.add />
          <Paragraph className="font-medium">Create a new listing</Paragraph>
        </div>
        {pending ? <Spin /> : <Icons.arrowRight />}
      </button>
    </div>
  )
}
