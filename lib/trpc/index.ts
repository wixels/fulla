import { db } from "../db"
import { spaceRouter } from "./routers/space"
import { spacesRouter } from "./routers/spaces"
import { publicProcedure, router } from "./trpc"

export const appRouter = router({
  spaces: spacesRouter,
  space: spaceRouter,
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
})

export type AppRouter = typeof appRouter
