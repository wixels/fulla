import { Suspense } from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Await } from "@/components/await"
import { Icons } from "@/components/icons"

type Props = {
  params: { id: string; slug: string }
  searchParams: QueryParams
}
const tabs = ["all", "assigned to me", "assigned by me"]
const Tasks: React.FC<Props> = ({ params, searchParams }) => {
  function shouldTabBeActive(
    tab: string,
    searchParam: string | undefined
  ): boolean {
    return (tab === "all" && searchParam === undefined) || tab === searchParam
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        {tabs.map((tab) => (
          <Link
            href={"./tasks?taskFilter=" + tab}
            key={tab}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1 text-base transition-all",
              {
                "bg-foreground": shouldTabBeActive(
                  tab,
                  searchParams?.taskFilter as string
                ),
                "hover:bg-primary/10": tab !== searchParams?.taskFilter,
              }
            )}
          >
            <span
              className={cn("font-medium capitalize text-primary", {
                "text-primary-foreground": shouldTabBeActive(
                  tab,
                  searchParams?.taskFilter as string
                ),
              })}
            >
              {tab}
            </span>
            <span
              className={cn("font-medium text-primary", {
                "text-primary-foreground": shouldTabBeActive(
                  tab,
                  searchParams?.taskFilter as string
                ),
              })}
            >
              |
            </span>
            <span
              className={cn("text-primary/30", {
                "text-primary-foreground": shouldTabBeActive(
                  tab,
                  searchParams?.taskFilter as string
                ),
              })}
            >
              <Suspense
                fallback={<Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              >
                <Await>{(count) => <>0</>}</Await>
              </Suspense>
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
export default Tasks
