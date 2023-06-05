"use client"

import React, { useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Listing } from "@/types/payload-types"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { ListingFooter } from "@/components/listing-footer"
import { Spin } from "@/components/spin"

type Props = {
  update: (payload: { description: string }) => Promise<void>
  listing: Listing
}

const FormSchema = z.object({
  description: z
    .string()
    .min(25, {
      message: "Description must be at least 25 characters.",
    })
    .max(100, {
      message: "Description must not be longer than 100 characters.",
    }),
})
export const DescriptionForm: React.FC<Props> = ({ update, listing }) => {
  const [pending, startTransition] = useTransition()
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "all",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: listing.description ?? "",
    },
  })

  function onSubmit(values: z.infer<typeof FormSchema>) {
    if (listing.description === values.description) {
      router.push(`/listings/create/${listing.id}/price`)
    } else {
      // @ts-ignore
      startTransition(async () => await update(values))
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-8 grid w-full gap-1.5"
      >
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormControl>
                <Textarea
                  placeholder="Have fun with the whole family at this stylish place."
                  rows={10}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ListingFooter progress={22}>
          <Link
            href={`/listings/create/${listing.id}/highlights`}
            className={buttonVariants({ variant: "link" })}
          >
            Back
          </Link>
          <Button type="submit">{pending ? <Spin /> : "Next"}</Button>
        </ListingFooter>
      </form>
    </Form>
  )
}
