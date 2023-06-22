import { redirect } from "next/navigation"

import { Listing } from "@/types/payload-types"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Title } from "@/components/ui/title"
import { ListingHeader } from "@/components/listings-header"

import { TypeForm } from "./_type-form"

export default async function TypePage({
  params: { id },
}: {
  params: { id: string }
}) {
  const [user, types] = await Promise.all([
    await getCurrentUser(),
    await (async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/api/types`, {
        next: {
          revalidate: 120,
        },
      })
      if (!res.ok) {
        throw new Error("Failed to fetch data")
      }

      return res.json()
    })(),
  ])

  const listing = await db.listing.findFirstOrThrow({
    where: {
      id: {
        equals: id,
      },
      authorId: {
        equals: user?.id,
      },
    },
  })
  async function update(typeId: string) {
    "use server"
    await db.listing.update({
      data: {
        typeId,
      },
      where: {
        id,
      },
    })
    redirect(`listings/create/${id}/address`)
  }
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start lg:justify-center">
      <ListingHeader />
      <section className="mx-auto -mt-11 w-full max-w-xl">
        <Title showAs={2} className="font-semibold">
          What type of place will tenants have?
        </Title>
        <TypeForm id={id} update={update} types={types} listing={listing} />
      </section>
    </div>
  )
}
