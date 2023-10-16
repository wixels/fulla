import Link from "next/link"
import { createColumnHelper } from "@tanstack/react-table"

import { serverClient } from "@/lib/trpc/server"

import { Assignees } from "../../../properties/[id]/tasks/_assignees"
import { Checkbox } from "../../../properties/[id]/tasks/_checkbox"
import { DueDate } from "../../../properties/[id]/tasks/_due-date"

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
          <Checkbox task={props?.row?.original} />
          {props?.row?.original?.title}
        </div>
      )
    },
  }),
  helper.display({
    id: "assignees",
    header: "Assignees",
    cell: (props) => <Assignees withoutPortal task={props?.row?.original} />,
  }),
  helper.display({
    id: "dueDate",
    header: "Due date",
    cell: (props) => <DueDate withoutPortal task={props?.row?.original} />,
  }),
]
