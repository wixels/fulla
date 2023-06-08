import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  const token = cookies().get("payload-token")
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL as string}/api/favourites`,
    {
      cache: "no-store",
      headers: {
        Authorization: `JWT ${token}`,
      },
    }
  )
  const data = await res.json()

  return NextResponse.json({ data })
}
