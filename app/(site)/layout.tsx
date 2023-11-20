"use client"

import { usePathname } from "next/navigation"

import { Header } from "@/components/navigation/header"

export default function Layout({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  return (
    <div className="flex min-h-screen flex-col">
      <Header active={path} />
      {children}
    </div>
  )
}
