"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Image as ImageIcon } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { ListingFooter } from "@/components/listing-footer"
import { ListingHeader } from "@/components/listings-header"

export default function TypePage({
  params: { id },
}: {
  params: { id: string }
}) {
  const [files, setFiles] = useState<any[] | null>(null)
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start">
      <ListingHeader />
      <section className="mx-auto mt-28 flex w-full max-w-xl flex-col gap-8 pb-32">
        <Title style={{ marginBottom: 0 }} showAs={2} className="font-semibold">
          Add some photos of your guesthouse
        </Title>
        <Paragraph className="text-muted-foreground">
          You'll need 5 photos to get started. You can add more or make changes
          later.
        </Paragraph>
        {files?.length ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {files?.map((file, i) => (
              <>
                {i === 0 ? (
                  <div
                    key={`${file.name}-${i}`}
                    className="relative col-span-2 aspect-video overflow-hidden rounded-lg"
                  >
                    <Image
                      fill
                      className="object-cover"
                      alt="house primary image"
                      src={URL.createObjectURL(file)}
                    />
                  </div>
                ) : (
                  <div
                    key={`${file.name}-${i}`}
                    className="relative col-span-2 aspect-square overflow-hidden rounded-lg  lg:col-span-1"
                  >
                    <Image
                      fill
                      className="object-cover"
                      alt="house primary image"
                      src={URL.createObjectURL(file)}
                    />
                  </div>
                )}
              </>
            ))}
          </div>
        ) : (
          <label className="flex aspect-square w-full flex-col items-center justify-center rounded-xl border border-dashed text-center">
            <input
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className="hidden"
              multiple
              type="file"
            />
            <ImageIcon size={128} />
            <Title className="font-semibold" level={5}>
              Drag your photos here
            </Title>
            <Paragraph className="text-muted-foreground">
              Choose at least 5 photos
            </Paragraph>
          </label>
        )}
      </section>
      <ListingFooter progress={22}>
        <Link
          href={`/listings/${id}/offerings`}
          className={buttonVariants({ variant: "link" })}
        >
          Back
        </Link>
        <Link href={"/listings/1/title"} className={buttonVariants({})}>
          Next
        </Link>
      </ListingFooter>
    </div>
  )
}
