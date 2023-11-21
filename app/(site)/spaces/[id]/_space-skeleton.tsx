import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Title } from "@/components/ui/title"
import { Grid } from "@/components/grid"

type Props = {}
export const SpaceSkeleton: React.FC<Props> = ({}) => {
  return (
    <>
      <div className="relative">
        <Skeleton className="relative aspect-video max-h-[50vh] w-screen overflow-hidden"></Skeleton>
        <div className="absolute inset-x-0 bottom-0 z-10 h-3/4 bg-gradient-to-t from-background to-transparent"></div>
      </div>
      <div className="gutter relative z-10 mx-auto -mt-16 flex w-full max-w-screen-xl flex-col">
        <div className="flex w-2/3 flex-col">
          <Skeleton className="my-6 h-9 w-1/2 lg:my-7 xl:my-8"></Skeleton>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <Skeleton className="h-5 w-3/4 lg:h-6 xl:h-7"></Skeleton>
              <Skeleton className="h-5 w-full lg:h-6 xl:h-7"></Skeleton>
              <Skeleton className="h-5 w-1/4 lg:h-6 xl:h-7"></Skeleton>
            </div>
            <div className="flex w-full flex-wrap gap-2 lg:w-3/4">
              <Skeleton className="h-[1.125rem] w-12 rounded-full" />
              <Skeleton className="h-[1.125rem] w-12 rounded-full" />
              <Skeleton className="h-[1.125rem] w-12 rounded-full" />
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-12 w-12 rounded-full"></Skeleton>
                <Skeleton className="h-5 w-full"></Skeleton>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-12 w-12 rounded-full"></Skeleton>
                <Skeleton className="h-5 w-full"></Skeleton>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-12 w-12 rounded-full"></Skeleton>
                <Skeleton className="h-5 w-full"></Skeleton>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-12 w-12 rounded-full"></Skeleton>
                <Skeleton className="h-5 w-full"></Skeleton>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-12 w-12 rounded-full"></Skeleton>
                <Skeleton className="h-5 w-full"></Skeleton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="gutter section mx-auto flex w-full max-w-screen-xl flex-col gap-6">
        <div className="flex items-center gap-6">
          <Title level={2} showAs={3} style={{ margin: 0 }}>
            Gallery
          </Title>
          <div className="h-[1px] grow bg-border"></div>
          <Button size={"xs"} rounded={"full"} variant={"outline"}>
            Show All <Loader2 className="ml-2 h-3 w-3 animate-spin" />
          </Button>
        </div>
        <Grid gap="xs" className="w-full">
          <Skeleton className="relative col-span-7 h-full rounded-xl" />
          <div className="col-span-5 flex h-full flex-col gap-1 md:gap-2 lg:gap-4 xl:gap-6">
            <Skeleton className="relative aspect-video w-full rounded-xl" />
            <Skeleton className="relative aspect-video w-full rounded-xl" />
          </div>
        </Grid>
      </div>
    </>
  )
}
