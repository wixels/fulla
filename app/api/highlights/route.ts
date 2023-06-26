import { NextResponse } from "next/server"

import { db } from "@/lib/db"

export async function GET() {
  const highlights = await db.highlight.findMany()

  return NextResponse.json(highlights)
}
