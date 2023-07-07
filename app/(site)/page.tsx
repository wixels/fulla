"use client"

import { useEffect } from "react"
import { redirect, usePathname } from "next/navigation"

export default function Page() {
  const path = usePathname()
  useEffect(() => {
    if (path === "/") {
      redirect("/desks")
    }
  }, [path])
  return null
}
