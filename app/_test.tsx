"use client"

import { useEffect } from "react"

import { rest } from "@/lib/rest"

type Props = {}
export const TestData: React.FC<Props> = ({}) => {
  //   useEffect(() => {
  //     ;(async () => {
  //       const user = await rest(
  //         `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
  //         {},
  //         {
  //           method: "GET",
  //         }
  //       )
  //       console.log("user::: ", user)
  //     })()
  //   }, [])

  return <div>TestData</div>
}
