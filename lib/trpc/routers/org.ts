import { TRPCError } from "@trpc/server"
import * as z from "zod"

import { db } from "@/lib/db"

import { privateProcedure, publicProcedure, router } from "../trpc"

export const orgRouter = router({
  property: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async (opts) => {
      const { id } = opts.input
      return await db.properties.findFirst({
        where: {
          id,
        },
      })
    }),
  properties: privateProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async (opts) => {
      const { slug } = opts.input
      return await db.properties.findMany({
        include: {
          author: {
            include: {
              user: true,
            },
          },
          logo: true,
        },
        where: {
          organization: {
            slug: {
              equals: slug,
            },
          },
        },
      })
    }),
  deleteProperty: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async (opts) => {
      const { id } = opts.input
      const { user } = opts.ctx

      // todo: more authorization here. Just getting it working for now...

      return await db.properties.delete({
        where: {
          id,
        },
      })
    }),
  createProperty: privateProcedure
    .input(
      z.object({
        slug: z.string(),
        name: z.string(),
        description: z.string(),
        private: z.boolean().default(false).optional(),
      })
    )
    .mutation(async (opts) => {
      const { slug, ...data } = opts.input
      const orgFromUserBySlug = opts.ctx.user.organizations.find(
        (x) => x.organization.slug === slug
      )
      if (!orgFromUserBySlug) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message:
            "You do not belong to the company you're creating a property for",
        })
      }
      return await db.properties.create({
        data: {
          ...data,
          author: {
            connect: {
              id: orgFromUserBySlug.id,
            },
          },
          organization: {
            connect: {
              slug,
            },
          },
        },
      })
    }),
  bySlug: privateProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async (opts) => {
      const { slug } = opts.input

      return await db.organization.findFirst({
        where: {
          slug,
        },
        include: {
          logo: true,
        },
      })
    }),
})