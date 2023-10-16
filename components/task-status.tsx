"use client"

import { useState } from "react"
import { Task, TaskStatus as TaskStatusType } from "@prisma/client"
import { Loader2 } from "lucide-react"

import { trpc } from "@/lib/trpc/client"
import { serverClient } from "@/lib/trpc/server"
import { useToast } from "@/hooks/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
  // @ts-ignore
  task: Awaited<ReturnType<typeof serverClient["task.task"]>>
}
export const TaskStatus: React.FC<Props> = ({ task }) => {
  const [status, setStatus] = useState(task.status ?? "")
  const utils = trpc.useContext()
  const { toast } = useToast()
  const updateStatus = trpc.task.updateTask.useMutation({
    onMutate: async () => {
      await utils.task.tasks.cancel()
      await utils.task.task.cancel()
    },
    onSuccess: () => {
      toast({
        description: "Task updated",
      })
    },
    onSettled: () => {
      void utils.task.tasks.invalidate()
      void utils.task.task.invalidate()
    },
  })

  return (
    <Select
      value={status}
      disabled={updateStatus.isLoading}
      onValueChange={(value: TaskStatusType) => {
        setStatus(value)
        updateStatus.mutate({
          id: task.id,
          data: {
            status: value,
          },
        })
      }}
    >
      <SelectTrigger sizing={"xs"} variant={"secondary"}>
        <SelectValue placeholder="Theme" />
        {updateStatus.isLoading ? (
          <Loader2 className="mx-2 h-3 w-3 animate-spin" />
        ) : null}
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="in_progress">In Progress</SelectItem>
        <SelectItem value="blocked">blocked</SelectItem>
        <SelectItem value="archived">Archived</SelectItem>
        <SelectItem value="todo">Todo</SelectItem>
      </SelectContent>
    </Select>
  )
}
