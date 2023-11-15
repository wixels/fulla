import * as z from "zod"

export const queryNumberArray = z
  .string()
  .or(z.number())
  .or(z.array(z.number()))
  .transform((a) => {
    if (typeof a === "string") return a.split(",").map((a) => Number(a))
    if (Array.isArray(a)) return a
    return [a]
  })

export const queryStringArray = z
  .preprocess((a) => z.string().parse(a).split(","), z.string().array())
  .or(z.string().array())

export const spaceQuerySchema = z.object({
  q: z.string().optional(),
  orgId: z.string().optional(),
  category: z.string().optional(),
  type: z.string().optional(),
  price: queryNumberArray.optional(),
  rooms: z.string().optional(),
  desks: z.string().optional(),
  floors: z.string().optional(),
  offerings: queryStringArray.optional(),
  highlights: queryStringArray.optional(),
  amenities: queryStringArray.optional(),
})
