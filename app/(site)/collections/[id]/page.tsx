import { Suspense } from "react"
import Link from "next/link"
import { Bookmark, Loader2, Search, X } from "lucide-react"

import { serverClient } from "@/lib/trpc/server"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paragraph } from "@/components/ui/paragraph"
import { Skeleton } from "@/components/ui/skeleton"
import { Title } from "@/components/ui/title"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Await } from "@/components/await"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/breadcrumb"
import { ClientAvatar } from "@/components/client-avatar"
import { DataTable } from "@/components/data-table"
import { SpaceCardSkeleton } from "@/components/space-cards/space-card-skeleton"

import { columns } from "./_columns"
import { Filters } from "./_filters"

type Props = {
  params: { id: string }
  searchParams: QueryParams
}
const CollectionPage: React.FC<Props> = async ({
  params: { id },
  searchParams,
}) => {
  return (
    <div className="section">
      <Suspense
        fallback={
          <div className="gutter">
            <Breadcrumb>
              <BreadcrumbItem>
                <BreadcrumbLink className="flex items-center gap-2">
                  <Skeleton className="h-6 w-32" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>
                  <Skeleton className="h-6 w-32" />
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <Skeleton className="my-6 h-10 w-1/2 lg:my-7 lg:h-11 xl:my-8 xl:h-14" />
            <div className="flex items-center gap-2 rounded-xl bg-muted p-4">
              <Input
                disabled
                placeholder="Fetching your collection..."
                variant="ghost"
                sizing={"sm"}
              />
            </div>
          </div>
        }
      >
        <Await promise={serverClient.collection({ id })}>
          {(collection) => (
            <div className="gutter">
              <Breadcrumb>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/collections"
                    className="flex items-center gap-2"
                  >
                    Collections
                    <Suspense
                      fallback={<Loader2 className="h-3 w-3 animate-spin" />}
                    >
                      <Await promise={serverClient.collections({})}>
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
              <Filters />
            </div>
          )}
        </Await>
      </Suspense>
      <Suspense
        key={JSON.stringify(searchParams)}
        fallback={
          <div className="gutter my-6 grid w-full grid-cols-1 gap-x-6 gap-y-10 lg:my-7 lg:grid-cols-2 xl:my-8 xl:grid-cols-3 2xl:grid-cols-4">
            <SpaceCardSkeleton />
            <SpaceCardSkeleton />
            <SpaceCardSkeleton />
          </div>
        }
      >
        <Await
          promise={serverClient.spaces.forCollection({
            collectionId: id,
            ...searchParams,
          })}
        >
          {(spaces) => (
            <div className="gutter">
              {spaces.length ? (
                <DataTable
                  className="mt-4 w-full lg:mt-8"
                  data={spaces}
                  columns={columns}
                />
              ) : searchParams?.q ? (
                <div className="gutter relative my-6 flex w-full flex-col gap-2 overflow-hidden rounded-xl bg-accent py-16 lg:my-7 xl:my-8">
                  <Title level={2} showAs={4} style={{ margin: 0 }}>
                    No spaces found
                  </Title>
                  <Paragraph size={"sm"}>
                    Looks like we could not find anything. Try a searching for
                    something different
                  </Paragraph>
                  <Link
                    scroll={false}
                    href={"/collections/" + id}
                    className={buttonVariants({
                      size: "xs",
                      className: "w-fit",
                    })}
                  >
                    <X className="mr-2 h-3 w-3" />
                    Clear Search
                  </Link>
                  <Search
                    className="absolute right-[25%] top-0 rotate-[-20deg] text-muted-foreground/25"
                    size={300}
                  />
                </div>
              ) : (
                <div className="gutter relative my-6 flex w-full flex-col gap-2 overflow-hidden rounded-xl bg-accent py-16 lg:my-7 xl:my-8">
                  <Title level={2} showAs={4} style={{ margin: 0 }}>
                    Get started with Collections
                  </Title>
                  <Paragraph size={"sm"}>
                    Add any space to this collection by clicking the bookmark
                    icon.
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
          )}
        </Await>
      </Suspense>
    </div>
  )
}
export default CollectionPage
