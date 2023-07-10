"use client"

import { useEffect } from "react"
import { redirect, usePathname } from "next/navigation"

export default function Page({ params }: { params: { type: string } }) {
  const path = usePathname()
  useEffect(() => {
    const splitPath = path?.split("/")
    if (!splitPath?.[2]) {
      redirect(`/${params?.type}/agile`)
    }
  }, [path, params])
  return null
}
