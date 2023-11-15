"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleDot, Sliders, X } from "lucide-react"
import { useForm } from "react-hook-form"
import Balancer from "react-wrap-balancer"
import { Drawer } from "vaul"
import * as z from "zod"

import { serverClient } from "@/lib/trpc/server"
import { cn } from "@/lib/utils"
import { spaceQuerySchema } from "@/lib/validations/space"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Paragraph } from "@/components/ui/paragraph"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Title } from "@/components/ui/title"
import { Grid, gridVariants } from "@/components/grid"

type Props = {
  defaultValues?: {}
  types: Awaited<ReturnType<typeof serverClient["types"]>>
  amenities: Awaited<ReturnType<typeof serverClient["amenities"]>>
  highlights: Awaited<ReturnType<typeof serverClient["highlights"]>>
  offerings: Awaited<ReturnType<typeof serverClient["offerings"]>>
}

const FormSchema = spaceQuerySchema.pick({
  type: true,
  price: true,
  rooms: true,
  desks: true,
  floors: true,
  items: true,
  offerings: true,
  highlights: true,
  amenities: true,
})
export const FiltersModal: React.FC<Props> = ({
  defaultValues,
  types,
  amenities,
  highlights,
  offerings,
}) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const [collapsibleOpen, setCollapsibleOpen] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: "",
      price: [1500, 8000],
      rooms: "0",
      desks: "0",
      floors: "0",
      offerings: [],
      highlights: [],
      amenities: [],
      ...defaultValues,
    },
  })

  const watchPrice = form.watch("price")

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const params = new URLSearchParams()
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        if (key === "price") {
          if (value[0] === 1500 && value[1] === 8000) {
          } else {
            for (const item of value) {
              if (item !== "") {
                params.append(key, item.toString())
              }
            }
          }
        } else {
          for (const item of value) {
            if (item !== "") {
              params.append(key, item.toString())
            }
          }
        }
      } else {
        if (value && value !== "" && value !== "0") params.set(key, value)
      }
    }
    setOpen(false)
    const queryString = params.toString()
    router.replace(`/${queryString ? `?${queryString}` : ""}`)
  }
  function onReset() {
    form.reset({
      price: [1500, 8000],
      rooms: "0",
      desks: "0",
      floors: "0",
      offerings: [],
      highlights: [],
      amenities: [],
      type: "",
    })
    setOpen(false)
    router.replace("/")
  }
  const formLabelClassName =
    "flex aspect-square cursor-pointer flex-col justify-between gap-2 rounded-lg border bg-background p-4 transition-all hover:border-zinc-600 hover:shadow peer-aria-checked:border-blue-500 peer-aria-checked:text-blue-600 peer-aria-checked:ring-1 peer-aria-checked:ring-blue-500"

  const numbersFormLabelClassName =
    "inline-flex h-9 px-5 items-center justify-center text-sm rounded-full border border-input hover:bg-accent hover:text-accent-foreground peer-aria-checked:bg-primary peer-aria-checked:text-primary-foreground peer-aria-checked:hover:bg-primary/90"

  const searchParamsEntries = Object.entries(defaultValues ?? {})
  console.log("searchParamsEntries::: ", searchParamsEntries)
  return (
    <Drawer.Root shouldScaleBackground open={open} onOpenChange={setOpen}>
      <div className="flex items-center gap-1">
        <Drawer.Trigger asChild>
          <Button
            size={"xs"}
            variant={"outline"}
            className="flex items-center gap-2 border-dashed"
            onClick={() => setOpen(true)}
          >
            <Sliders className="h-4 w-4" />
            Filters
            {searchParamsEntries.length ? (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                {searchParamsEntries.length < 2 ? (
                  <div className="hidden space-x-2 lg:flex">
                    {searchParamsEntries.map(([key, value]) => (
                      <Badge
                        key={key}
                        className="rounded-sm px-1 font-normal capitalize"
                      >
                        {key}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <Badge className="rounded-sm px-1 font-normal capitalize">
                    {searchParamsEntries.length} Filters
                  </Badge>
                )}
              </>
            ) : null}
          </Button>
        </Drawer.Trigger>
        {searchParamsEntries.length > 0 ? (
          <Button
            onClick={(e) => {
              setOpen(false)
              onReset()
            }}
            className="flex items-center gap-2 border border-dashed border-red-300 hover:bg-destructive/90 hover:text-destructive-foreground"
            variant={"ghost"}
            size="xs"
          >
            Clear
            <X size={12} className="ml-2" />
          </Button>
        ) : null}
      </div>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-10 bg-black/40" />
        <Drawer.Content className="fixed inset-0 z-10 mx-auto flex w-screen max-w-2xl flex-col justify-end">
          <div className="mt-6 h-full overflow-scroll rounded-t-xl bg-background">
            <div className="mx-auto mb-8 mt-2 h-1 w-12 shrink-0 cursor-grab rounded-full bg-gray-300" />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="relative flex w-full flex-col justify-center gap-6 p-6 pb-24"
              >
                <Title
                  style={{ marginBottom: 0 }}
                  showAs={3}
                  className="font-mono font-semibold"
                >
                  Type of place
                </Title>
                <Paragraph size={"sm"} className="text-muted-foreground/50">
                  <Balancer>Search desks, rooms, or entire floors.</Balancer>
                </Paragraph>
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className={gridVariants({ gap: "xs" })}>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          {types.map((opt) => (
                            <FormItem className="col-span-4" key={opt.key}>
                              <FormControl>
                                <RadioGroupItem
                                  className="peer hidden"
                                  value={opt.key!}
                                />
                              </FormControl>
                              <FormLabel className={cn(formLabelClassName)}>
                                <CircleDot />
                                <div>
                                  <Paragraph size="sm">{opt.label}</Paragraph>
                                  <Paragraph
                                    className="text-muted-foreground/50"
                                    size="xs"
                                  >
                                    {opt.description}
                                  </Paragraph>
                                </div>
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Separator />
                <Title
                  style={{ marginBottom: 0 }}
                  showAs={3}
                  className="font-mono font-semibold"
                >
                  Price range
                </Title>
                <Paragraph size={"sm"} className="text-muted-foreground/50">
                  <Balancer>Daily prices before fees and taxes.</Balancer>
                </Paragraph>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormControl>
                        <Slider
                          min={0}
                          max={10000}
                          defaultValue={field.value!}
                          onValueChange={field.onChange}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Spaces between ${watchPrice?.[0]} and ${watchPrice?.[1]}
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <Separator />
                <FormField
                  control={form.control}
                  name="rooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rooms</FormLabel>
                      <FormControl className="mt-2">
                        <RadioGroup
                          className="flex flex-wrap items-center gap-3"
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          {Array(9)
                            .fill(null)
                            .map((_, i) => (
                              <FormItem key={"rooms" + i}>
                                <FormControl>
                                  <RadioGroupItem
                                    className="peer hidden"
                                    value={i.toString()}
                                  />
                                </FormControl>
                                <FormLabel
                                  className={cn(numbersFormLabelClassName)}
                                >
                                  {i === 0 ? "Any" : i === 8 ? "8+" : i}
                                </FormLabel>
                              </FormItem>
                            ))}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="desks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Desks</FormLabel>
                      <FormControl className="mt-2">
                        <RadioGroup
                          className="flex flex-wrap items-center gap-3"
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          {Array(9)
                            .fill(null)
                            .map((_, i) => (
                              <FormItem key={"desks" + i}>
                                <FormControl>
                                  <RadioGroupItem
                                    className="peer hidden"
                                    value={i.toString()}
                                  />
                                </FormControl>
                                <FormLabel
                                  className={cn(numbersFormLabelClassName)}
                                >
                                  {i === 0 ? "Any" : i === 8 ? "8+" : i}
                                </FormLabel>
                              </FormItem>
                            ))}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="floors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Floors</FormLabel>
                      <FormControl className="mt-2">
                        <RadioGroup
                          className="flex flex-wrap items-center gap-3"
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          {Array(9)
                            .fill(null)
                            .map((_, i) => (
                              <FormItem key={"floors" + i}>
                                <FormControl>
                                  <RadioGroupItem
                                    className="peer hidden"
                                    value={i.toString()}
                                  />
                                </FormControl>
                                <FormLabel
                                  className={cn(numbersFormLabelClassName)}
                                >
                                  {i === 0 ? "Any" : i === 8 ? "8+" : i}
                                </FormLabel>
                              </FormItem>
                            ))}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Separator />
                <Title
                  style={{ marginBottom: 0 }}
                  showAs={3}
                  className="font-mono font-semibold"
                >
                  Options
                </Title>
                <Collapsible
                  className="flex flex-col gap-6"
                  open={collapsibleOpen}
                  onOpenChange={setCollapsibleOpen}
                >
                  <FormField
                    control={form.control}
                    name="offerings"
                    render={() => (
                      <FormItem>
                        <FormLabel className="col-span-12">Offerings</FormLabel>
                        <Grid className="mt-2" gap={"xs"}>
                          {offerings &&
                            offerings.map((item) => (
                              <FormField
                                key={item.id}
                                control={form.control}
                                name="offerings"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={item.id}
                                      className="col-span-6 flex items-center gap-2"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(
                                            item.id
                                          )}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([
                                                  ...(field.value ?? []),
                                                  item.id,
                                                ])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== item.id
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal">
                                        {item.label}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                        </Grid>
                      </FormItem>
                    )}
                  />
                  {!collapsibleOpen && (
                    <CollapsibleTrigger asChild>
                      <Button variant={"link"} className="underline">
                        Show More
                      </Button>
                    </CollapsibleTrigger>
                  )}
                  <CollapsibleContent className="flex flex-col gap-6">
                    <FormField
                      control={form.control}
                      name="amenities"
                      render={() => (
                        <FormItem>
                          <FormLabel className="col-span-12">
                            Amenities
                          </FormLabel>
                          <Grid className="mt-2" gap={"xs"}>
                            {amenities &&
                              amenities.map((item) => (
                                <FormField
                                  key={item.id}
                                  control={form.control}
                                  name="amenities"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={item.id}
                                        className="col-span-6 flex items-center gap-2"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(
                                              item.id
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal">
                                          {item.label}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                          </Grid>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="highlights"
                      render={() => (
                        <FormItem>
                          <FormLabel className="col-span-12">
                            Highlights
                          </FormLabel>
                          <Grid className="mt-2" gap={"xs"}>
                            {highlights &&
                              highlights.map((item) => (
                                <FormField
                                  key={item.id}
                                  control={form.control}
                                  name="highlights"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={item.id}
                                        className="col-span-6 flex items-center gap-2"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(
                                              item.id
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal">
                                          {item.label}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                          </Grid>
                        </FormItem>
                      )}
                    />
                  </CollapsibleContent>
                  {collapsibleOpen && (
                    <CollapsibleTrigger asChild>
                      <Button variant={"link"} className="underline">
                        Show Less
                      </Button>
                    </CollapsibleTrigger>
                  )}
                </Collapsible>
                <footer className="fixed inset-x-0 bottom-0 flex w-full items-center justify-between border-t border-border bg-background/70 p-6 backdrop-blur">
                  <Button
                    type="button"
                    onClick={onReset}
                    size={"sm"}
                    variant={"link"}
                  >
                    Clear All
                  </Button>
                  <Button type="submit" size={"sm"}>
                    Save
                  </Button>
                </footer>
              </form>
            </Form>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
