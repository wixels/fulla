import Link from "next/link"

import { SiteTypeFilters } from "@/components/site-type-filters"

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { space: string }
}) {
  return (
    <div className="gutter mt-5 flex flex-col">
      <SiteTypeFilters space={params.space} />
      {children}
    </div>
  )
}
