import Link from "next/link"

import { db } from "@/lib/db"
import { SiteTypeFilters } from "@/components/site-type-filters"

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { space: string }
}) {
  const [agile, furnished, priv] = await Promise.all([
    db.space.count({
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
                equals: params.space,
              },
            },
          },
        ],
      },
    }),
    db.space.count({
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
                equals: params.space,
              },
            },
          },
        ],
      },
    }),
    db.space.count({
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
                equals: params.space,
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
        space={params.space}
      />
      {children}
    </div>
  )
}
