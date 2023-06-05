import Link from "next/link"

import { Listing } from "@/types/payload-types"
import { openai } from "@/lib/openai"
import { buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Textarea } from "@/components/ui/textarea"
import { Title } from "@/components/ui/title"
import { ListingFooter } from "@/components/listing-footer"
import { ListingHeader } from "@/components/listings-header"

async function getListing(id: string): Promise<Listing> {
  const res = await fetch(
    `http://localhost:8000/api/listings/${id}?draft=true`,
    {
      cache: "no-cache",
    }
  )
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}
async function getAiDescription() {
  const gptreq = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content:
          "Generate a brief, catch and engaging description to an apartment with 3 bedrooms, 2 bathrooms, 2nd floor, modern stlyish, gas and inverter setup",
      },
    ],
  })

  return gptreq.data.choices[0].message.content
}

export default async function ListingTitle({
  params: { id },
}: {
  params: { id: string }
}) {
  const listing = await getListing(id)
  const aiDescription = !listing.description ? await getAiDescription() : null

  console.log("aiDescription::: ", aiDescription)
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start lg:justify-center">
      <ListingHeader />
      <section className="mx-auto -mt-11 w-full max-w-xl">
        <Title style={{ marginBottom: 0 }} showAs={2} className="font-semibold">
          Create your description
        </Title>
        <Paragraph className="mt-2 text-muted-foreground">
          Share what makes your place special.
        </Paragraph>
        <div className="mt-8 grid w-full gap-1.5">
          <Textarea
            placeholder="Have fun with the whole family at this stylish place."
            rows={10}
            id="message"
          />
        </div>
      </section>
      <ListingFooter progress={22}>
        <Link
          href={"/listings/1/highlights"}
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
