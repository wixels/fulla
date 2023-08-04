import { SpaceCardSkeleton } from "@/components/space-cards/space-card-skeleton"

export default function Loading() {
  return (
    <div className="gutter grid w-full grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      <SpaceCardSkeleton />
      <SpaceCardSkeleton />
      <SpaceCardSkeleton />
      <SpaceCardSkeleton />
      <SpaceCardSkeleton />
      <SpaceCardSkeleton />
      <SpaceCardSkeleton />
      <SpaceCardSkeleton />
      <SpaceCardSkeleton />
      <SpaceCardSkeleton />
      <SpaceCardSkeleton />
    </div>
  )
}
