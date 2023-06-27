import { notFound } from "next/navigation"
import { NextResponse } from "next/server"

import { db } from "@/lib/db"

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const publishedListing = await db.listing.findFirst({
      where: {
        id,
        status: "published",
      },
      include: {
        offerings: true,
        amenities: true,
        author: true,
        images: true,
      },
    })

    if (!publishedListing) {
      notFound()
    }

    return NextResponse.json(publishedListing)
  } catch (error: unknown) {
    console.error("An unexpected error occurred:", error)
    return NextResponse.json({
      status: 500,
      body: error,
    })
  }
}
