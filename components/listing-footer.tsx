"use client"

import React from "react"

type Props = {
  children: React.ReactNode
  progress?: number
}

export const ListingFooter = ({ children, progress }: Props) => {
  return (
    <footer className="fixed inset-x-0 bottom-0  z-10 w-screen bg-background/80 backdrop-blur">
      <div className="relative h-1 w-full bg-zinc-200">
        <div className={`absolute left-0 h-1 w-[22%] bg-zinc-900`} />
      </div>
      <div className="gutter flex h-20 items-center justify-between">
        {children}
      </div>
    </footer>
  )
}
