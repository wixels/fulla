import * as z from "zod"

export const spaceQuerySchema = z.object({
  q: z.string().optional(),
  orgId: z.string().optional(),
  type: z.string().optional(),
  price: z.array(z.number()).optional(),
  rooms: z.string().optional(),
  desks: z.string().optional(),
  floors: z.string().optional(),
  items: z.array(z.string()).optional(),
  offerings: z.array(z.string()).optional(),
  highlights: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
})
