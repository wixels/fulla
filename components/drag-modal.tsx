"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Drawer } from "vaul"

type Props = {
  children: React.ReactNode
  hideHandle?: boolean
  className?: string
  onClose?: () => void // Add this prop
}
const DragModal: React.FC<Props> = ({
  children,
  onClose,
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
          if (onClose) {
            onClose() // Call onClose if provided
          } else {
            setTimeout(() => router.back(), 500)
          }
        }
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-10 bg-black/40" />
        <Drawer.Content className="fixed inset-0 z-10 mx-auto flex w-screen max-w-2xl flex-col justify-end">
          <div className="mt-6 h-full overflow-scroll rounded-t-xl bg-background">
            {!hideHandle && (
              <div className="mx-auto mb-8 mt-2 h-1 w-12 shrink-0 cursor-grab rounded-full bg-gray-300" />
            )}
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
export default DragModal
