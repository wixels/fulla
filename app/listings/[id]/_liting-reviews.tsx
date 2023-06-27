import { Suspense } from "react"
import { Star } from "lucide-react"
import qs from "qs"

import { Collection } from "@/types/collection-type"
import { ListingReview, User } from "@/types/payload-types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Paragraph } from "@/components/ui/paragraph"
import { Skeleton } from "@/components/ui/skeleton"
import { Title } from "@/components/ui/title"
import { ClientAvatar } from "@/components/client-avatar"

type Props = {
  listingId: string
}

// async function getReviews(listingId: string) {
//   const query = qs.stringify(
//     {
//       where: {
//         listing: {
//           equals: listingId,
//         },
//       },
//       limit: 3,
//     },
//     { addQueryPrefix: true }
//   )
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL as string}/api/listing-reviews${query}`,
//     {
//       next: {
//         revalidate: 5,
//       },
//     }
//   )
//   return res.json()
// }

type deepListingReview = ListingReview & { author: User }
export default async function ListingReviews({ listingId }: Props) {
  // const reviews: Collection & { docs: deepListingReview[] } = await getReviews(
  //   listingId
  // )
  // const avg =
  //   reviews.docs.reduce((sum, review) => sum + review.rating, 0) /
  //   reviews.docs.length
  return (
    <section className="flex flex-col gap-4">
      reviews
      {/* <Suspense
        fallback={
          <li className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex grow flex-col gap-2">
                <Skeleton className="h-4 w-1/2 rounded-sm" />
                <Skeleton className="h-4 w-1/2 rounded-sm" />
              </div>
            </div>
            <Skeleton className="h-4 w-[80%] rounded-sm" />
            <Skeleton className="h-4 w-[80%] rounded-sm" />
          </li>
        }
      >
        <Title className="flex items-center" level={3}>
          <Star size={28} />
          <span className="mx-2 font-semibold">{avg} • </span>
          <span className="underline">Fulla Certified</span>
        </Title>
        <ul className="flex flex-col gap-6">
          {reviews.docs.map((review) => (
            <li key={review.id} className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <ClientAvatar
                  src={review?.author?.avatar?.url || null}
                  fallback={review.author.firstName?.[0] ?? ""}
                />
                <div>
                  <p className="text-sm font-semibold">
                    {review.author?.firstName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Intl.DateTimeFormat("en", {
                      month: "short",
                      year: "numeric",
                    }).format(new Date(review.createdAt))}
                  </p>
                </div>
              </div>
              <Paragraph
                size={"sm"}
                className="line-clamp-3 w-[80%] text-muted-foreground"
              >
                {review.review}
              </Paragraph>
            </li>
          ))}
        </ul>
      </Suspense> */}
    </section>
  )
}

{
  /* <Avatar>
<AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" />
<AvatarFallback>DS</AvatarFallback>
</Avatar> */
}
