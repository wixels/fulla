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
  update: (payload: string) => Promise<void>
  listing: Listing
}

const FormSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters.",
    })
    .max(30, {
      message: "Title must not be longer than 30 characters.",
    }),
})

export const TitleForm: React.FC<Props> = ({ update, listing }) => {
  const [pending, startTransition] = useTransition()
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "all",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: listing.title ?? "",
    },
  })

  function onSubmit(values: z.infer<typeof FormSchema>) {
    if (listing.title === values.title) {
      router.push(`/listings/${listing.id}/highlights`)
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
          name="title"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormControl>
                <Textarea rows={10} className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ListingFooter progress={22}>
          <Link
            href={`/listings/${listing.id}/media`}
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
