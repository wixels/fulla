"use client"

import { useTransition } from "react"
import clsx from "clsx"
import { Heart } from "lucide-react"

import { Favourite } from "@/types/payload-types"
import { useAuth } from "@/hooks/use-auth"

import { favourite, unfavourite } from "../../app/listings/[id]/actions"

type Props = {
  favorite?: Favourite
  listingId: string
}
export const HandleFavouriteButton: React.FC<Props> = ({
  favorite,
  listingId,
}) => {
  console.log("favorite from button header::: ", favorite)
  const [pending, startTransition] = useTransition()
  const { user } = useAuth()
  if (!user) return null
  return (
    <button
      disabled={pending}
      onClick={(e) => {
        e.preventDefault()
        startTransition(async () => {
          if (!favorite) {
            await favourite({ listingId: listingId, userId: user.id })
          } else {
            await unfavourite({ favoriteId: favorite.id })
          }
        })
      }}
      className={clsx(
        "flex cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:text-red-500",
        {
          "border-red-500/20 bg-red-500/20 p-2 text-red-500 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/20 hover:text-white":
            favorite,
        }
      )}
    >
      <Heart size={14} />
    </button>
  )
}
