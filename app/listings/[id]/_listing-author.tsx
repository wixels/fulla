import { Prisma, User } from "@prisma/client"
import { Check, Star } from "lucide-react"
import qs from "qs"

import { Collection } from "@/types/collection-type"
import { Paragraph } from "@/components/ui/paragraph"
import { Separator } from "@/components/ui/separator"
import { Title } from "@/components/ui/title"
import { ClientAvatar } from "@/components/client-avatar"

async function getReviews(authorId: string) {
  const query = qs.stringify(
    {
      where: {
        landlord: {
          equals: authorId,
        },
      },
      limit: 1,
    },
    { addQueryPrefix: true }
  )
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL as string}/api/landlord-reviews${query}`,
    {
      next: {
        revalidate: 5,
      },
    }
  )
  return res.json()
}
export default async function ListingAuthor({
  author,
}: {
  author: Prisma.ListingGetPayload<{ include: { author: true } }>["author"]
}) {
  const reviews = []
  return (
    <section className="section flex w-full flex-col gap-6">
      <div className="flex items-center gap-6">
        <ClientAvatar
          fallback={author?.name?.[0] ?? ""}
          src={author?.image ?? ""}
        />
        <div>
          <Title
            className="font-semibold"
            style={{ margin: "0 0 0.625rem 0" }}
            level={3}
          >
            Hosted by {author?.name}
          </Title>
          <Paragraph className="text-muted-foreground" size={"sm"}>
            Joined in{" "}
            {new Intl.DateTimeFormat("en", {
              month: "short",
              year: "numeric",
            }).format(new Date(author?.createdAt!))}
          </Paragraph>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:gap-12">
        <div className="col-span-2 flex flex-col gap-6 lg:col-span-1">
          <div className="flex items-center gap-8">
            <Paragraph
              size={"lg"}
              className="flex items-center gap-2 font-semibold"
            >
              {/* <Star size={22} /> {reviews.totalDocs} Review
              {reviews.totalDocs === 1 ? "" : "s"} */}
              <Star size={22} /> TODO Reviews
            </Paragraph>
            <Paragraph
              size={"lg"}
              className="flex items-center gap-2 font-semibold"
            >
              <Check size={22} /> Identity verified
            </Paragraph>
          </div>
          <Paragraph size={"sm"} className="text-muted-foreground">
            Daniel is a really cool dude that codes things and does other thing
            such as playing golf and drinking whsikey.
          </Paragraph>
        </div>
        <div className="col-span-2 flex flex-col gap-6 lg:col-span-1">
          <Paragraph size={"sm"} className="text-muted-foreground">
            Language: English
          </Paragraph>
          <Paragraph size={"sm"} className="text-muted-foreground">
            Response Time: Within an hour
          </Paragraph>
        </div>
      </div>
      <Separator className="mt-16" />
    </section>
  )
}
