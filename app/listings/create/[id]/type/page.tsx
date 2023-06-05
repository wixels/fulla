import { redirect } from "next/navigation"

import { Listing } from "@/types/payload-types"
import { Title } from "@/components/ui/title"
import { ListingHeader } from "@/components/listings-header"

import { TypeForm } from "./_type-form"

async function getTypes() {
  const res = await fetch("http://localhost:8000/api/types")
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}
async function getListing(id: string) {
  const res = await fetch(`http://localhost:8000/api/listings/${id}`, {
    cache: "no-cache",
  })
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default async function TypePage({
  params: { id },
}: {
  params: { id: string }
}) {
  const [listing, { docs: types }] = await Promise.all([
    (await getListing(id)) as Listing,
    await getTypes(),
  ])

  console.log("listing from type::: ", listing)

  async function update(typeId: string) {
    "use server"
    const req = await fetch(`http://localhost:8000/api/listings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: typeId,
        _status: "draft",
      }),
    })
    redirect(`/listings/create/${id}/address`)
  }
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start lg:justify-center">
      <ListingHeader />
      <section className="mx-auto -mt-11 w-full max-w-xl">
        <Title showAs={2} className="font-semibold">
          What type of place will tenants have?
        </Title>
        <TypeForm
          id={id}
          update={update}
          types={types}
          listing={JSON.parse(JSON.stringify(listing))}
        />
      </section>
    </div>
  )
}
