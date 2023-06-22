import { NextResponse } from "next/server"

import { db } from "@/lib/db"

export async function GET() {
  const types = await db.type.findMany()

  return NextResponse.json(types)
}
