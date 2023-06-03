import React from "react"

import { cn } from "@/lib/utils"

import { Button } from "./ui/button"

export const ListingHeader = ({ children }: { children?: React.ReactNode }) => {
  const grad =
    "bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
  return (
    <header className="gutter fixed inset-x-0 top-0 z-10 mx-auto flex h-20 w-full max-w-7xl items-center justify-between border-b bg-background/80 backdrop-blur">
      <div className={cn([grad, "h-8 w-8 rounded-full bg-red-200"])} />
      <div className="flex gap-6">
        <Button variant={"outline"}>Need Help?</Button>
        <Button variant={"outline"}>Save & Exit</Button>
      </div>
    </header>
  )
}
