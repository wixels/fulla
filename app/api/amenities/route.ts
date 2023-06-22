import { NextResponse } from "next/server"

import { db } from "@/lib/db"

export async function GET() {
  const amenities = await db.amenity.findMany()

  return NextResponse.json(amenities)
}
