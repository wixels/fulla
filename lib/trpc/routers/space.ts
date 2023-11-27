import { ProposalTerm } from "@prisma/client"
import * as z from "zod"

import { db } from "@/lib/db"

import { privateProcedure, publicProcedure, router } from "../trpc"

export const spaceRouter = router({
  published: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async (opts) => {
      const { id } = opts.input
      return await db.space.findFirst({
        where: {
          id,
          status: "published",
        },
        include: {
          organization: {
            include: {
              logo: true,
            },
          },
          highlights: true,
          amenities: true,
          offerings: true,
          type: true,
          category: true,
          images: true,
        },
      })
    }),
  draft: privateProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async (opts) => {
      const { id } = opts.input
      const { user } = opts.ctx
      return await db.space.findFirst({
        where: {
          id,
          organizationId: {
            equals: user.organizations?.[0].organizationId,
          },
          status: "draft",
        },
        include: {
          organization: {
            include: {
              logo: true,
            },
          },
          highlights: true,
          amenities: true,
          offerings: true,
          type: true,
          category: true,
          images: true,
        },
      })
    }),
  update: privateProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.any(),
      })
    )
    .mutation(async (opts) => {
      const { id, data } = opts.input
      return await db.space.update({
        where: {
          id,
        },
        data,
      })
    }),
  create: privateProcedure.mutation(async (opts) => {
    const { user } = opts.ctx
    return await db.space.create({
      data: {
        status: "draft",
        organization: {
          connect: {
            id: user.organizations?.[0].organizationId,
          },
        },
        author: {
          connect: {
            id: user.organizations?.[0].id,
          },
        },
      },
    })
  }),
  submitProposal: privateProcedure
    .input(
      z.object({
        spaceId: z.string(),
        term: z.string(),
        letter: z.string(),
        startDate: z.string(),
        docs: z.array(
          z.object({
            fileUrl: z.string(),
            fileKey: z.string(),
          })
        ),
      })
    )
    .mutation(async (opts) => {
      const { user } = opts.ctx
      return await db.proposal.create({
        data: {
          spaceId: opts.input.spaceId,
          status: "in_progress",
          applicantId: user.id,
          startDate: opts.input.startDate,
          term: opts.input.term as ProposalTerm,
          letter: opts.input.letter,
          docs: {
            create: opts.input.docs,
          },
        },
      })
    }),
})
