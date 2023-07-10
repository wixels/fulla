import Link from "next/link"

import { db } from "@/lib/db"
import { SiteTypeFilters } from "@/components/site-type-filters"

export default async function Layout({
  children,
  params: { type },
}: {
  children: React.ReactNode
  params: { type: string }
}) {
  const [agile, furnished, priv] = await Promise.all([
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

  return (
    <div className="mt-5 flex grow flex-col">
      <SiteTypeFilters
        agile={agile}
        furnished={furnished}
        private={priv}
        space={type}
      />
      {children}
    </div>
  )
}
