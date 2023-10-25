"use client"

import { experimental_useOptimistic as useOptimistic } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Prisma, Task } from "@prisma/client"
import { CheckCircle } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { trpc } from "@/lib/trpc/client"
import { serverClient } from "@/lib/trpc/server"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { columns } from "./_columns"
import { DataTable } from "./_table"

type Props = {
  // @ts-ignore
  initial: Awaited<ReturnType<typeof serverClient["task.tasks"]>>
  propertyId: string
}
const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Todo must be at least 2 characters.",
  }),
})

export const Todos: React.FC<Props> = ({ initial, propertyId }) => {
  const { data: session } = useSession()
  const { data: todos } = trpc.task.tasks.useQuery(
    [
      {
        key: "propertyId",
        keyValue: propertyId,
      },
      {
        key: "parentId",
        keyValue: null,
      },
    ],
    {
      initialData: initial,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  )
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  })
  const utils = trpc.useContext()
  const addTodo = trpc.task.createTask.useMutation({
    onMutate: async (newTodo) => {
      form.resetField("title")

      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await utils.task.tasks.cancel()

      // Snapshot the previous value
      const previousTodos = utils.task.tasks.getData()

      // Optimistically update to the new value
      utils.task.tasks.setData(
        [
          {
            key: "propertyId",
            keyValue: propertyId,
          },
          {
            key: "parentId",
            keyValue: null,
          },
        ],
        // @ts-ignore
        (oldQueryData: Todo[] | undefined) =>
          [
            ...(oldQueryData ?? []),
            {
              title: newTodo?.data?.title,
              propertyId,
              completed: false,
              assignees: [],
              comments: [],
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ] as Task[]
      )

      // Return a context object with the snapshotted value
      return { previousTodos }
    },
    onError: (err, _newTodo, context) => {
      // Rollback to the previous value if mutation fails
      utils.task.tasks.setData(
        [
          {
            key: "propertyId",
            keyValue: propertyId,
          },
        ],
        context?.previousTodos
      )
    },
    onSuccess: () => {
      console.log("inside onSuccess")
    },
    onSettled: () => {
      void utils.task.tasks.invalidate()
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    addTodo.mutate({
      data: {
        propertyId: propertyId,
        title: data.title,
      },
    })
  }
  return (
    <div className="flex flex-col gap-4">
      {/* @ts-ignore */}
      {todos.length > 0 ? <DataTable columns={columns} data={todos} /> : null}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                <div className="grow">
                  <FormControl>
                    <Input
                      disabled={!session?.user}
                      variant={"ghost"}
                      placeholder="Add a task"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}
