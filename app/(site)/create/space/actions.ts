"use server"

import { redirect } from "next/navigation"
import { Space } from "@prisma/client"

import { db } from "@/lib/db"

export async function createDraftSpace(orgId: string) {
  const space = await db.space.create({
    data: {
      status: "draft",
      organization: {
        connect: {
          id: orgId,
        },
      },
    },
  })
  redirect("/create/space/" + space.id + "/title")
}

export async function updateSpaceWithParsedData({
  id,
  data,
}: {
  id: string
  data: any
  redirectTo?: string
}) {
  const space = await db.space.update({
    data,
    where: {
      id,
    },
  })
  return space
}
