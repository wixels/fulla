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
  const offeringsIds = [
    "cljstcwcg000ilsxxtl3bew1v",
    "cljstcwcg000jlsxx0j4zcysq",
    "cljstcwcg000klsxx0l86472l",
    "cljstcwcg000llsxxp6tfv3in",
    "cljstcwch000mlsxxu2uhe31x",
    "cljstcwch000nlsxxbzgteptw",
    "cljstcwch000olsxx163jg9zc",
  ]
  const highlightsIds = [
    "cljstcuz7000dlsxxtp3hppr2",
    "cljstcuz7000elsxx96cfilyl",
    "cljstcuz7000flsxxl7290p49",
    "cljstcuz7000glsxxhof558vx",
    "cljstcuz7000hlsxxmmaylep5",
  ]

  const amenitiesIds = [
    "cljstctl10006lsxx6eqa94s0",
    "cljstctl1000blsxxxe95ll88",
    "cljstctl10008lsxxnwws9o2l",
  ]
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
      console.log("urlSearchParams from page::: ", params)
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
          type: true
          category: true
          highlights: true
          amenities: true
          offerings: true
        }
      }>[]
    })(),
    // await (async () => {
    //   const update = await db.space.update({
    //     where: {
    //       id: "ck8mv8m5u0023uqpk35v0r5ju",
    //     },
    //     data: {
    //       offerings: {
    //         connect: getRandomStrings(offeringsIds).map((string) => ({
    //           id: string,
    //         })),
    //       },
    //       amenities: {
    //         connect: getRandomStrings(amenitiesIds).map((string) => ({
    //           id: string,
    //         })),
    //       },
    //       highlights: {
    //         connect: getRandomStrings(highlightsIds).map((string) => ({
    //           id: string,
    //         })),
    //       },
    //     },
    //   })
    //   console.log("update::: ", update)
    // })(),
  ])

  return (
    <div className="section-bottom flex grow flex-col">
      <SpaceFeed initial={spaces} category={category} type={type} />
      {/* <div className="gutter grid w-full grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {spaces.map(({ id, title, rooms, desks, ...space }, index) => (
          <div
            key={id}
            className="flex aspect-square flex-col gap-3 bg-red-200"
          >
            <span> {title}</span>
            <span>Rooms: {rooms}</span>
            <span>Desks: {desks}</span>
            <span>
              Offerings: {space.offerings?.map((x) => x?.label)?.join(" ,")}
            </span>
            <span>
              Highlights: {space.highlights?.map((x) => x?.label)?.join(" ,")}
            </span>
            <span>
              Amenities: {space.amenities?.map((x) => x?.label)?.join(" ,")}
            </span>
            <span>id: {id}</span>
          </div>
        ))}
      </div> */}
    </div>
  )
}

{
  /*  */
}
{
  /* {spaces?.map(({ id, title, rooms, desks, ...space }, index) =>  ())} */
}
