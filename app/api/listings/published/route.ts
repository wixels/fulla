import { NextResponse } from "next/server"
import qs from "qs"

export async function GET() {
  const query = qs.stringify(
    {
      where: {
        _status: {
          equals: "published",
        },
      },
    },
    { addQueryPrefix: true }
  )
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL as string}/api/listings${query}`,
    {
      next: {
        revalidate: 60,
      },
    }
  )
  const data = await res.json()

  return NextResponse.json({ data })
}
