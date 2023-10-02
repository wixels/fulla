import * as z from "zod"

import { db } from "@/lib/db"

import { privateProcedure, publicProcedure, router } from "../trpc"

export const spaceRouter = router({
  draft: privateProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async (opts) => {
      const { id } = opts.input
      const { user } = opts.ctx
      return await db.space.findFirst({
        where: {
          id,
          organizationId: {
            equals: user.organizations?.[0].organizationId,
          },
          status: "draft",
        },
        include: {
          type: true,
          category: true,
        },
      })
    }),
})
