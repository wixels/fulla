"use server"

import { Login } from "@/types/authTypes"
import { User } from "@/types/payload-types"
import { rest } from "@/lib/rest"

export const login: (values: {
  email: string
  password: string
}) => Promise<User | null> = async (values) => {
  const user = await rest(
    `${process.env.NEXT_PUBLIC_API_URL as string}/api/users/login`,
    values
  )

  console.log("user from server action::: ", user)
  return user
}
