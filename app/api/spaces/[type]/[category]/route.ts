import * as z from "zod"

import { db } from "@/lib/db"

export async function GET(
  req: Request,
  { params: { type, category } }: { params: { type: string; category: string } }
) {
  const url = new URL(req.url)
  try {
    const { limit, page } = z
      .object({
        limit: z.string(),
        page: z.string(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
      })

    const spaces = await db.space.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
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
