"use server"

import { redirect } from "next/navigation"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

export async function getORgsDraftListings() {
  const session = await getCurrentUser()
  if (!session) {
    redirect("/login")
  }
  //   const listings = db.space.findMany({
  //     where: {},
  //   })
}
