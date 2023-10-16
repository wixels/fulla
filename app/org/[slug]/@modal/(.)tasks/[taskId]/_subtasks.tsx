"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Prisma, Task } from "@prisma/client"
import { CheckCircle } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { trpc } from "@/lib/trpc/client"
import { serverClient } from "@/lib/trpc/server"
import { useToast } from "@/hooks/use-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Title } from "@/components/ui/title"
import { ToastAction } from "@/components/ui/toast"
import { DataTable } from "@/components/data-table"

import { columns } from "./_columns"

type Props = {
  // @ts-ignore
  initial: Awaited<ReturnType<typeof serverClient["task.tasks"]>>
  propertyId: string
  taskId: string
}
const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Todo must be at least 2 characters.",
  }),
})
export const SubTasks: React.FC<Props> = ({ initial, propertyId, taskId }) => {
  const { data: todos } = trpc.task.tasks.useQuery(
    [
      {
        key: "parentId",
        keyValue: taskId,
      },
    ],
    {
      initialData: initial,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  )
  const { data: session } = useSession()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  })
  const utils = trpc.useContext()
  const { toast } = useToast()
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
        ],
        // @ts-ignore
        (oldQueryData: Todo[] | undefined) =>
          [
            ...(oldQueryData ?? []),
            {
              title: newTodo?.data?.title,
              parentId: taskId,
              propertyId,
              completed: false,
              assignees: [],
              comments: [],
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ] as Task[]
      )

      return { previousTodos }
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
        parentId: taskId,
        title: data.title,
      },
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <Title level={3} showAs={6}>
        Subtasks
      </Title>
      {todos.length > 0 ? <DataTable columns={columns} data={todos} /> : null}

      <Form {...form}>
        <form className="z-0" onSubmit={form.handleSubmit(onSubmit)}>
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
