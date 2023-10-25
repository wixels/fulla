import { Suspense } from "react"
import { formatDistance } from "date-fns"

import { serverClient } from "@/lib/trpc/server"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Paragraph } from "@/components/ui/paragraph"
import { Skeleton } from "@/components/ui/skeleton"
import { Title } from "@/components/ui/title"
import { Await } from "@/components/await"
import { ClientAvatar } from "@/components/client-avatar"

import OverviewForm from "./_overview-form"

type Props = { params: { id: string } }

function formatName(fullName: string | undefined | null): string {
  if (!fullName) {
    return "" // Handle cases where fullName is undefined, null, or an empty string
  }

  const nameParts = fullName.split(" ")

  if (nameParts.length < 2) {
    return fullName // Handle names with only one part (no space)
  }

  const formattedName =
    nameParts[0] + " " + nameParts[nameParts.length - 1].charAt(0) + "."

  return formattedName
}
const OverviewPage: React.FC<Props> = async ({ params: { id } }) => {
  const property = await serverClient.org.property({ id })
  return (
    <div>
      <Card className="mb-10">
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent>
          <OverviewForm
            id={id}
            defaultValues={{
              address: property?.address ?? "",
              type: property?.type ?? "",
              size: property?.size ?? "",
            }}
          />
        </CardContent>
      </Card>
      <Title level={2} showAs={5}>
        Latest Activity
      </Title>
      <div className="relative">
        <Suspense
          fallback={
            <ul className="flex flex-col gap-4">
              {Array(10)
                .fill(Math.floor(Math.random() * 100))
                .map((number) => (
                  <li
                    style={{
                      width:
                        Math.floor(Math.random() * (90 - 40 + 1)) + 40 + "%",
                    }}
                    className="flex items-center gap-2"
                  >
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-6 w-full rounded-xl grow" />
                  </li>
                ))}
            </ul>
          }
        >
          <Await promise={serverClient.activity.propertyActivity({ id })}>
            {(activity) => (
              <ul className="flex flex-col gap-4">
                {activity.map((activity) => (
                  <li className="flex items-center gap-2">
                    <ClientAvatar
                      size="xs"
                      src={activity.author?.image ?? undefined}
                      fallback={activity?.author?.name?.[0] as string}
                    />
                    <p className="text-xs">
                      <span className="font-semibold">
                        {formatName(activity.author?.name)}{" "}
                      </span>
                      <span className="text-accent-foreground/50">
                        {activity.verb}{" "}
                      </span>
                      <span className="font-semibold">
                        {activity.task?.title}{" "}
                      </span>
                      <span className="font-semibold">
                        {activity.descriptor}{" "}
                      </span>
                      <span className="ml-4 text-xs text-accent-foreground/50">
                        {"    "}
                        {formatDistance(
                          new Date(activity.createdAt ?? Date.now()),
                          new Date(),
                          { addSuffix: true }
                        )}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Await>
        </Suspense>
        <Suspense
          fallback={
            <Button variant="link" size={"sm"} className="text-blue-500">
              Fetching Activity...
            </Button>
          }
        >
          <Await promise={serverClient.activity.propertyActivityCount({ id })}>
            {(count) =>
              count > 10 ? (
                <div className="absolute inset-x-0 bottom-0 flex h-1/5 w-full items-end justify-center bg-gradient-to-t from-background to-transparent">
                  <Button variant="link" size={"sm"} className="text-blue-500">
                    See All Activity ({count})
                  </Button>
                </div>
              ) : (
                <></>
              )
            }
          </Await>
        </Suspense>
      </div>
    </div>
  )
}
export default OverviewPage
