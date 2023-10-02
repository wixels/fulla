import { spaceRouter } from "./routers/space"
import { spacesRouter } from "./routers/spaces"
import { router } from "./trpc"

export const appRouter = router({
  spaces: spacesRouter,
  space: spaceRouter,
})

export type AppRouter = typeof appRouter
