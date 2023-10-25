import { Suspense } from "react"

import { serverClient } from "@/lib/trpc/server"
import { Await } from "@/components/await"

import { Todos } from "./_todos"

type Props = {
  params: { id: string; orgId: string }
}
const Tasks: React.FC<Props> = async ({ params }) => {
  return (
    <Suspense fallback="Fetching todos...">
      <Await
        promise={serverClient.task.tasks([
          { key: "propertyId", keyValue: params.id },
          { key: "parentId", keyValue: null },
        ])}
      >
        {(todos) => <Todos propertyId={params.id} initial={todos} />}
      </Await>
    </Suspense>
  )
}
export default Tasks
