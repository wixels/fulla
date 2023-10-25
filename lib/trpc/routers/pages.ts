import * as z from "zod"

import { db } from "@/lib/db"

import { privateProcedure, router } from "../trpc"

export const pageRouter = router({
  create: privateProcedure
    .input(
      z.object({
        data: z.any(),
      })
    )
    .mutation(async (opts) => {
      const page = await db.page.create({
        data: {
          title: "untitled",
          authorId: opts.ctx.user.id,
          ...opts.input.data,
        },
      })
      return page
    }),
  update: privateProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.any(),
      })
    )
    .mutation(async (opts) => {
      return await db.page.update({
        where: {
          id: opts.input.id,
        },
        data: opts.input.data,
      })
    }),
  list: privateProcedure
    .input(
      z.array(
        z.object({
          key: z.enum(["propertyId", "organizationId", "parentId"]),
          keyValue: z.string().nullable(),
        })
      )
    )
    .query(async (opts) => {
      const pages = await db.page.findMany({
        where: opts.input.reduce((acc, input) => {
          return {
            ...acc,
            [input.key]: input.keyValue,
          }
        }, {}),
        include: {
          property: true,
          subPages: {
            select: {
              id: true,
            },
          },
        },
      })
      const pagesWithCount = pages.map((page) => {
        return {
          ...page,
          subPagesCount: page.subPages.length,
          subPages: undefined,
        }
      })
      return pagesWithCount
    }),
  single: privateProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async (opts) => {
      return await db.page.findUniqueOrThrow({
        where: {
          id: opts.input.id,
        },
        include: {
          author: true,
          coverImage: true,
        },
      })
    }),
})
