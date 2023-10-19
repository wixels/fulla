import * as z from "zod"

import { db } from "@/lib/db"

import { privateProcedure, router } from "../trpc"

export const userRouter = router({
  me: privateProcedure.query(async (opts) => {
    const { id } = opts.ctx.user

    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        organizations: {
          include: {
            organization: {
              include: {
                logo: true,
              },
            },
          },
        },
      },
    })

    if (!user) return null

    return user
  }),
  update: privateProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.any(),
      })
    )
    .mutation(async (opts) => {
      const { id, data } = opts.input

      return await db.user.update({
        where: {
          id,
        },
        data,
      })
    }),
})
