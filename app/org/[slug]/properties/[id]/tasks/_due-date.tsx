import { useState } from "react"
import { Task } from "@prisma/client"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"

import { trpc } from "@/lib/trpc/client"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Props = {
  withoutPortal?: boolean
  task: Task
}
export const DueDate: React.FC<Props> = ({ task, withoutPortal }) => {
  const [date, setDate] = useState(task.dueDate ?? undefined)
  const utils = trpc.useContext()
  const { toast } = useToast()
  const addDueDate = trpc.task.updateTask.useMutation({
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
    <Popover>
      <PopoverTrigger>
        <Badge
          variant="secondary"
          className="flex gap-2 rounded-sm px-1 font-normal"
        >
          {date ? (
            <>
              {date ? format(date, "PPP") : null}{" "}
              {addDueDate.isLoading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : null}
            </>
          ) : (
            <>
              <CalendarIcon size={12} />
              None
            </>
          )}
        </Badge>
      </PopoverTrigger>
      <PopoverContent withoutPrtal={withoutPortal} className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            setDate(date)
            addDueDate.mutate({
              id: task.id,
              data: {
                dueDate: date,
              },
            })
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
