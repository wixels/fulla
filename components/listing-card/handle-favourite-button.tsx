"use client"

import { useTransition } from "react"
import clsx from "clsx"
import { Heart } from "lucide-react"

import { Favourite } from "@/types/payload-types"
import { useAuth } from "@/hooks/use-auth"

// import { favourite, unfavourite } from "../../app/listings/[id]/actions"

type Props = {
  favorite?: Favourite | null
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
        // startTransition(async () => {
        //   if (!favorite) {
        //     await favourite({ listingId: listingId, userId: user.id })
        //   } else {
        //     await unfavourite({ favoriteId: favorite.id })
        //   }
        // })
      }}
      className={
        favorite
          ? "flex cursor-pointer items-center justify-center rounded-full border border-red-500/20 bg-red-500/20 p-2 text-red-500 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/20 hover:text-white"
          : "flex cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:text-red-500"
      }
    >
      {pending ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-orbit animate-spin"
        >
          <circle cx="12" cy="12" r="3" />
          <circle cx="19" cy="5" r="2" />
          <circle cx="5" cy="19" r="2" />
          <path d="M10.4 21.9a10 10 0 0 0 9.941-15.416" />
          <path d="M13.5 2.1a10 10 0 0 0-9.841 15.416" />
        </svg>
      ) : (
        <Heart size={14} />
      )}
    </button>
  )
}
