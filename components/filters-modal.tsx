"use client"

import React, { useMemo, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Amenity, Category, Highlight, Offering, Type } from "@prisma/client"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button, buttonVariants } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Paragraph } from "./ui/paragraph"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Separator } from "./ui/separator"
import { Slider } from "./ui/slider"
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
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
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
  const [pending, startTransition] = useTransition()
  const router = useRouter()
  const path = usePathname()
  const searchParams = useSearchParams()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rooms: searchParams.get("rooms") ?? "0",
    },
  })
  const formValues = form.watch()

  console.log("formValues::: ", formValues)
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    startTransition(async () => {
      console.log("values::: ", values)
      await router.push(`${path}?rooms=${values?.rooms}`)
    })
  }
  return (
    <Dialog>
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
                  <label id={`rooms-${i}`}>
                    <input
                      {...form.register("rooms")}
                      value={i}
                      type="radio"
                      className="peer hidden"
                      id={`rooms-${i}`}
                    />
                    <li className="flex cursor-pointer gap-3 rounded-full border bg-background px-6 py-2 transition-all hover:border-zinc-600 hover:shadow peer-checked:border-blue-500 peer-checked:bg-blue-600 peer-checked:text-white">
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
                  <label id={`rooms-${i}`}>
                    <input
                      {...form.register("desks")}
                      value={i}
                      type="radio"
                      className="peer hidden"
                      id={`rooms-${i}`}
                    />
                    <li className="flex cursor-pointer gap-3 rounded-full border bg-background px-6 py-2 transition-all hover:border-zinc-600 hover:shadow peer-checked:border-blue-500 peer-checked:bg-blue-600 peer-checked:text-white">
                      <Paragraph size={"sm"}>
                        {i === 0 ? "Any" : i === 8 ? "8+" : i}
                      </Paragraph>
                    </li>
                  </label>
                ))}
            </motion.div>
            {/* <FormField
              control={form.control}
              name="rooms"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Rooms</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} className="flex">
                      <FormItem
                        className={buttonVariants({
                          variant: "secondary",
                          className: "gap-2",
                        })}
                      >
                        <FormControl>
                          <RadioGroupItem value="all" />
                        </FormControl>
                        Any
                      </FormItem>
                      <FormItem
                        className={buttonVariants({
                          variant: "outline",
                          className: "gap-2",
                        })}
                      >
                        <FormControl>
                          <RadioGroupItem value="1" />
                        </FormControl>
                        1
                      </FormItem>
                      <FormItem
                        className={buttonVariants({
                          variant: "outline",
                          className: "gap-2",
                        })}
                      >
                        <FormControl>
                          <RadioGroupItem value="2" />
                        </FormControl>
                        2
                      </FormItem>
                      <FormItem
                        className={buttonVariants({
                          variant: "outline",
                          className: "gap-2",
                        })}
                      >
                        <FormControl>
                          <RadioGroupItem value="3" />
                        </FormControl>
                        3
                      </FormItem>
                      <FormItem
                        className={buttonVariants({
                          variant: "outline",
                          className: "gap-2",
                        })}
                      >
                        <FormControl>
                          <RadioGroupItem value="4" />
                        </FormControl>
                        4
                      </FormItem>
                      <FormItem
                        className={buttonVariants({
                          variant: "outline",
                          className: "gap-2",
                        })}
                      >
                        <FormControl>
                          <RadioGroupItem value="5" />
                        </FormControl>
                        5+
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            /> */}
            <DialogFooter className="">
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
