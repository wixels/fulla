"use client"

import React, { useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Listing, Type } from "@/types/payload-types"
import { toast } from "@/hooks/use-toast"
import { Button, buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Icons } from "@/components/icons"
import { ListingFooter } from "@/components/listing-footer"
import { Spin } from "@/components/spin"

const formSchema = z.object({
  typeId: z.string(),
})
export const TypeForm = ({
  update,
  listing,
  types,
  id,
}: {
  update: (typeId: string) => Promise<void>
  listing: Listing & { type: Type }
  types: Type[]
  id: string
}) => {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      typeId: listing.type?.id ?? "",
    },
  })
  async function onSubmit({ typeId }: z.infer<typeof formSchema>) {
    if (typeId) {
      if (listing.type && typeId === listing.type.id) {
        router.push(`/listings/${listing.id}/address`)
      } else {
        startTransition(async () => await update(typeId))
      }
    } else {
      toast({
        title: "Validation Error",
        variant: "destructive",
        description: "Please select a type",
      })
    }
  }
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-3"
    >
      {types.map((type) => (
        <label key={type.label}>
          <input
            type="radio"
            className="peer hidden"
            id={type.label}
            value={type.id}
            {...form.register("typeId")}
          />
          <div className="bg-background flex cursor-pointer gap-2 rounded-lg border p-6 transition-all hover:border-zinc-600 hover:shadow peer-checked:border-blue-600 peer-checked:text-blue-600">
            <div className="grow">
              <Paragraph>{type.label}</Paragraph>
              <Paragraph className="text-muted-foreground" size={"sm"}>
                {type.description}
              </Paragraph>
            </div>
            {/* @ts-ignore */}
            {Icons?.[type.icon]}
          </div>
        </label>
      ))}
      <ListingFooter progress={22}>
        <Link
          href={`/listings/${id}/category`}
          className={buttonVariants({ variant: "link" })}
        >
          Back
        </Link>
        <Button type="submit">{pending ? <Spin /> : "Next"}</Button>
      </ListingFooter>
    </form>
  )
}
