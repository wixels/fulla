"use client"

import { PanelGroup } from "react-resizable-panels"

import { cn } from "@/lib/utils"

type Props = {
  children: React.ReactNode
  className?: string
}
export const Panels: React.FC<Props> = ({ children, className }) => {
  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
  }
  return (
    <PanelGroup
      className={cn(className)}
      direction="horizontal"
      onLayout={onLayout}
    >
      {children}
    </PanelGroup>
  )
}
