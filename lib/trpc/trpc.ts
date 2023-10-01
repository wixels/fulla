import { cookies } from "next/headers"
import { TRPCError, initTRPC } from "@trpc/server"

import { getCurrentUser } from "../session"

const t = initTRPC.create()

export const middleware = t.middleware

const isAuthed = middleware(async (opts) => {
  const user = await getCurrentUser()

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return opts.next({
    ctx: {
      user,
    },
  })
})

export const router = t.router
export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(isAuthed)
