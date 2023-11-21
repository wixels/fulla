import { Suspense } from "react"
import { Loader2, Star } from "lucide-react"
import Balancer from "react-wrap-balancer"

import { serverClient } from "@/lib/trpc/server"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { Await } from "@/components/await"
import { ClientAvatar } from "@/components/client-avatar"

type Props = {
  reviews: Awaited<ReturnType<typeof serverClient.reviews.reviewForSpace>>
  id: string
}
export const Reviews: React.FC<Props> = ({ reviews, id }) => {
  console.log("revs::: ", reviews)
  return (
    <section className="gutter section-bottom mx-auto w-full max-w-screen-xl">
      <Title className="flex items-center gap-3 font-bold" level={2} showAs={4}>
        <Star fill="var(--background)" />
        <Suspense fallback={<Loader2 className="mr-2 h-3 w-3 animate-spin" />}>
          <Await promise={serverClient.reviews.ratingForSpace({ spaceId: id })}>
            {(rating) => <>{rating}</>}
          </Await>
        </Suspense>
        {" • "}
        <span className="font-mono font-normal italic">
          {reviews.length} Review
          {reviews.length === 1 ? "" : "s"}
        </span>
      </Title>
      <ul className="flex flex-col gap-6">
        {reviews.map((review) => (
          <li key={review.id} className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <ClientAvatar
                src={review.author?.image || undefined}
                fallback={review.author?.name?.[0] ?? ""}
              />
              <div>
                <p className="text-sm font-semibold">{review.author?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Intl.DateTimeFormat("en", {
                    month: "short",
                    year: "numeric",
                  }).format(new Date(review.createdAt!))}
                </p>
              </div>
            </div>
            <Paragraph
              size={"sm"}
              className="line-clamp-3 w-[80%] text-muted-foreground"
            >
              <Balancer>{review.body}</Balancer>
            </Paragraph>
          </li>
        ))}
      </ul>
    </section>
  )
}
