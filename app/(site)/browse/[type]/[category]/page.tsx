import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config"
import { Prisma } from "@prisma/client"

import { SpaceFeed } from "./_space-feed"

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
      console.log("urlSearchParams from page::: ", urlSearchParams)
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
        include: { type: true; category: true }
      }>[]
    })(),
  ])

  return (
    <div className="section-bottom flex grow flex-col">
      <SpaceFeed initial={spaces} category={category} type={type} />
    </div>
  )
}
