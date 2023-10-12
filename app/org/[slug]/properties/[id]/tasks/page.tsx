import { Suspense } from "react"

import { serverClient } from "@/lib/trpc/server"
import { Await } from "@/components/await"

import { Todos } from "./_todos"

type Props = {
  params: { id: string; slug: string }
}
const tabs = ["all", "assigned to me", "assigned by me"]
const Tasks: React.FC<Props> = async ({ params }) => {
  function shouldTabBeActive(
    tab: string,
    searchParam: string | undefined
  ): boolean {
    return (tab === "all" && searchParam === undefined) || tab === searchParam
  }

  return (
    <Suspense fallback="Fetching todos...">
      <Await
        promise={serverClient.org.propertyTodos({
          propertyId: params.id,
        })}
      >
        {(todos) => <Todos propertyId={params.id} initial={todos} />}
      </Await>
    </Suspense>
  )
}
export default Tasks
