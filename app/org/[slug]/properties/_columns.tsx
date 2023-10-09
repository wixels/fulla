"use client"

import { Prisma, Properties } from "@prisma/client"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { paragraphVariants } from "@/components/ui/paragraph"

const helper = createColumnHelper<
  Prisma.PropertiesGetPayload<{
    include: {
      author: {
        include: {
          user: true
        }
      }
      logo: true
    }
  }>
>()
export const columns = [
  helper.display({
    id: "name",
    header: "Name",
    cell: (props) => {
      console.log("props::: ", props.row)
      return (
        <div className="flex items-center gap-2">
          <Avatar size={"sm"}>
            <AvatarFallback>{props?.row?.original?.name?.[0]}</AvatarFallback>
            <AvatarImage src={props?.row?.original?.logo?.fileUrl} />
          </Avatar>
          <span
          // className={paragraphVariants({
          //   size: "xs",
          //   className: "text-muted-foreground",
          // })}
          >
            {props?.row?.original?.name}
          </span>
        </div>
      )
    },
  }),
  helper.accessor("createdAt", {
    header: "Created",
    cell: (row) => (
      <span>
        {new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(row.getValue()!))}
      </span>
    ),
  }),
  helper.display({
    id: "actions",
    cell: (props) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Property Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  }),

  //   {
  //     accessorKey: "name",
  //   },
  //   {
  //     // id: "collaborators",
  //     accessorKey: "author",
  //     accessorFn: (row) => {
  //       console.log("row::: ", row)
  //       return "Hello World"
  //     },
  //   },
]
