import { serverClient } from "@/lib/trpc/server"
import { SiteTypeFilters } from "@/components/site-type-filters"

import { TypeCategoryFilters } from "./_type-category-filters"

export default async function Layout({
  children,
  params: { type },
}: {
  children: React.ReactNode
  params: { type: string }
}) {
  const [offerings, highlights, amenities] = await Promise.all([
    await serverClient.offerings(),
    await serverClient.highlights(),
    await serverClient.amenities(),
  ])

  return (
    <div className="mt-5 flex grow flex-col">
      <SiteTypeFilters agile={0} furnished={0} private={0} space={type} />
      <div className="gutter sticky top-[3.6rem] z-[5] flex items-center justify-between bg-background/90 py-2 backdrop-blur-md">
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
