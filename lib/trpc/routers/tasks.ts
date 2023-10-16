import { TRPCError } from "@trpc/server"
import * as z from "zod"

import { db } from "@/lib/db"

import { privateProcedure, router } from "../trpc"

export const taskRouter = router({
  tasks: privateProcedure
    .input(
      z.array(
        z.object({
          key: z.enum(["propertyId", "organizationId", "parentId"]),
          keyValue: z.string().nullable(),
        })
      )
    )
    .query(async (opts) => {
      const tasks = await db.task.findMany({
        where: opts.input.reduce((acc, input) => {
          return {
            ...acc,
            [input.key]: input.keyValue,
          }
        }, {}),
        include: {
          assignees: true,
          subTasks: {
            select: {
              id: true,
            },
          },
          comments: {
            select: {
              id: true,
            },
          },
        },
      })
      const tasksWithCounts = tasks.map((task) => {
        return {
          ...task,
          subTaskCount: task.subTasks.length,
          subTasks: undefined,
          commentCount: task.comments.length,
          comments: undefined,
        }
      })
      return tasksWithCounts
    }),
  task: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async (opts) => {
      const { id } = opts.input
      return await db.task.findFirst({
        include: {
          comments: true,
          assignedBy: true,
          assignees: true,
          subTasks: true,
        },
        where: {
          id,
        },
      })
    }),
  updateTask: privateProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.any(),
        descriptor: z.string().optional().nullable(),
      })
    )
    .mutation(async (opts) => {
      const { id, data, descriptor } = opts.input

      const task = await db.task.update({
        where: {
          id,
        },
        data,
      })
      await db.activity.create({
        data: {
          verb: "updated",
          authorId: opts.ctx.user?.id,
          taskId: task.id,
          propertyId: task.propertyId,
          descriptor: descriptor ? descriptor : "the " + task.title + " task",
        },
      })
      return task
    }),
  deleteTask: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async (opts) => {
      const { id } = opts.input
      const { user } = opts.ctx

      if (!user) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
      }

      const task = await db.task.delete({
        where: {
          id,
        },
      })

      await db.activity.create({
        data: {
          verb: "deleted",
          authorId: opts.ctx.user?.id,
          taskId: task.id,
          propertyId: task.propertyId,
          descriptor: "the " + task.title + " task",
        },
      })
      return task
    }),
  createTask: privateProcedure
    .input(z.object({ data: z.any() }))
    .mutation(async (opts) => {
      const { data } = opts.input
      const task = await db.task.create({
        data,
      })
      await db.activity.create({
        data: {
          verb: "created",
          authorId: opts.ctx.user?.id,
          taskId: task.id,
          propertyId: task.propertyId,
          descriptor: "the " + task.title + " task",
        },
      })
      return task
    }),
})
