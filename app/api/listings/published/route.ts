import { NextResponse } from "next/server"

import { db } from "@/lib/db"

export async function GET() {
  const publishedHighlights = await db.listing.findMany({
    where: {
      status: {
        equals: "published",
      },
    },
  })

  return NextResponse.json(publishedHighlights)
}
