import { NextRequest } from "next/server"
import { Liveblocks } from "@liveblocks/node"

import { getCurrentUser } from "@/lib/session"

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_API_KEY as string,
})

export async function POST(request: NextRequest) {
  const user = await getCurrentUser()

  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const session = liveblocks.prepareSession(user.id, {
    userInfo: user,
  })

  const { room } = await request.json()
  session.allow(room, session.FULL_ACCESS)

  const { body, status } = await session.authorize()
  return new Response(body, { status })
}
