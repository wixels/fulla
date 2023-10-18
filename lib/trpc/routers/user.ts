import * as z from "zod"

import { db } from "@/lib/db"

import { privateProcedure, router } from "../trpc"

export const userRouter = router({
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
