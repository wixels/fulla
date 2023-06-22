"use client"

import React, { useTransition } from "react"

import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { Icons } from "@/components/icons"

export const CreateInitialListing = ({
  createListing,
}: {
  createListing: () => Promise<void>
}) => {
  const [pending, startTransition] = useTransition()

  return (
    <div>
      <Title level={5} className="font-semibold">
        Create a new listing
      </Title>
      <button
        onClick={async () => {
          startTransition(async () => await createListing())
        }}
        disabled={pending}
        className="flex w-full cursor-pointer items-center justify-between border-b py-8"
      >
        <div className="flex items-center gap-2">
          <Icons.add />
          <Paragraph className="font-medium">Create a new listing</Paragraph>
        </div>
        {pending ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.arrowRight />
        )}
      </button>
    </div>
  )
}
