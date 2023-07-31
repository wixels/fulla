import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config"
import { Prisma } from "@prisma/client"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

import { SpaceFeed } from "./_space-feed"

function getRandomStrings(strings: string[]): string[] {
  const result: string[] = []

  // Generate a random number between 1 and the length of the array
  const count = Math.floor(Math.random() * strings.length) + 1

  // Shuffle the array using Fisher-Yates algorithm
  const shuffledStrings = [...strings]
  for (let i = shuffledStrings.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledStrings[i], shuffledStrings[j]] = [
      shuffledStrings[j],
      shuffledStrings[i],
    ]
  }

  // Select the first `count` elements from the shuffled array
  for (let i = 0; i < count; i++) {
    result.push(shuffledStrings[i])
  }

  return result
}

export default async function Page({
  params: { category, type },
  searchParams = {},
}: {
  params: { category: string; type: string }
  searchParams: QueryParams
}) {
  const [spaces] = await Promise.all([
    await (async () => {
      let params = {
        limit: INFINITE_SCROLL_PAGINATION_RESULTS.toString(),
        page: "1",
      }

      Object.keys(searchParams).forEach((key: string) => {
        if (searchParams?.[key as keyof typeof searchParams]) {
          params = {
            ...params,
            [key]: searchParams?.[key as keyof typeof searchParams],
          }
        }
      })
      const urlSearchParams = new URLSearchParams(params).toString()
      const query = `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/spaces/${type}/${category}${
        urlSearchParams && urlSearchParams?.length ? `?${urlSearchParams}` : ""
      }`

      const res = await fetch(query, {
        next: {
          revalidate: 60,
        },
      })
      if (!res.ok) {
        return []
      }
      const data = await res.json()
      return data as Prisma.SpaceGetPayload<{
        include: {
          organization: {
            include: {
              logo: true
            }
          }
          type: true
          category: true
          offerings: true
          highlights: true
          amenities: true
          images: true
        }
      }>[]
    })(),
  ])

  return (
    <div className="section-bottom flex grow flex-col">
      <SpaceFeed initial={spaces} category={category} type={type} />
    </div>
  )
}
