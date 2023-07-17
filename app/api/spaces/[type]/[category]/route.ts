import * as z from "zod"

import { db } from "@/lib/db"

export async function GET(
  req: Request,
  { params: { type, category } }: { params: { type: string; category: string } }
) {
  const url = new URL(req.url)
  try {
    const parsedSearchParams = z
      .object({
        limit: z.string(),
        page: z.string(),
        desks: z.string().nullish().optional(),
        rooms: z.string().nullish().optional(),
        offerings: z.string().nullish().optional(),
        amenities: z.string().nullish().optional(),
        highlights: z.string().nullish().optional(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
        desks: url.searchParams.get("desks"),
        rooms: url.searchParams.get("rooms"),
        offerings: url.searchParams.get("offerings"),
        amenities: url.searchParams.get("amenities"),
        highlights: url.searchParams.get("highlights"),
      })

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

    Object.keys(parsedSearchParams)?.forEach((key: string) => {
      switch (key) {
        case "desks": {
          if (parsedSearchParams?.[key])
            where.AND.push({
              desks: {
                gte: parseInt(parsedSearchParams?.[key]!),
              },
            })
          break
        }
        case "rooms": {
          if (parsedSearchParams?.[key])
            where.AND.push({
              rooms: {
                gte: parseInt(parsedSearchParams?.[key]!),
              },
            })
          break
        }
        case "offerings": {
          const arr = parsedSearchParams?.[key]
            ?.split(",")
            ?.filter((x) => x !== "")
          if (parsedSearchParams?.[key] && arr?.length)
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
          const arr = parsedSearchParams?.[key]
            ?.split(",")
            ?.filter((x) => x !== "")
          if (parsedSearchParams?.[key] && arr?.length)
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
          const arr = parsedSearchParams?.[key]
            ?.split(",")
            ?.filter((x) => x !== "")

          if (parsedSearchParams?.[key] && arr?.length)
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
    const spaces = await db.space.findMany({
      take: parseInt(parsedSearchParams.limit),
      skip:
        (parseInt(parsedSearchParams.page) - 1) *
        parseInt(parsedSearchParams.limit),
      orderBy: {
        createdAt: "desc",
      },
      where,
      include: {
        type: true,
        category: true,
        offerings: true,
        highlights: true,
        amenities: true,
      },
    })
    return new Response(JSON.stringify(spaces))
  } catch (error) {
    new Response("Could not fetch posts", { status: 500 })
  }
}
