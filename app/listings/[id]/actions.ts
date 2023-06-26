"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

async function favourite({
  listingId,
  userId,
}: {
  listingId: string
  userId: string
}): Promise<void> {
  try {
    const user = await getCurrentUser()

    if (!user) {
      redirect("/login")
    }

    await db.favourite.create({
      data: {
        userId,
        listingId,
      },
    })

    revalidatePath("/")
  } catch (err) {
    console.log(err)
  }
}
async function unfavourite({ listingId }: { listingId: string }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      redirect("/login")
    }
    const favourite = await db.favourite.findFirst({
      where: {
        userId: user.id,
        listingId,
      },
    })

    if (!favourite) {
      throw new Error("Favourite not found")
    }

    await db.favourite.delete({
      where: {
        id: favourite.id,
      },
    })
    revalidatePath("/")
  } catch (err) {
    console.log(err)
  }
}

export { favourite, unfavourite }
