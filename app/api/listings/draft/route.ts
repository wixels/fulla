import { NextResponse } from "next/server"
import qs from "qs"

export async function GET() {
  const query = qs.stringify(
    {
      where: {
        _status: {
          equals: "draft",
        },
      },
    },
    { addQueryPrefix: true }
  )
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL as string}/api/listings${query}`,
    {
      cache: "no-store",
    }
  )
  const data = await res.json()

  return NextResponse.json({ data })
}
