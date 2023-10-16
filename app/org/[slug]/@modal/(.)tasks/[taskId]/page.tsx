import { Suspense } from "react"

import { serverClient } from "@/lib/trpc/server"
import { Title } from "@/components/ui/title"
import { Await } from "@/components/await"
import DragModal from "@/components/drag-modal"

import Description from "./_description"
import { SubTasks } from "./_subtasks"

type Props = {
  params: {
    slug: string
    taskId: string
  }
}
const TaskPage: React.FC<Props> = async ({ params: { taskId } }) => {
  return (
    <DragModal>
      <div className="px-3">
        <Suspense fallback="Fetching task...">
          <Await promise={serverClient.task.task({ id: taskId })}>
            {(task) => (
              <>
                <Title level={1} showAs={4}>
                  {task?.title}
                </Title>
                <Description
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
              </>
            )}
          </Await>
        </Suspense>
      </div>
    </DragModal>
  )
}
export default TaskPage
