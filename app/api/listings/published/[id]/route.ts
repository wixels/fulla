import { NextResponse } from "next/server"
import qs from "qs"

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
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
  const res = await fetch(`http://localhost:8000/api/listings/${id}${query}`, {
    next: {
      revalidate: 60,
    },
  })
  const listing = await res.json()

  return NextResponse.json(listing)
}
