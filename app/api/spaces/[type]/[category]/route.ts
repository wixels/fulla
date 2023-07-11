import * as z from "zod"

import { db } from "@/lib/db"

export async function GET(
  req: Request,
  { params: { type, category } }: { params: { type: string; category: string } }
) {
  const url = new URL(req.url)
  try {
    const desks = url.searchParams.get("desks")
      ? parseInt(url.searchParams.get("desks") as string)
      : 2
    const rooms = url.searchParams.get("rooms")
    const parsedSearchParams = z
      .object({
        limit: z.string(),
        page: z.string(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
      })

    const where = {
      // AND: [
      //   {
      //     type: {
      //       key: {
      //         equals: type,
      //       },
      //     },
      //   },
      //   {
      //     category: {
      //       key: {
      //         equals: category,
      //       },
      //     },
      //   },
      // ],
    }

    // Object.keys(parsedSearchParams)?.forEach((key: string) => {
    //   switch (key) {
    //     case "desks": {
    //       if (parsedSearchParams?.[key] !== undefined)
    //         where.AND.push({
    //           desks: {
    //             gte: parsedSearchParams?.[key],
    //           },
    //         })
    //       break
    //     }
    //     case "rooms":
    //       break

    //     default:
    //       break
    //   }
    // })
    const spaces = await db.space.findMany({
      take: parseInt(parsedSearchParams.limit),
      skip:
        parseInt(parsedSearchParams.page) === 0
          ? 0
          : parseInt(parsedSearchParams.page) *
            parseInt(parsedSearchParams.limit),
      orderBy: {
        createdAt: "desc",
      },
      where: {
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
      },
      include: {
        type: true,
        category: true,
      },
    })
    return new Response(JSON.stringify(spaces))
  } catch (error) {
    new Response("Could not fetch posts", { status: 500 })
  }
}
