import { SiteHeader } from "@/components/navigation/site-header"
import { SiteSpaceFilters } from "@/components/site-space-filters"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteSpaceFilters />
      {children}
    </div>
  )
}
