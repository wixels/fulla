import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

import { appRouter } from "@/lib/trpc"

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}),
    onError: (opts) => {
      const { error, type, path, input, ctx, req } = opts
      console.log("error::: ", error)
    },
  })

export { handler as GET, handler as POST }
