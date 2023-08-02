"use client"

import { useTransition } from "react"
import { Loader2 } from "lucide-react"

import { forceDelay } from "@/lib/forceDelay"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

import { createDraftSpace } from "./actions"

type Props = {
  orgId: string | undefined
}
export const CreateButton: React.FC<Props> = ({ orgId }) => {
  const [pending, startTransition] = useTransition()
  return (
    <Button
      onClick={() =>
        startTransition(() => {
          if (!orgId) {
            toast({
              title: "Uh oh! Something went wrong.",
              description: "It seems as if you don't belong to a company",
            })
          } else {
            forceDelay(createDraftSpace(orgId), 1000)
          }
        })
      }
      disabled={pending}
      variant={"secondary"}
    >
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Create New Space
    </Button>
  )
}
