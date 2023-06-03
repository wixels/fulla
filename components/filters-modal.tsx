"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { buttonVariants } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Input } from "./ui/input"
import {
  Modal,
  ModalAction,
  ModalCancel,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "./ui/modal"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Separator } from "./ui/separator"
import { Title } from "./ui/title"

type Props = {
  children: React.ReactNode
}

const formSchema = z.object({
  minPrice: z.number(),
  maxPrice: z.number(),
  beds: z.number(),
  bedrooms: z.number(),
  bathrooms: z.number(),
  type: z.string(),
})
export const FiltersModal = (props: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <Modal>
      <ModalTrigger asChild>{props.children}</ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Filters</ModalTitle>
          <ModalDescription>
            Tailor your search to find exactly what you need
          </ModalDescription>
        </ModalHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Title level={4}>Price Range</Title>
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="minPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Min Price" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Min Price" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Separator />
            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Bedrooms</FormLabel>
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
            />
            <FormField
              control={form.control}
              name="beds"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Beds</FormLabel>
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
            />
            <FormField
              control={form.control}
              name="bathrooms"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Bathrooms</FormLabel>
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
            />
          </form>
        </Form>
        <ModalFooter>
          <ModalCancel>Cancel</ModalCancel>
          <ModalAction>Continue</ModalAction>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
