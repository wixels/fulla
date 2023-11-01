import { Suspense } from "react"
import Link from "next/link"
import { Bookmark, Building, Loader2, Plus, Search } from "lucide-react"

import { serverClient } from "@/lib/trpc/server"
import { buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { Await } from "@/components/await"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/breadcrumb"
import { PublishedSpaceCard } from "@/components/space-cards/published-space-card"

type Props = {
  params: { id: string }
}
const CollectionPage: React.FC<Props> = async ({ params: { id } }) => {
  const collection = await serverClient.collection({ id })
  return (
    <div className="gutter section">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/collections"
            className="flex items-center gap-2"
          >
            Collections
            <Suspense fallback={<Loader2 className="w-3 h-3 animate-spin" />}>
              <Await promise={serverClient.collections()}>
                {(collections) => <> ({collections?.length ?? 0})</>}
              </Await>
            </Suspense>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href={`/collections/${collection?.id}`}>
            {collection?.title}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Title showAs={2}>{collection?.title}</Title>
      {collection?.spaces.length ? (
        <div className="grid w-full grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {collection?.spaces.map((space) => (
            <PublishedSpaceCard key={space.id} space={space} />
          ))}
        </div>
      ) : (
        <div className="gutter relative mt-4 flex w-full flex-col gap-2 overflow-hidden rounded-xl bg-accent py-16">
          <Title level={2} showAs={4} style={{ margin: 0 }}>
            Get started with Collections
          </Title>
          <Paragraph size={"sm"}>
            Add any space to this collection by clicking the bookmark icon.
          </Paragraph>
          <Link
            scroll={false}
            href={"/browse/desks/agile"}
            className={buttonVariants({
              size: "xs",
              className: "w-fit",
            })}
          >
            <Search className="mr-2 h-3 w-3" />
            Browse spaces
          </Link>
          <Bookmark
            className="absolute right-[25%] top-0 rotate-[-20deg] text-muted-foreground/25"
            size={300}
          />
        </div>
      )}
    </div>
  )
}
export default CollectionPage
