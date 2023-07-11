import { db } from "@/lib/db"

export async function GET(
  req: Request,
  { params: { type } }: { params: { type: string } }
) {
  try {
    const [agileCount, furnishedCount, privateCount] = await Promise.all([
      await db.space.count({
        where: {
          AND: [
            {
              category: {
                key: {
                  equals: "agile",
                },
              },
            },
            {
              type: {
                key: {
                  equals: type,
                },
              },
            },
          ],
        },
      }),
      await db.space.count({
        where: {
          AND: [
            {
              category: {
                key: {
                  equals: "furnished",
                },
              },
            },
            {
              type: {
                key: {
                  equals: type,
                },
              },
            },
          ],
        },
      }),
      await db.space.count({
        where: {
          AND: [
            {
              category: {
                key: {
                  equals: "private",
                },
              },
            },
            {
              type: {
                key: {
                  equals: type,
                },
              },
            },
          ],
        },
      }),
    ])
    return new Response(
      JSON.stringify({
        agileCount,
        furnishedCount,
        privateCount,
      })
    )
  } catch (error) {
    new Response("Could not fetch posts", { status: 500 })
  }
}
