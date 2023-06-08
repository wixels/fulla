"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

async function favourite({
  listingId,
  userId,
}: {
  listingId: string
  userId: string
}): Promise<void> {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL as string}/api/favourites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookies().get("payload-token")?.value}`,
      },
      body: JSON.stringify({
        listing: listingId,
        user: userId,
      }),
    })
    revalidatePath("/")
  } catch (err) {
    console.log(err)
  }
}
async function unfavourite({ favoriteId }: { favoriteId: string }) {
  try {
    await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL as string
      }/api/favourites/${favoriteId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookies().get("payload-token")?.value}`,
        },
      }
    )
    revalidatePath("/")
  } catch (err) {
    console.log(err)
  }
}

export { favourite, unfavourite }
