import * as z from "zod"

import { db } from "@/lib/db"

import { privateProcedure, publicProcedure, router } from "../trpc"

export const orgRouter = router({
  all: publicProcedure.query(async (opts) => {
    return await db.organization.findMany({
      include: {
        logo: true,
        spaces: {
          include: {
            organization: {
              include: {
                logo: true,
              },
            },
            images: true,
          },
          where: {
            status: "published",
          },
          take: 1,
        },
      },
    })
  }),
  property: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async (opts) => {
      const { id } = opts.input
      return await db.property.findFirst({
        include: {
          logo: true,
          organization: true,
        },
        where: {
          id,
        },
      })
    }),
  updateProperty: privateProcedure
    .input(z.object({ id: z.string(), data: z.any() }))
    .mutation(async (opts) => {
      const { id, data } = opts.input
      return await db.property.update({
        where: {
          id,
        },
        data,
      })
    }),
  properties: privateProcedure
    .input(
      z.object({
        organizationId: z.string(),
      })
    )
    .query(async (opts) => {
      const { organizationId } = opts.input
      return await db.property.findMany({
        include: {
          organization: true,
          logo: true,
        },
        where: {
          organizationId,
        },
      })
    }),
  deleteProperty: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async (opts) => {
      const { id } = opts.input
      const { user } = opts.ctx

      // todo: more authorization here. Just getting it working for now...

      return await db.property.delete({
        where: {
          id,
        },
      })
    }),
  createProperty: privateProcedure
    .input(
      z.object({
        orgId: z.string(),
        name: z.string(),
        description: z.string(),
        private: z.boolean().default(false).optional(),
      })
    )
    .mutation(async (opts) => {
      const { orgId, ...data } = opts.input

      const prop = await db.property.create({
        data: {
          ...data,
          users: {
            create: {
              userId: opts.ctx.user.id,
              role: "owner",
            },
          },
          organizationId: orgId,
        },
      })
      return prop
    }),
  byId: privateProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async (opts) => {
      const { id } = opts.input

      return await db.organization.findFirst({
        where: {
          id,
        },
        include: {
          logo: true,
        },
      })
    }),
  people: privateProcedure
    .input(z.object({ orgId: z.string() }))
    .query(async (opts) => {
      const { orgId } = opts.input
      return await db.user.findMany({
        include: {
          properties: true,
        },
        where: {
          organizations: {
            some: {
              organizationId: orgId,
            },
          },
        },
      })
    }),
  propertyPeople: privateProcedure
    .input(z.object({ propertyId: z.string() }))
    .query(async (opts) => {
      return await db.propertyUser.findMany({
        where: {
          propertyId: opts.input.propertyId,
        },
        include: {
          user: true,
        },
      })
    }),
})
