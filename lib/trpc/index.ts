import * as z from "zod"

import { db } from "../db"
import { activityRouter } from "./routers/activity"
import { orgRouter } from "./routers/org"
import { pageRouter } from "./routers/pages"
import { reviewRouter } from "./routers/review"
import { spaceRouter } from "./routers/space"
import { spacesRouter } from "./routers/spaces"
import { taskRouter } from "./routers/tasks"
import { userRouter } from "./routers/user"
import { privateProcedure, publicProcedure, router } from "./trpc"

export const appRouter = router({
  spaces: spacesRouter,
  space: spaceRouter,
  org: orgRouter,
  task: taskRouter,
  activity: activityRouter,
  user: userRouter,
  page: pageRouter,
  reviews: reviewRouter,
  randomImage: publicProcedure.query(async () => {
    const image = await fetch(
      "https://api.unsplash.com/photos/random?query=abstract&client_id=" +
        process.env.UNSPALSH_ACCESS_KEY
    )
    if (!image.ok) {
      throw new Error("Error fetching image")
    }
    const imageRes = await image.json()

    return imageRes
  }),
  highlights: publicProcedure.query(async () => {
    return await db.highlight.findMany()
  }),
  types: publicProcedure.query(async () => {
    return await db.type.findMany()
  }),
  offerings: publicProcedure.query(async () => {
    return await db.offering.findMany()
  }),
  amenities: publicProcedure.query(async () => {
    return await db.amenity.findMany()
  }),
  collections: privateProcedure
    .input(
      z.object({
        q: z.string().optional().nullable(),
      })
    )
    .query(async (opts) => {
      const collections = await db.collection.findMany({
        where: {
          authorId: opts.ctx.user.id,
          ...(opts.input.q
            ? {
                title: {
                  contains: opts.input.q,
                },
              }
            : {}),
        },
        include: {
          spaces: {
            select: {
              id: true,
            },
          },
        },
      })
      const collectionsWithSpaces = collections.map((collection) => {
        return {
          ...collection,
          spaceCount: collection.spaces.length,
          spaces: undefined,
        }
      })
      return collectionsWithSpaces
    }),
  collection: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async (opts) => {
      const { id } = opts.input
      return await db.collection.findFirst({
        where: {
          id,
        },
      })
    }),
  createCollection: privateProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional().nullable(),
      })
    )
    .mutation(async (opts) => {
      return await db.collection.create({
        data: {
          title: opts.input.title,
          description: opts.input.description,
          authorId: opts.ctx.user.id,
        },
      })
    }),
  updateCollection: privateProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.any(),
      })
    )
    .mutation(async (opts) => {
      return await db.collection.update({
        where: {
          id: opts.input.id,
        },
        data: opts.input.data,
      })
    }),
})

export type AppRouter = typeof appRouter
