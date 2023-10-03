"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2, Plus } from "lucide-react"

import { forceDelay } from "@/lib/forceDelay"
import { trpc } from "@/lib/trpc/client"
import { toast, useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"

import { createDraftSpace } from "./actions"

type Props = {}
export const CreateButton: React.FC<Props> = ({}) => {
  const [pending, startTransition] = useTransition()
  const utils = trpc.useContext()
  const router = useRouter()
  const { toast } = useToast()
  const { mutateAsync } = trpc.space.create.useMutation({
    onSuccess(data) {
      router.push("./space/" + data.id + "/title")
      utils.spaces.drafts.invalidate()
    },
    onError() {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    },
  })
  return (
    <Button
      onClick={() =>
        startTransition(() => {
          forceDelay(mutateAsync())
        })
      }
      disabled={pending}
      variant={"secondary"}
    >
      Create New Space
      <motion.div
        animate={
          pending
            ? { y: 0, opacity: 1 }
            : { y: "100%", opacity: 0, display: "none" }
        }
      >
        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
      </motion.div>
      <motion.div
        animate={
          !pending
            ? { y: 0, opacity: 1 }
            : { y: "-100%", opacity: 0, display: "none" }
        }
      >
        <Plus className="ml-2 h-4 w-4" />
      </motion.div>
    </Button>
  )
}
