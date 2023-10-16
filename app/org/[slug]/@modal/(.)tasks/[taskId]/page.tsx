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
    slug: string
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
        <Description description={task?.description ?? ""} id={task?.id!} />
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
        {/* <li className={cn(listItemStyles)}>
                  <Label>Property</Label>
                  <Link
                    className={badgeVariants({ rounded: "md" })}
                    href={`../properties/${task?.propertyId}/overview`}
                  >
                    <Suspense
                      fallback={
                        <>
                          Fetching Property
                          <Loader2 className="ml-2 h-3 w-3 animate-spin" />
                        </>
                      }
                    >
                      <Await
                        promise={db.property.findFirst({
                          where: {
                            id: task?.propertyId!,
                          },
                          select: {
                            name: true,
                            id: true,
                          },
                        })}
                      >
                        {(property) => <span>{property?.name ?? ""}</span>}
                      </Await>
                    </Suspense>
                  </Link>
                </li> */}
      </div>
    </DragModal>
  )
}
export default TaskPage
