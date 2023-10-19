import * as z from "zod"

import { privateProcedure, router } from "../trpc"

export const pageRouter = router({
  create: privateProcedure
    .input(
      z.object({
        data: z.any(),
      })
    )
    .mutation(async (opts) => {}),
})
