import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  const cartId = cookies().get("cartId")?.value

  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL as string}/api/users/me`,
    {
      credentials: "include",
      cache: "no-store",
    }
  )
  const res = await req.json()

  return NextResponse.json({ res })
}
