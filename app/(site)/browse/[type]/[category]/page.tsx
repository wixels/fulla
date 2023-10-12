import slugify from "slugify"

import { db } from "@/lib/db"
import { serverClient } from "@/lib/trpc/server"
import { PublishedSpaceCard } from "@/components/space-cards/published-space-card"

import Empty from "./_empty"

export default async function Page({
  params: { category, type },
  searchParams = {},
}: {
  params: { category: string; type: string }
  searchParams: QueryParams
}) {
  const spaces = await serverClient.spaces.published({
    category,
    type,
  })

  return (
    <div className="section-bottom flex grow flex-col">
      {spaces.length ? (
        <div className="gutter grid w-full grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {spaces.map((space) => (
            <PublishedSpaceCard key={space.id} space={space} />
          ))}
        </div>
      ) : (
        <Empty />
      )}
    </div>
  )
}
