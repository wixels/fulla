import { Suspense } from "react"
import { cookies } from "next/headers"
import Link from "next/link"
import {
  AlignLeft,
  ChevronDown,
  MoreHorizontal,
  Plus,
  PlusCircle,
  Search,
} from "lucide-react"

import { serverClient } from "@/lib/trpc/server"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Await } from "@/components/await"

import { Panel } from "./_panel"
import { Panels } from "./_panels"
import { Resizer } from "./_resizer"

export const dynamic = "force-dynamic"

export default function Layout({
  children,
  params: { orgId },
}: {
  children: React.ReactNode
  params: { orgId: string }
}) {
  const layout = cookies().get("react-resizable-panels:layout")

  let defaultLayout
  if (layout) {
    defaultLayout = JSON.parse(layout.value)
  }
  return (
    <Panels>
      <Panel
        defaultSize={defaultLayout?.[0] ?? 30}
        className="relative h-screen bg-accent/60"
      >
        <div className="flex flex-col gap-1 px-2 pt-6">
          <button className="mr-2 flex w-full items-center justify-between rounded-sm px-[10px] py-[6px] text-sm font-semibold text-accent-foreground/50 transition-all hover:bg-accent">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span>Search</span>
            </div>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>P
            </kbd>
          </button>
          <button className="mr-2 flex w-full items-center justify-between rounded-sm px-[10px] py-[6px] text-sm font-semibold text-accent-foreground/50 transition-all hover:bg-accent">
            <div className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span>New Page</span>
            </div>
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-2 px-2">
          <Label className="ml-2 text-accent-foreground/50">Pages</Label>
          <Suspense key={"pages"} fallback="Fetching pages...">
            <Await
              promise={serverClient.page.list([
                {
                  key: "organizationId",
                  keyValue: orgId,
                },
              ])}
            >
              {(pages) => (
                <div>
                  {pages.map((page) => (
                    <Link
                      href={`/org/${orgId}/pages/${page.id}`}
                      key={page.id}
                      className="group mr-2 flex w-full items-center justify-between rounded-sm px-[10px] py-[6px] text-sm font-semibold text-accent-foreground/50 transition-all hover:bg-accent"
                    >
                      <div className="flex cursor-pointer items-center gap-2">
                        {page.subPagesCount > 0 ? (
                          <ChevronDown className="h-4 w-4 rounded-md transition-all hover:bg-accent-foreground/10" />
                        ) : (
                          <AlignLeft className="h-4 w-4" />
                        )}
                        <span className="line-clamp-1">{page.title}</span>
                      </div>
                      <TooltipProvider delayDuration={0}>
                        <div className="flex items-center gap-2 opacity-0 transition-all group-hover:opacity-100">
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <MoreHorizontal className="h-4 w-4 rounded-md transition-all hover:bg-accent-foreground/10" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                              <DropdownMenuItem>
                                Add to Favourites
                              </DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem>Rename</DropdownMenuItem>
                              <DropdownMenuItem>Copy Link</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>

                          <Tooltip>
                            <TooltipTrigger>
                              <Plus className="h-4 w-4 rounded-md transition-all hover:bg-accent-foreground/10" />
                            </TooltipTrigger>
                            <TooltipContent>Add a sub page</TooltipContent>
                          </Tooltip>
                        </div>
                      </TooltipProvider>
                    </Link>
                  ))}
                </div>
              )}
            </Await>
          </Suspense>
        </div>
        <Resizer className="absolute inset-y-0 right-0 transition-colors hover:bg-blue-400" />
      </Panel>
      <Panel defaultSize={defaultLayout?.[1]} className="h-screen">
        {children}
      </Panel>
    </Panels>
  )
}
