import React, { Suspense } from "react"
import { redirect } from "next/navigation"

import { Listing } from "@/types/payload-types"
import { CategoriesList } from "@/lib/categories"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Title } from "@/components/ui/title"
import { ListingHeader } from "@/components/listings-header"

import { CategoryForm } from "./_category-form"
import { CategoryLoading } from "./_category-loading"

export type CategoryLabel = typeof CategoriesList[number]["label"]

async function getCategories() {
  const res = await fetch("http://localhost:/api/categories")
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
  const [user, categories] = await Promise.all([
    await getCurrentUser(),
    await (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL!}/api/categories`,
        {
          next: {
            revalidate: 120,
          },
        }
      )
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
  async function update(categoryId: string) {
    "use server"
    await db.listing.update({
      data: {
        categoryId,
      },
      where: {
        id,
      },
    })
    redirect(`listings/create/${id}/type`)
  }

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
