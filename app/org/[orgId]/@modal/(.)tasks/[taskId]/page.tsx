import { Suspense } from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"

import { db } from "@/lib/db"
import { serverClient } from "@/lib/trpc/server"
import { cn } from "@/lib/utils"
import { Badge, badgeVariants } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Title } from "@/components/ui/title"
import { Await } from "@/components/await"
import DragModal from "@/components/drag-modal"
import { TaskAssignees } from "@/components/task-assignees"
import { TaskStatus } from "@/components/task-status"

import Description from "./_description"
import { SubTasks } from "./_subtasks"

type Props = {
  params: {
    orgId: string
    taskId: string
  }
}
const listItemStyles = "flex w-full items-center justify-between border-t py-3"
const TaskPage: React.FC<Props> = async ({ params: { taskId } }) => {
  const task = await serverClient.task.task({ id: taskId })
  return (
    <DragModal>
      <div className="px-7">
        <Title level={1} showAs={4}>
          {task?.title}
        </Title>
        <Description
          propertyId={task?.propertyId as string}
          description={task?.description ?? ""}
          id={task?.id!}
        />
        <Suspense fallback="Fetching sub tasks...">
          <Await
            promise={serverClient.task.tasks([
              {
                key: "parentId",
                keyValue: taskId,
              },
            ])}
          >
            {(tasks) => (
              <SubTasks
                taskId={taskId}
                propertyId={task?.propertyId as string}
                initial={tasks}
              />
            )}
          </Await>
        </Suspense>
      </div>
      <div className="mt-12 flex h-full flex-col bg-accent/50 px-7 pt-12">
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
      </div>
    </DragModal>
  )
}
export default TaskPage
