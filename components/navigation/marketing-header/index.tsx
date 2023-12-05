"use client"

import { useState } from "react"
import Link from "next/link"
import { Dialog } from "@radix-ui/react-dialog"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

import { background, opacity } from "./anim"
import { Nav } from "./nav"

type Props = {}

export const MarketingHeader: React.FC<Props> = ({}) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="fixed inset-x-0 top-0 z-10 bg-[#f4f0ea] p-[10px]">
      <div className="relative flex justify-center text-xs font-bold uppercase">
        <div
          onClick={() => {
            setIsActive(!isActive)
          }}
          className="flex cursor-pointer items-center justify-center gap-2"
        >
          {isActive ? "Close" : "Menu"}
        </div>
      </div>
      <motion.div
        variants={background}
        initial="initial"
        animate={isActive ? "open" : "closed"}
        className="absolute inset-x-0 top-[100%] h-full w-full bg-black opacity-50"
      ></motion.div>
      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </div>
  )
}
