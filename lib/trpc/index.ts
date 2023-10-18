import { db } from "../db"
import { activityRouter } from "./routers/activity"
import { orgRouter } from "./routers/org"
import { spaceRouter } from "./routers/space"
import { spacesRouter } from "./routers/spaces"
import { taskRouter } from "./routers/tasks"
import { userRouter } from "./routers/user"
import { publicProcedure, router } from "./trpc"

export const appRouter = router({
  spaces: spacesRouter,
  space: spaceRouter,
  org: orgRouter,
  task: taskRouter,
  activity: activityRouter,
  user: userRouter,
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
