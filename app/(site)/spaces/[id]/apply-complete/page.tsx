import { Suspense } from "react"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import Balancer from "react-wrap-balancer"

import { serverClient } from "@/lib/trpc/server"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Skeleton } from "@/components/ui/skeleton"
import { Title } from "@/components/ui/title"
import { Await } from "@/components/await"
import { ReadOnlySpaceCard } from "@/components/space-cards/read-only-space-card"

import { CardWrapper } from "./card-wrapper"

type Props = {
  params: { id: string }
}
const ProposalCompletion: React.FC<Props> = async ({ params: { id } }) => {
  return (
    <div className="gutter section flex-col items-center justify-center">
      <Suspense
        fallback={
          <>
            <div className="relative mt-6 flex w-full flex-col items-center">
              <div className="flex items-center text-center text-green-700">
                <CheckCircle2 className="mr-2 h-5 w-5" />
                <span className="text-sm">You have successfully applied!</span>
              </div>

              <Title
                level={1}
                showAs={3}
                className="text-center font-mono font-bold"
              >
                You have applied for:
                <Skeleton className="block h-8 w-full rounded lg:h-9 xl:h-10"></Skeleton>
              </Title>
            </div>
            <div
              className={cn("relative mx-auto w-full max-w-xl")}
              style={{ perspective: 800 }}
            >
              <CardWrapper>
                <div className="flex w-full flex-col gap-4">
                  <Skeleton className="aspect-[16/11] object-cover" />
                  <div className="flex items-center justify-between gap-x-3">
                    <div className="flex w-full items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="flex w-full flex-col gap-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-[100px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardWrapper>
            </div>
          </>
        }
      >
        <Await promise={serverClient.space.published({ id })}>
          {(space) => (
            <>
              <div className="relative mt-6 flex w-full flex-col items-center">
                <div className="flex items-center text-center text-green-700">
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  <span className="text-sm">
                    You have successfully applied!
                  </span>
                </div>

                <Title
                  level={1}
                  showAs={3}
                  className="text-center font-mono font-bold"
                >
                  You have applied for:
                  <span className="block font-normal">{space?.title}</span>
                </Title>
              </div>
              <div
                className={cn("relative mx-auto w-full max-w-xl")}
                style={{ perspective: 800 }}
              >
                <CardWrapper>
                  <ReadOnlySpaceCard space={space} />
                </CardWrapper>
              </div>
            </>
          )}
        </Await>
      </Suspense>

      <div className="relative mt-6 flex w-full flex-col items-center">
        <Paragraph
          size={"sm"}
          className="mt-2.5 w-full text-center font-medium text-muted-foreground/60 lg:w-1/3"
        >
          <Balancer>
            Thank you for applying! You will receive an Email copy of the
            application.
          </Balancer>
        </Paragraph>
        <div className="mt-8 flex w-full max-w-sm items-center justify-center gap-4">
          <Link href={"/"} className={buttonVariants({})}>
            Continue Browsing
          </Link>
          <Link
            href={"/applications"}
            className={buttonVariants({ variant: "secondary" })}
          >
            Go to Applications
          </Link>
        </div>
      </div>
    </div>
  )
}
export default ProposalCompletion
