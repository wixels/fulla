import { ProposalStatus } from "@prisma/client"
import * as z from "zod"

import { db } from "@/lib/db"
import { queryStringArray } from "@/hooks/use-typed-query"

import { privateProcedure, publicProcedure, router } from "../trpc"

export const spacesRouter = router({
  published: publicProcedure
    .input(
      z.object({
        type: z.string(),
        category: z.string(),
        desks: z.string().nullish().optional(),
        rooms: z.string().nullish().optional(),
        offerings: z.string().nullish().optional(),
        amenities: z.string().nullish().optional(),
        highlights: z.string().nullish().optional(),
      })
    )
    .query(async (opts) => {
      const { type, category, ...rest } = opts.input
      const where: { AND: {}[] } = {
        AND: [
          {
            type: {
              key: {
                equals: type,
              },
            },
          },
          {
            category: {
              key: {
                equals: category,
              },
            },
          },
        ],
      }

      Object.keys(rest)?.forEach((key: string) => {
        switch (key) {
          case "desks": {
            if (rest?.[key])
              where.AND.push({
                desks: {
                  gte: parseInt(rest?.[key]!),
                },
              })
            break
          }
          case "rooms": {
            if (rest?.[key])
              where.AND.push({
                rooms: {
                  gte: parseInt(rest?.[key]!),
                },
              })
            break
          }
          case "offerings": {
            const arr = rest?.[key]?.split(",")?.filter((x) => x !== "")
            if (rest?.[key] && arr?.length)
              where.AND.push({
                offerings: {
                  some: {
                    label: {
                      in: arr,
                    },
                  },
                },
              })
            break
          }
          case "amenities": {
            const arr = rest?.[key]?.split(",")?.filter((x) => x !== "")
            if (rest?.[key] && arr?.length)
              where.AND.push({
                amenities: {
                  some: {
                    label: {
                      in: arr,
                    },
                  },
                },
              })
            break
          }
          case "highlights": {
            const arr = rest?.[key]?.split(",")?.filter((x) => x !== "")

            if (rest?.[key] && arr?.length)
              where.AND.push({
                highlights: {
                  some: {
                    label: {
                      in: arr,
                    },
                  },
                },
              })
            break
          }
          default:
            break
        }
      })

      return await db.space.findMany({
        where,
        include: {
          organization: {
            include: {
              logo: true,
            },
          },
          type: true,
          category: true,
          offerings: true,
          highlights: true,
          amenities: true,
          images: true,
        },
      })
    }),
  drafts: privateProcedure.query(async (opts) => {
    const { user } = opts.ctx
    return await db.space.findMany({
      include: {
        organization: {
          include: {
            logo: true,
          },
        },
      },
      where: {
        status: "draft",
        organizationId: {
          equals: user.organizations?.[0].organizationId,
        },
      },
    })
  }),
  forCollection: privateProcedure
    .input(
      z.object({
        collectionId: z.string(),
        q: z.string().optional().nullable(),
        status: z
          .preprocess((a) => z.string().parse(a).split(","), z.string().array())
          .or(z.string().array())
          .optional()
          .nullable(),
      })
    )
    .query(async (opts) => {
      return await db.space.findMany({
        where: {
          collections: {
            some: {
              id: {
                equals: opts.input.collectionId,
              },
            },
          },
          ...(opts.input.q
            ? {
                title: {
                  contains: opts.input.q,
                },
              }
            : {}),
          ...(opts.input.status?.length
            ? {
                proposals: {
                  some: {
                    status: {
                      in: opts.input.status as ProposalStatus[],
                    },
                  },
                },
              }
            : {}),
        },
        include: {
          property: true,
          proposals: {
            where: {
              applicantId: opts.ctx.user.id,
            },
          },
          organization: {
            include: {
              logo: true,
            },
          },
          highlights: true,
          amenities: true,
          offerings: true,
          type: true,
          category: true,
          images: true,
        },
      })
    }),
})
