import { NextResponse } from "next/server"

import { db } from "@/lib/db"

export async function GET(
  req: Request,
  { params: { type } }: { params: { type: string } }
) {
  const offerings = await db.space.findFirst({
    where: {
      id: {
        equals: type,
      },
    },
  })

  return NextResponse.json(offerings)
}
