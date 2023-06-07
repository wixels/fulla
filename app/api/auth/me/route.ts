import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL as string}/api/users/me`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookies().get("payload-token")}`,
      },
    }
  )
  const res = await req.json()

  return NextResponse.json({ res })
}
