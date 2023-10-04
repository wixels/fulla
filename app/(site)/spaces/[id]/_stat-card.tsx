import { Suspense } from "react"
import {
  ChevronRight,
  Circle,
  CircleDot,
  DollarSign,
  Loader2,
} from "lucide-react"

import { db } from "@/lib/db"
import { Paragraph } from "@/components/ui/paragraph"
import { Await } from "@/components/await"

type StatCarProps = {
  category: string
  type: string
  price: number
}
export const StatCard: React.FC<StatCarProps> = async ({
  category,
  price,
  type,
}) => {
  return (
    <ul className="flex h-fit w-1/3 flex-col gap-6 rounded-xl border border-border bg-background/20 p-5 backdrop-blur-md">
      <li className="flex flex-col gap-1">
        <Circle className="h-4 w-4" />
        <Paragraph size={"xs"} className="text-muted-foreground">
          Category
        </Paragraph>
        <Paragraph
          size="sm"
          className="flex cursor-pointer items-center gap-2 transition-all hover:underline"
        >
          {category}{" "}
          <Suspense fallback={<Loader2 className="h-3 w-3 animate-spin" />}>
            <Await
              promise={db.space.count({
                where: {
                  category: {
                    key: {
                      equals: category,
                    },
                  },
                },
              })}
            >
              {(count) => (
                <>
                  (+{count} Similar) <ChevronRight className="h-3 w-3" />
                </>
              )}
            </Await>
          </Suspense>
        </Paragraph>
      </li>
      <li className="flex flex-col gap-1">
        <CircleDot className="h-4 w-4" />
        <Paragraph size={"xs"} className="text-muted-foreground">
          Type
        </Paragraph>
        <Paragraph
          size="sm"
          className="flex cursor-pointer items-center gap-2 transition-all hover:underline"
        >
          {type}{" "}
          <Suspense fallback={<Loader2 className="h-3 w-3 animate-spin" />}>
            <Await
              promise={db.space.count({
                where: {
                  type: {
                    key: {
                      equals: type,
                    },
                  },
                },
              })}
            >
              {(count) => (
                <>
                  (+{count} Similar) <ChevronRight className="h-3 w-3" />
                </>
              )}
            </Await>
          </Suspense>
        </Paragraph>
      </li>
      <li className="flex flex-col gap-1">
        <DollarSign className="h-4 w-4" />
        <Paragraph size={"xs"} className="text-muted-foreground">
          Price
        </Paragraph>
        <Paragraph
          size="sm"
          className="flex cursor-pointer items-center gap-2 transition-all hover:underline"
        >
          {new Intl.NumberFormat().format(price || 0)} / month{" "}
          <Suspense fallback={<Loader2 className="h-3 w-3 animate-spin" />}>
            <Await
              promise={db.space.count({
                where: {
                  OR: [
                    {
                      price: {
                        lte: price + (price * 10) / 100,
                        gte: price - (price * 10) / 100,
                      },
                    },
                  ],
                },
              })}
            >
              {(count) => (
                <>
                  (+{count} at this rate) <ChevronRight className="h-3 w-3" />
                </>
              )}
            </Await>
          </Suspense>
        </Paragraph>
      </li>
    </ul>
  )
}
