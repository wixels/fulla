"use client"

import React, { useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Amenity, Listing, Offering } from "@/types/payload-types"
import { compareObjects } from "@/lib/compareObjects"
import { Button, buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { Icons } from "@/components/icons"
import { ListingFooter } from "@/components/listing-footer"
import { Spin } from "@/components/spin"

const formSchema = z.object({
  offerings: z.array(z.string()).nullable(),
  amenities: z.array(z.string()).nullable(),
})

type ExtendedListing = Listing & { offerings: Offering[]; amenities: Amenity[] }

export const OfferingsForm = ({
  update,
  listing,
  offerings,
  amenities,
}: {
  update: (payload: {
    offerings: Offering["id"][] | null
    amenities: Amenity["id"][] | null
  }) => Promise<void>
  listing: ExtendedListing
  offerings: Offering[]
  amenities: Amenity[]
}) => {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      offerings: listing.offerings.map((x) => x.id) || null,
      amenities: listing.amenities.map((x) => x.id) || null,
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (
      compareObjects(
        { offerings: listing.offerings, amenities: listing.amenities },
        data
      )
    ) {
      router.push(`/listings/${listing.id}/media`)
    } else {
      startTransition(async () => await update(data))
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="mb-10 mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {offerings.map(({ id, label }) => (
          <label key={id}>
            <input
              {...form.register("offerings")}
              value={id}
              type="checkbox"
              className="peer hidden"
              id={id}
            />
            <div className="bg-background flex cursor-pointer flex-col gap-2 rounded-lg border p-4 transition-all hover:border-zinc-600 hover:shadow peer-checked:border-blue-600 peer-checked:text-blue-600">
              {/* @ts-ignore */}
              {Icons?.[label]}
              <Paragraph size={"sm"}>{label}</Paragraph>
            </div>
          </label>
        ))}
      </div>

      <Title className="font-semibold" level={6}>
        Do you have any standout amenities?
      </Title>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {amenities.map(({ id, label }) => (
          <label key={id}>
            <input
              {...form.register("amenities")}
              value={id}
              type="checkbox"
              className="peer hidden"
              id={id}
            />
            <div className="bg-background flex cursor-pointer flex-col gap-2 rounded-lg border p-4 transition-all hover:border-zinc-600 hover:shadow peer-checked:border-blue-600 peer-checked:text-blue-600">
              {/* @ts-ignore */}
              {Icons?.[label]}
              <Paragraph size={"sm"}>{label}</Paragraph>
            </div>
          </label>
        ))}
      </div>
      <ListingFooter progress={22}>
        <Link
          href={`/listings/${listing.id}/basics`}
          className={buttonVariants({ variant: "link" })}
        >
          Back
        </Link>
        <Button type="submit">{pending ? <Spin /> : "Next"}</Button>
      </ListingFooter>
    </form>
  )
}
