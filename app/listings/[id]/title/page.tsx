"use client"

import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Textarea } from "@/components/ui/textarea"
import { Title } from "@/components/ui/title"
import { ListingFooter } from "@/components/listing-footer"
import { ListingHeader } from "@/components/listings-header"

export default function ListingTitle() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start lg:justify-center">
      <ListingHeader />
      <section className="mx-auto -mt-11 w-full max-w-xl">
        <Title style={{ marginBottom: 0 }} showAs={2} className="font-semibold">
          Now, let's give your home a title
        </Title>
        <Paragraph className="mt-2 text-muted-foreground">
          Short titles work best. Have fun with it—you can always change it
          later.
        </Paragraph>
        <div className="mt-8 grid w-full gap-1.5">
          <Textarea rows={10} id="message" />
        </div>
      </section>
      <ListingFooter progress={22}>
        <Link
          href={"/listings/1/category"}
          className={buttonVariants({ variant: "link" })}
        >
          Back
        </Link>
        <Link href={"/listings/1/highlights"} className={buttonVariants({})}>
          Next
        </Link>
      </ListingFooter>
    </div>
  )
}
