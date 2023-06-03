"use client"

import Link from "next/link"
import { Building, Citrus, Home, Pin, Trees, Users } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Textarea } from "@/components/ui/textarea"
import { Title } from "@/components/ui/title"
import { ListingFooter } from "@/components/listing-footer"
import { ListingHeader } from "@/components/listings-header"

export default function HighlightsPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start lg:justify-center">
      <ListingHeader />
      <section className="mx-auto -mt-11 w-full max-w-xl">
        <Title style={{ marginBottom: 0 }} showAs={2} className="font-semibold">
          Next, let's describe your guesthouse
        </Title>
        <Paragraph className="mt-2 text-muted-foreground">
          Choose up to 2 highlights. We'll use these to get your description
          started.
        </Paragraph>
        <ul className="mt-8 flex flex-wrap gap-3">
          <li className="flex cursor-pointer gap-3 rounded-full border bg-background px-4 py-3 transition-all hover:border-zinc-600 hover:shadow">
            <Trees /> <Paragraph className="font-semibold">Peaceful</Paragraph>
          </li>
          <li className="flex cursor-pointer gap-3 rounded-full border bg-background px-4 py-3 transition-all hover:border-zinc-600 hover:shadow">
            <Citrus /> <Paragraph className="font-semibold">Unique</Paragraph>
          </li>
          <li className="flex cursor-pointer gap-3 rounded-full border bg-background px-4 py-3 transition-all hover:border-zinc-600 hover:shadow">
            <Users />
            <Paragraph className="font-semibold">Family-Friendly</Paragraph>
          </li>
          <li className="flex cursor-pointer gap-3 rounded-full border bg-background px-4 py-3 transition-all hover:border-zinc-600 hover:shadow">
            <Home />
            <Paragraph className="font-semibold">Stylish</Paragraph>
          </li>
          <li className="flex cursor-pointer gap-3 rounded-full border bg-background px-4 py-3 transition-all hover:border-zinc-600 hover:shadow">
            <Pin />
            <Paragraph className="font-semibold">Central</Paragraph>
          </li>
          <li className="flex cursor-pointer gap-3 rounded-full border bg-background px-4 py-3 transition-all hover:border-zinc-600 hover:shadow">
            <Building />
            <Paragraph className="font-semibold">Spacious</Paragraph>
          </li>
        </ul>
      </section>
      <ListingFooter progress={22}>
        <Link
          href={"/listings/1/title"}
          className={buttonVariants({ variant: "link" })}
        >
          Back
        </Link>
        <Link href={"/listings/1/description"} className={buttonVariants({})}>
          Next
        </Link>
      </ListingFooter>
    </div>
  )
}
