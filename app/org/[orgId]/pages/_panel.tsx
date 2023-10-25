"use client"

import { PanelGroup, Panel as RPanel } from "react-resizable-panels"

import { cn } from "@/lib/utils"

type Props = {
  children: React.ReactNode
  defaultSize?: number | undefined
  className?: string
}
export const Panel: React.FC<Props> = ({
  children,
  defaultSize,
  className,
}) => {
  return (
    <RPanel defaultSize={defaultSize} className={cn(className)}>
      {children}
    </RPanel>
  )
}
