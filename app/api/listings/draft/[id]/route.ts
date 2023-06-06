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
          equals: "draft",
        },
      },
    },
    { addQueryPrefix: true }
  )
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL as string}/api/listings/${id}${query}`,
    {
      cache: "no-store",
    }
  )
  const listing = await res.json()

  return NextResponse.json({ listing })
}
