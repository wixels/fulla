// @ts-nocheck
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

type Props = {
  src: string | undefined
  fallback: string
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

export const ClientAvatar: React.FC<Props> = ({
  src,
  fallback,
  size = "md",
}) => {
  return (
    <Avatar size={size}>
      <AvatarImage src={src} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}
