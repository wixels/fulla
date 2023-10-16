"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"

import { trpc } from "@/lib/trpc/client"
import { useDebouncedState } from "@/hooks/use-debounced-state"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

type Props = {
  description: string
  id: string
}
const Description: React.FC<Props> = ({ description, id }) => {
  const [value, setValue] = useDebouncedState(description, 500)
  const { data: session } = useSession()
  const utils = trpc.useContext()
  const { toast } = useToast()
  const updateDescription = trpc.task.updateTask.useMutation({
    onMutate: async () => {
      await utils.task.tasks.cancel()
      await utils.task.task.cancel()
    },
    onSuccess: () => {
      toast({
        description: "task updated",
      })
    },
    onSettled: () => {
      void utils.task.tasks.invalidate()
      void utils.task.task.invalidate()
    },
  })
  useEffect(() => {
    if (value === description) return
    updateDescription.mutate({
      id,
      data: {
        description: value,
      },
    })
  }, [value])
  return (
    <Input
      defaultValue={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      variant={"ghost"}
      className="w-full px-0"
      placeholder="Add description..."
    />
  )
}
export default Description
