"use client"

import { useTransition } from "react"
import { Favourite } from "@prisma/client"
import { Heart } from "lucide-react"
import { useSession } from "next-auth/react"

import { favourite, unfavourite } from "@/app/listings/[id]/actions"

import { Spin } from "../spin"

type Props = {
  favorite?: Favourite | null
  listingId: string
}
export const HandleFavouriteButton: React.FC<Props> = ({
  favorite,
  listingId,
}) => {
  const [pending, startTransition] = useTransition()
  const { data: session } = useSession()
  if (!session || !session.user) return null
  return (
    <button
      disabled={pending}
      onClick={(e) => {
        e.preventDefault()
        startTransition(async () => {
          if (!favorite) {
            await favourite({ listingId: listingId, userId: session.user.id })
          } else {
            await unfavourite({ listingId: listingId })
          }
        })
      }}
      className={
        favorite
          ? "flex cursor-pointer items-center justify-center rounded-full border border-red-500/20 bg-red-500/20 p-2 text-red-500 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/20 hover:text-white"
          : "flex cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:text-red-500"
      }
    >
      {pending ? <Spin /> : <Heart size={14} />}
    </button>
  )
}
