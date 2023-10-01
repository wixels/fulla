import { cookies } from "next/headers"
import { initTRPC, TRPCError } from "@trpc/server"

const t = initTRPC.create()

export const middleware = t.middleware

const isAuthed = middleware(async (opts) => {
  const token = cookies().get("token")?.value

  if (!token) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return opts.next({
    ctx: {
      token,
    },
  })
})

export const router = t.router
export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(isAuthed)
