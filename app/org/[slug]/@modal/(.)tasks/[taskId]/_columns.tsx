import Link from "next/link"
import { createColumnHelper } from "@tanstack/react-table"

import { serverClient } from "@/lib/trpc/server"
import { TaskAssignees } from "@/components/task-assignees"
import { TaskCheckbox } from "@/components/task-checbox"
import { TaskDueDate } from "@/components/task-due-date"

const helper =
  // @ts-ignore
  createColumnHelper<Awaited<ReturnType<typeof serverClient["task.tasks"]>>>()
export const columns = [
  helper.display({
    id: "title",
    header: "Title",
    cell: (props) => {
      console.log("prpos::: ", props)
      return (
        <div className="flex items-center gap-2">
          <TaskCheckbox task={props?.row?.original} />
          {props?.row?.original?.title}
        </div>
      )
    },
  }),
  helper.display({
    id: "assignees",
    header: "Assignees",
    cell: (props) => (
      <TaskAssignees withoutPortal task={props?.row?.original} />
    ),
  }),
  helper.display({
    id: "dueDate",
    header: "Due date",
    cell: (props) => <TaskDueDate withoutPortal task={props?.row?.original} />,
  }),
]
