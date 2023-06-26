import { NextResponse } from "next/server"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

export async function GET() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("User not found")
  }

  const dbUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      favourites: true,
    },
  })

  return NextResponse.json(dbUser?.favourites ?? [])
}
