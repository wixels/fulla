import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Image as ImageIcon } from "lucide-react"

import { Listing } from "@/types/payload-types"
import { buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { ListingFooter } from "@/components/listing-footer"
import { ListingHeader } from "@/components/listings-header"

import { MediaForm } from "./_media-form"

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
type FileObject = File & { preview: string }

export default async function TypePage({
  params: { id },
}: {
  params: { id: string }
}) {
  const listing = await getListing(id)
  console.log("listing::: ", listing)
  // const [files, setFiles] = useState<any[] | null>(null)

  async function update(payload: FileObject[]) {
    "use server"

    console.log("payload::: ", payload)
    // await fetch(`http://localhost:8000/api/listings/${id}?draft=true`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(payload),
    // })
    // redirect(`/listings/${id}/title`)
  }
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start">
      <ListingHeader />
      <section className="mx-auto mt-28 flex w-full max-w-xl flex-col gap-8 pb-32">
        <Title style={{ marginBottom: 0 }} showAs={2} className="font-semibold">
          Add some photos of your guesthouse
        </Title>
        <Paragraph className="text-muted-foreground">
          {
            "You'll need 5 photos to get started. You can add more or make changes later."
          }
        </Paragraph>
        <MediaForm
          update={update}
          listing={JSON.parse(JSON.stringify(listing))}
        />
      </section>
    </div>
  )
}
