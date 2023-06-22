"use client"

import React, { useEffect, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Category, Listing } from "@prisma/client"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { toast } from "@/hooks/use-toast"
import { Button, buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Icons } from "@/components/icons"
import { ListingFooter } from "@/components/listing-footer"
import { Spin } from "@/components/spin"

const formSchema = z.object({
  categoryId: z.string(),
})

export const CategoryForm = ({
  update,
  listing,
  categories,
}: {
  update: (categoryId: string) => Promise<void>
  listing: Listing
  categories: Category[]
}) => {
  const [pending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: listing?.categoryId ?? "",
    },
  })
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = form

  async function onSubmit({ categoryId }: z.infer<typeof formSchema>) {
    if (categoryId) {
      router.prefetch(`/listings/create/${listing.id}/type`)
      categoryId === listing.categoryId
        ? router.push(`/listings/create/${listing.id}/type`)
        : startTransition(async () => await update(categoryId))
    } else {
      toast({ description: "Please select a category" })
    }
  }

  return (
    <form
      className="grid grid-cols-2 gap-4 lg:grid-cols-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      {categories.map(({ label, id }, i) => (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: Number(`0.${i + 1}`),
            duration: 0.95,
            ease: [0.165, 0.84, 0.44, 1],
          }}
          key={label}
        >
          <input
            type="radio"
            className="peer hidden"
            id={label}
            value={id}
            {...register("categoryId")}
          />
          <label
            id="grid-item"
            className="flex cursor-pointer flex-col gap-2 rounded-lg border bg-background p-4 transition-all hover:border-zinc-600 hover:shadow peer-checked:border-blue-600 peer-checked:text-blue-600"
            htmlFor={label}
          >
            {/* @ts-ignore */}
            {Icons?.[label]}
            <Paragraph size={"sm"}>{label}</Paragraph>
          </label>
        </motion.div>
      ))}
      <ListingFooter progress={11}>
        <Link
          href={"/listings/create"}
          className={buttonVariants({ variant: "link" })}
        >
          Back
        </Link>
        <Button
          disabled={
            listing.categoryId ? false : !isDirty || !isValid ? true : false
          }
          type="submit"
        >
          {pending ? <Spin /> : "Next"}
        </Button>
      </ListingFooter>
    </form>
  )
}
