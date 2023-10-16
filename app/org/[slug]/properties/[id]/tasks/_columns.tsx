import Link from "next/link"
import { Prisma } from "@prisma/client"
import { createColumnHelper } from "@tanstack/react-table"

import { serverClient } from "@/lib/trpc/server"

import { Assignees } from "./_assignees"
import { Checkbox } from "./_checkbox"
import { DueDate } from "./_due-date"

const helper =
  // @ts-ignore
  createColumnHelper<Awaited<ReturnType<typeof serverClient["task.tasks"]>>>()
export const columns = [
  helper.display({
    id: "title",
    header: "Title",
    cell: (props) => {
      return (
        <div className="flex items-center gap-2">
          <Checkbox task={props?.row?.original} />
          <Link
            href={"../../tasks/" + props.row.original.id}
            className="hover:text-blue-500 hover:underline"
          >
            {props?.row?.original?.title}
          </Link>
        </div>
      )
    },
  }),
  helper.accessor("subTaskCount", {
    header: "Sub-tasks",
  }),
  helper.accessor("commentCount", {
    header: "Comments",
  }),
  helper.display({
    id: "assignees",
    header: "Assignees",
    cell: (props) => <Assignees task={props?.row?.original} />,
  }),
  helper.display({
    id: "dueDate",
    header: "Due date",
    cell: (props) => <DueDate task={props?.row?.original} />,
  }),
]
