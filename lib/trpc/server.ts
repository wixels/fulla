import { cookies } from "next/headers"
import { httpBatchLink } from "@trpc/client"

import { appRouter } from "."

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_APP_URL + "/api/trpc",
    }),
  ],
})
