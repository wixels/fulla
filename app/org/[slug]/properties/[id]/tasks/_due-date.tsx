import { useState } from "react"
import { Todo } from "@prisma/client"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"

import { trpc } from "@/lib/trpc/client"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Props = {
  propertyId: string
  todo: Todo
}
export const DueDate: React.FC<Props> = ({ todo }) => {
  const [date, setDate] = useState(todo.dueDate ?? undefined)

  const utils = trpc.useContext()
  const { toast } = useToast()
  const addDueDate = trpc.org.updatePropertyTodo.useMutation({
    onMutate: async () => {
      await utils.org.propertyTodos.cancel()
    },
    onSuccess: () => {
      console.log("inside onSuccess")
      toast({
        description: "Todo updated",
      })
    },
    onSettled: () => {
      void utils.org.propertyTodos.invalidate()
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
              {format(date, "PPP")}{" "}
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
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            setDate(date)
            addDueDate.mutate({
              id: todo.id,
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
