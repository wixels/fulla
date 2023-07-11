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
      {/* <div className="gutter sticky top-[3.65rem] flex items-center justify-between bg-background/90 py-2 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Suspense
            fallback={
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Setting up filters
              </Button>
            }
          >
            <FiltersModalWrapper />
          </Suspense>
          <div className={buttonVariants({ variant: "ghost", size: "sm" })}>
            <Plus className="text-muted-foreground" size={14} />
            <Input sizing={"sm"} placeholder="Add filter" variant={"ghost"} />
          </div>
        </div>
        <Select defaultValue="Latest">
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Latest">Latest</SelectItem>
            <SelectItem value="Most Popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div> */}
      <SpaceFeed initial={spaces} category={category} type={type} />
    </div>
  )
}
