// @ts-nocheck
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

type Props = {
  src: string | null
  fallback: string
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

export const ClientAvatar: React.FC<Props> = ({
  src,
  fallback,
  size = "md",
}) => {
  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}
