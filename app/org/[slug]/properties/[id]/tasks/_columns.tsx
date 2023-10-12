// @ts-nocheck
import Link from "next/link"
import { Prisma } from "@prisma/client"
import { createColumnHelper } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"

import { Assignees } from "./_assignees"

const helper = createColumnHelper<
  Prisma.TodoGetPayload<{
    include: {
      children: true
      assignedBy: true
      assignedTo: true
    }
  }>
>()
export const columns = [
  helper.display({
    id: "title",
    header: "Title",
    cell: (props) => {
      return (
        <div className="flex items-center gap-2">
          <Checkbox />
          <Link
            href={"#"}
            className="group-hover:text-blue-500 group-hover:underline"
          >
            {props?.row?.original?.title}
          </Link>
        </div>
      )
    },
  }),
  helper.accessor((row) => row?.children?.length ?? 0, {
    id: "sub",
    header: "Sub-tasks",
  }),
  helper.display({
    id: "assignees",
    header: "Assignees",
    cell: (props) => (
      <Assignees
        todo={props?.row?.original}
        propertyId={props?.row?.original?.propertyId}
      />
    ),
  }),
]
