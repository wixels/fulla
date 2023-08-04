import { Skeleton } from "../ui/skeleton"

type Props = {}
export const SpaceCardSkeleton: React.FC<Props> = ({}) => {
  return (
    <div className="group flex w-full grid-cols-1 flex-col gap-4">
      <Skeleton className="aspect-[16/11] object-cover" />

      {/* <Skeleton className="w-full h-12" /> */}
      <div className="flex items-center justify-between gap-x-3">
        <div className="flex w-full items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex w-full flex-col gap-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-xl" />
          <Skeleton className="h-9 w-9 rounded-xl" />
        </div>
      </div>
    </div>
  )
}
