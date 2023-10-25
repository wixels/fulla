import { Task } from "@prisma/client"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Title } from "@/components/ui/title"
import { TaskAssignees } from "@/components/task-assignees"
import { TaskStatus } from "@/components/task-status"

type Props = {
  task: Task
}

const listItemStyles = "flex w-full items-center justify-between border-t py-3"
export const TaskDetails: React.FC<Props> = ({ task }) => {
  return (
    <ul className="flex flex-col">
      <Title level={3} showAs={6}>
        Task Details:
      </Title>
      <li className={cn(listItemStyles)}>
        <Label>Status</Label>
        <TaskStatus task={task} />
      </li>
      <li className={cn(listItemStyles)}>
        <Label>Assignees</Label>
        <TaskAssignees task={task} withoutPortal />
      </li>
      <li className={cn(listItemStyles)}>
        <Label>Property</Label>
        <TaskAssignees task={task} withoutPortal />
      </li>
    </ul>
  )
}
