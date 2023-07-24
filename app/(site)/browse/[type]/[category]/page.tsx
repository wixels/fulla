import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config"
import { Prisma } from "@prisma/client"

import { db } from "@/lib/db"

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
  searchParams?: {
    search?: string
  }
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
      const data = await res.json()
      return data as Prisma.SpaceGetPayload<{
        include: {
          organization: true
          type: true
          category: true
          highlights: true
          amenities: true
          offerings: true
          images: true
        }
      }>[]
    })(),
    // await (async () => {
    //   const update = await db.space.update({
    //     where: {
    //       id: "ck8mv8m5u0023uqpk35v0r5ju",
    //     },
    //     data: {
    //       images: {
    //         connect: [
    //           { id: "clkclji6b0000lscx9prvrimn" },
    //           { id: "clkclji6c0001lscx2w3wy6m9" },
    //           { id: "clkclji6c0002lscxdhc8tar7" },
    //           { id: "clkclji6c0003lscxf39fefsa" },
    //         ],
    //       },
    //     },
    //   })
    //   console.log("update::: ", update)
    // })(),
  ])

  return (
    <div className="section-bottom flex grow flex-col">
      <SpaceFeed initial={spaces} category={category} type={type} />
    </div>
  )
}
