import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const res = await fetch(`http://localhost:8000/api/listings/${id}?draft=true`)
  const listing = await res.json()

  return NextResponse.json({ listing })
}
