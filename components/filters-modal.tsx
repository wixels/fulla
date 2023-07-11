"use client"

import React, { useState, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Amenity, Category, Highlight, Offering, Type } from "@prisma/client"
import { useQueryClient } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Form } from "./ui/form"
import { Label } from "./ui/label"
import { Paragraph } from "./ui/paragraph"
import { Title } from "./ui/title"

type Props = {
  children: React.ReactNode
  types: Type[]
  offerings: Offering[]
  highlights: Highlight[]
  categories: Category[]
  amenities: Amenity[]
}

function groupPrices(numbers: number[]) {
  const output: number[][] = []

  for (let i = 0; i <= 50000; i += 2000) {
    const lowerLimit = i
    const upperLimit = i + 2000

    const range = numbers.filter((num) => num >= lowerLimit && num < upperLimit)
    output.push(range)
  }

  const countedOutput = output.map((range) => range.length)

  return {
    output: countedOutput,
    total: countedOutput.reduce((acc, curr) => acc + curr, 0),
  }
}

const formSchema = z.object({
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  desks: z.string().optional(),
  rooms: z.string().optional(),
  bathrooms: z.string().optional(),
  type: z.string().optional(),
})
export const FiltersModal = ({
  children,
  types,
  offerings,
  highlights,
  categories,
  amenities,
}: Props) => {
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()
  const router = useRouter()
  const path = usePathname()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rooms: searchParams.get("rooms") ?? "0",
      desks: searchParams.get("desks") ?? "0",
    },
  })
  const formValues = form.watch()

  function onSubmit(values: z.infer<typeof formSchema>) {
    let params = {}

    Object.keys(values).forEach((key: string) => {
      const value = values?.[key as keyof typeof values]
      if (value && value !== "0") {
        params = {
          ...params,
          [key]: values?.[key as keyof typeof values],
        }
      }
    })
    const searchParams = new URLSearchParams(params).toString()

    startTransition(async () => {
      await queryClient.clear()
      await router.push(
        `${path}${
          searchParams && searchParams?.length ? `?${searchParams}` : ""
        }`
      )
      setOpen(false)
    })
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
          <DialogDescription>
            Tailor your search to find exactly what you need
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Title level={4} style={{ margin: 0 }}>
              Rooms and Desks
            </Title>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: Number(`0.2`),
                duration: 0.95,
                ease: [0.165, 0.84, 0.44, 1],
              }}
              className="flex flex-wrap gap-3"
            >
              <Label className="w-full">Rooms</Label>
              {Array(9)
                .fill(null)
                .map((_, i) => (
                  <label key={`rooms-${i}`} id={`rooms-${i}`}>
                    <input
                      {...form.register("rooms")}
                      value={i}
                      type="radio"
                      className="peer hidden"
                      id={`rooms-${i}`}
                    />
                    <li className="flex cursor-pointer gap-3 rounded-full border bg-background px-6 py-2 transition-all hover:border-zinc-600 hover:shadow peer-checked:bg-primary peer-checked:text-white">
                      <Paragraph size={"sm"}>
                        {i === 0 ? "Any" : i === 8 ? "8+" : i}
                      </Paragraph>
                    </li>
                  </label>
                ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: Number(`0.3`),
                duration: 0.95,
                ease: [0.165, 0.84, 0.44, 1],
              }}
              className="flex flex-wrap gap-3"
            >
              <Label className="w-full">Desks</Label>
              {Array(9)
                .fill(null)
                .map((_, i) => (
                  <label id={`rooms-${i}`} key={`rooms-${i}`}>
                    <input
                      {...form.register("desks")}
                      value={i}
                      type="radio"
                      className="peer hidden"
                      id={`rooms-${i}`}
                    />
                    <li className="flex cursor-pointer gap-3 rounded-full border bg-background px-6 py-2 transition-all hover:border-zinc-600 hover:shadow peer-checked:bg-primary peer-checked:text-white">
                      <Paragraph size={"sm"}>
                        {i === 0 ? "Any" : i === 8 ? "8+" : i}
                      </Paragraph>
                    </li>
                  </label>
                ))}
            </motion.div>
            <DialogFooter className="">
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
