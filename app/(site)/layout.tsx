import { SiteHeader } from "@/components/navigation/site-header"
import { SiteSpaceFilters } from "@/components/site-space-filters"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <SiteSpaceFilters />
      {children}
    </div>
  )
}
