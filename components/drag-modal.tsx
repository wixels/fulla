"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Drawer } from "vaul"

import { cn } from "@/lib/utils"

type Props = {
  children: React.ReactNode
  hideHandle?: boolean
  className?: string
}
const DragModal: React.FC<Props> = ({
  children,
  className = "overflow-hidden fixed inset-x-0 bottom-0 z-10 mx-auto h-full max-h-[96%] w-screen max-w-2xl rounded-t-[10px] bg-background",
  hideHandle = false,
}) => {
  const router = useRouter()
  const [open, setOpen] = useState(true)
  return (
    <Drawer.Root
      shouldScaleBackground
      open={open}
      onOpenChange={(e) => {
        setOpen(e)
        if (!e) {
          setTimeout(() => router.back(), 500)
        }
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-10 bg-black/40" />
        <Drawer.Content className={cn(className)}>
          {!hideHandle && (
            <div className="mx-auto mb-8 mt-2 h-1 w-12 shrink-0 cursor-grab rounded-full bg-gray-300" />
          )}
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
export default DragModal
