"use client"

import { PanelResizeHandle } from "react-resizable-panels"

import { cn } from "@/lib/utils"

type Props = {
  className?: string
}
export const Resizer: React.FC<Props> = ({ className }) => {
  return <PanelResizeHandle className={cn("h-screen w-1 ", className)} />
}
