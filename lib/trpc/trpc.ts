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

// returns a user if they are logged in, but does not throw if they are not
const isPotentiallyAuthed = middleware(async (opts) => {
  const user = await getCurrentUser()

  return opts.next({
    ctx: {
      user,
    },
  })
})

export const router = t.router
export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(isAuthed)
export const hybridProcedure = t.procedure.use(isPotentiallyAuthed)
