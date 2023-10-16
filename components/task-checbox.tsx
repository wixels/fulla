"use client"

import { Task } from "@prisma/client"

import { trpc } from "@/lib/trpc/client"
import { useToast } from "@/hooks/use-toast"
import { Checkbox as TodoCheckbox } from "@/components/ui/checkbox"

type Props = {
  task: Task
}
export const TaskCheckbox: React.FC<Props> = ({ task }) => {
  const utils = trpc.useContext()
  const { toast } = useToast()
  const completeTodo = trpc.task.updateTask.useMutation({
    onMutate: async () => {
      await utils.task.tasks.cancel()
      await utils.task.task.cancel()
    },
    onSuccess: () => {
      toast({
        description: "Todo updated",
      })
    },
    onSettled: () => {
      void utils.task.tasks.invalidate()
      void utils.task.task.invalidate()
    },
  })
  return (
    <TodoCheckbox
      defaultChecked={task.completed}
      onCheckedChange={(checked) =>
        completeTodo.mutate({
          id: task.id,
          data: {
            completed: checked,
          },
        })
      }
    />
  )
}
