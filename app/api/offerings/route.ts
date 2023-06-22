import { NextResponse } from "next/server"

import { db } from "@/lib/db"

export async function GET() {
  const offerings = await db.offering.findMany()

  return NextResponse.json(offerings)
}
