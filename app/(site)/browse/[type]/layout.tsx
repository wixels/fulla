import { serverClient } from "@/lib/trpc/server"
import { SiteTypeFilters } from "@/components/site-type-filters"

import { TypeCategoryFilters } from "./_type-category-filters"

async function getCounts(type: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/spaces/${type}/count`,
    {
      next: {
        revalidate: 60 * 5,
      },
    }
  )
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default async function Layout({
  children,
  params: { type },
}: {
  children: React.ReactNode
  params: { type: string }
}) {
  const [
    { agileCount, furnishedCount, privateCount },
    offerings,
    highlights,
    amenities,
  ] = await Promise.all([
    await getCounts(type),
    await serverClient.offerings(),
    await serverClient.highlights(),
    await serverClient.amenities(),
  ])

  return (
    <div className="mt-5 flex grow flex-col">
      <SiteTypeFilters
        agile={agileCount}
        furnished={furnishedCount}
        private={privateCount}
        space={type}
      />
      <div className="gutter sticky top-[3.6rem] z-10 flex items-center justify-between bg-background/90 py-2 backdrop-blur-md">
        <TypeCategoryFilters
          offerings={offerings}
          amenities={amenities}
          highlights={highlights}
        />
      </div>
      {children}
    </div>
  )
}
