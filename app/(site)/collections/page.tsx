import { Suspense } from "react"
import Link from "next/link"
import { Bookmark, Plus } from "lucide-react"

import { serverClient } from "@/lib/trpc/server"
import { buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Skeleton } from "@/components/ui/skeleton"
import { Title } from "@/components/ui/title"
import { Await } from "@/components/await"

import { SearchCollections } from "./_search"

export const dynamic = "force-dynamic"

export default async function Page({
  searchParams,
}: {
  searchParams: QueryParams
}) {
  return (
    <div className=" section">
      <Title showAs={2} className="gutter font-mono font-semibold">
        Collections
      </Title>
      <div className="gutter flex flex-col items-center gap-4 sm:flex-row">
        <SearchCollections />
        <Link
          href={"/collections/create"}
          className={buttonVariants({
            rounded: "full",
            className: "w-full sm:w-fit",
          })}
        >
          New Collection
        </Link>
      </div>

      <Suspense
        key={(searchParams["q"]?.toString() as string) ?? ""}
        fallback={
          <ul className="mt-4 w-full lg:mt-8">
            <li className="gutter mb-1">
              <Skeleton className="h-12 w-full rounded-xl" />
            </li>
            <li className="gutter mb-1">
              <Skeleton className="h-12 w-full rounded-xl" />
            </li>
            <li className="gutter mb-1">
              <Skeleton className="h-12 w-full rounded-xl" />
            </li>
          </ul>
        }
      >
        <Await promise={serverClient.collections({ ...(searchParams ?? {}) })}>
          {(collections) => (
            <>
              {collections.length ? (
                <ul className="mt-4 w-full lg:mt-8">
                  <li className="gutter flex w-full items-center">
                    <span className="w-3/4 text-xs text-accent-foreground/50">
                      Title
                    </span>
                    <span className="w-1/4 text-xs text-accent-foreground/50">
                      Spaces
                    </span>
                    <span className="w-1/4 text-xs text-accent-foreground/50">
                      Last Updated
                    </span>
                  </li>
                  {collections?.map((collection) => (
                    <li
                      key={collection.id}
                      className="flex w-full items-center"
                    >
                      <Link
                        className="group gutter flex w-full grow cursor-pointer items-center py-3 hover:bg-accent"
                        href={`/collections/${collection?.id}`}
                      >
                        <span className="w-3/4 font-semibold group-hover:underline">
                          {collection.title}
                        </span>
                        <span className="w-1/4 font-semibold">
                          {collection?.spaceCount ?? 0}
                        </span>
                        <span className="w-1/4 font-semibold">
                          {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }).format(new Date(collection?.updatedAt!))}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="gutter">
                  <div className="gutter relative mt-4 flex w-full flex-col gap-2 overflow-hidden rounded-xl bg-accent py-16">
                    <Title level={2} showAs={4} style={{ margin: 0 }}>
                      Get started with Collections
                    </Title>
                    <Paragraph size={"sm"}>
                      Manage your favourite spaces by creating collections.
                    </Paragraph>
                    <Link
                      scroll={false}
                      href={"/collections/create"}
                      className={buttonVariants({
                        size: "xs",
                        className: "w-fit",
                      })}
                    >
                      <Plus className="mr-2 h-3 w-3" />
                      Create a Collection
                    </Link>
                    <Bookmark
                      className="absolute right-[25%] top-0 rotate-[-20deg] text-muted-foreground/25"
                      size={300}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </Await>
      </Suspense>
    </div>
  )
}
