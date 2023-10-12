"use client"

import Link from "next/link"
import { Prisma } from "@prisma/client"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { motion } from "framer-motion"
import { ChevronDown, MoreHorizontal } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const helper = createColumnHelper<
  Prisma.PropertyGetPayload<{
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
      return (
        <Link
          href={"./properties/" + props.row.original.id + "/overview"}
          className="group flex items-center gap-2"
        >
          <Avatar size={"sm"}>
            <AvatarFallback>{props?.row?.original?.name?.[0]}</AvatarFallback>
            <AvatarImage src={props?.row?.original?.logo?.fileUrl} />
          </Avatar>
          <span className="group-hover:text-blue-500 group-hover:underline">
            {props?.row?.original?.name}
          </span>
        </Link>
      )
    },
  }),
  helper.display({
    header: "Private",
    id: "private",
    cell: (props) => {
      const isPrivate = props?.row?.original?.private
      return (
        <Badge variant={isPrivate ? "destructive" : "default"}>
          {isPrivate ? "Private" : "Public"}
        </Badge>
      )
    },
  }),
  helper.accessor("createdAt", {
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex cursor-pointer items-center gap-2"
        >
          <span>Created</span>
          <motion.div
            animate={
              column.getIsSorted() === "asc" ? { rotate: 180 } : { rotate: 0 }
            }
            transition={{
              duration: 0.3,
              ease: [0.165, 0.84, 0.44, 1],
            }}
          >
            <ChevronDown className="w- h-3" />
          </motion.div>
        </div>
      )
    },
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
]
