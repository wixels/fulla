import { ProposalStatus } from "@prisma/client"
import * as z from "zod"

import { db } from "@/lib/db"
import { spaceQuerySchema } from "@/lib/validations/space"
import { queryStringArray } from "@/hooks/use-typed-query"

import { privateProcedure, publicProcedure, router } from "../trpc"

export const spacesRouter = router({
  published: publicProcedure.input(spaceQuerySchema).query(async (opts) => {
    let where: any = {
      status: "published",
    }
    Object.keys(opts.input)?.forEach((key) => {
      switch (key) {
        case "q": {
          where.title = {
            contains: opts.input.q,
          }
          break
        }
        case "orgId": {
          where.organizationId = {
            equals: opts.input.orgId,
          }
          break
        }
        case "type": {
          where.type = {
            key: {
              equals: opts.input.type,
            },
          }
          break
        }
        case "category": {
          where.category = {
            key: {
              equals: opts.input.category,
            },
          }
          break
        }
        case "rooms": {
          where.rooms = {
            gte: parseInt(opts.input.rooms!),
          }
          break
        }
        case "desks": {
          where.desks = {
            gte: parseInt(opts.input.desks!),
          }
          break
        }
        case "floors": {
          where.floors = {
            gte: parseInt(opts.input.floors!),
          }
          break
        }
        case "offerings": {
          where.offerings = {
            some: {
              id: {
                in: opts.input.offerings as string[],
              },
            },
          }
          break
        }
        case "highlights": {
          where.highlights = {
            some: {
              id: {
                in: opts.input.highlights as string[],
              },
            },
          }
          break
        }
        case "amenities": {
          where.amenities = {
            some: {
              id: {
                in: opts.input.amenities as string[],
              },
            },
          }
          break
        }

        default:
          break
      }
    })
    console.log("input::: ", opts.input)
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
