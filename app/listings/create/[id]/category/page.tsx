import React, { Suspense } from "react"
import { redirect } from "next/navigation"

import { Listing } from "@/types/payload-types"
import { CategoriesList } from "@/lib/categories"
import { Title } from "@/components/ui/title"
import { ListingHeader } from "@/components/listings-header"

import { CategoryForm } from "./_category-form"
import { CategoryLoading } from "./_category-loading"

export type CategoryLabel = typeof CategoriesList[number]["label"]

async function getCategories() {
  const res = await fetch("http://localhost:8000/api/categories")
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}
async function getListing(id: string) {
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

export default async function ListingCreate({
  params: { id },
}: {
  params: { id: string }
}) {
  const [listing, { docs: categories }] = await Promise.all([
    (await getListing(id)) as Listing,
    await getCategories(),
  ])
  async function update(categoryId: string) {
    "use server"
    await fetch(`http://localhost:8000/api/listings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: categoryId,
        _status: "draft",
      }),
    })
    redirect(`listings/create/${id}/type`)
  }

  console.log("listing::: ", listing)

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start">
      <ListingHeader />
      <section className="mx-auto mt-28 w-full max-w-xl">
        <Title showAs={2} className="font-semibold">
          Which of these best describes your place?
        </Title>
        <Suspense fallback={<CategoryLoading />}>
          <CategoryForm
            categories={categories}
            update={update}
            listing={JSON.parse(JSON.stringify(listing))}
          />
        </Suspense>
      </section>
    </div>
  )
}
