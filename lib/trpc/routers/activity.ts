import { tr } from "date-fns/locale"
import * as z from "zod"

import { db } from "@/lib/db"

import { privateProcedure, router } from "../trpc"

export const activityRouter = router({
  propertyActivity: privateProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async (opts) => {
      return await db.activity.findMany({
        where: {
          propertyId: opts.input.id,
        },
        include: {
          about: true,
          author: true,
          property: true,
          task: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    }),
  createActivity: privateProcedure
    .input(
      z.object({
        data: z.any(),
      })
    )
    .mutation(async (opts) => {
      return await db.activity.create({
        data: {
          authorId: opts.ctx.user.id,
          ...opts.input.data,
        },
      })
    }),
})
