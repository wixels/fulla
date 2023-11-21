import * as z from "zod"

import { db } from "@/lib/db"

import { publicProcedure, router } from "../trpc"

export const reviewRouter = router({
  ratingForSpace: publicProcedure
    .input(
      z.object({
        spaceId: z.string(),
      })
    )
    .query(async (opts) => {
      const reviews = await db.review.findMany({
        where: {
          spaceId: opts.input.spaceId,
        },
      })
      const ratings = reviews.map((review) => review.rating)
      const sum = ratings.reduce((a, b) => a + b, 0)
      const avg = sum / ratings.length || 0
      return avg
    }),
  reviewForSpace: publicProcedure
    .input(
      z.object({
        spaceId: z.string(),
        take: z.number().optional(),
      })
    )
    .query(async (opts) => {
      const reviews = await db.review.findMany({
        where: {
          spaceId: opts.input.spaceId,
        },
        ...(opts.input.take ? { take: opts.input.take } : {}),
        include: {
          author: {
            select: {
              name: true,
              image: true,
              id: true,
            },
          },
        },
      })
      return reviews
    }),
})
