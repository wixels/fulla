import { createNextRouteHandler } from "uploadthing/next"

import { ourFileRouter } from "@/config/uploadthing-config"

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
})
