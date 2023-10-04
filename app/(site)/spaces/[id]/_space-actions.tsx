"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { Bookmark, Check, Heart, Share, Star } from "lucide-react"

import { Paragraph } from "@/components/ui/paragraph"
import { Magnetic } from "@/components/magnectic"
import { StickyCursor } from "@/components/sticky-cursor"

type Props = {}

export const SpaceActions: React.FC<Props> = ({}) => {
  const applyRef = useRef<HTMLDivElement | null>(null)

  return (
    <div className="flex gap-5">
      <StickyCursor stickyElement={applyRef} />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.15,
          duration: 0.95,
          ease: [0.165, 0.84, 0.44, 1],
        }}
        className="flex flex-col items-center gap-2"
      >
        <Magnetic>
          <button
            //   @ts-ignore
            ref={applyRef}
            className="flex h-12 w-12 items-center justify-center rounded-full  bg-blue-500 text-white"
          >
            <Check className="h-4 w-4" />
          </button>
        </Magnetic>
        <Paragraph className="text-muted-foreground" size={"xs"}>
          Apply
        </Paragraph>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.17,
          duration: 0.95,
          ease: [0.165, 0.84, 0.44, 1],
        }}
        className="flex flex-col items-center gap-2"
      >
        <button className="flex h-12 w-12 items-center justify-center rounded-full border border-secondary bg-secondary hover:bg-blue-500 hover:text-white">
          <Bookmark className="h-4 w-4" />
        </button>
        <Paragraph className="text-muted-foreground" size={"xs"}>
          Save
        </Paragraph>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.19,
          duration: 0.95,
          ease: [0.165, 0.84, 0.44, 1],
        }}
        className="flex flex-col items-center gap-2"
      >
        <button className="flex h-12 w-12 items-center justify-center rounded-full border border-secondary bg-secondary hover:bg-blue-500 hover:text-white">
          <Heart className="h-4 w-4" />
        </button>
        <Paragraph className="text-muted-foreground" size={"xs"}>
          Like
        </Paragraph>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.21,
          duration: 0.95,
          ease: [0.165, 0.84, 0.44, 1],
        }}
        className="flex flex-col items-center gap-2"
      >
        <button className="flex h-12 w-12 items-center justify-center rounded-full border border-secondary bg-secondary hover:bg-blue-500 hover:text-white">
          <Star className="h-4 w-4" />
        </button>
        <Paragraph className="text-muted-foreground" size={"xs"}>
          Review
        </Paragraph>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.21,
          duration: 0.95,
          ease: [0.165, 0.84, 0.44, 1],
        }}
        className="flex flex-col items-center gap-2"
      >
        <button className="flex h-12 w-12 items-center justify-center rounded-full border border-secondary bg-secondary hover:bg-blue-500 hover:text-white">
          <Share className="h-4 w-4" />
        </button>
        <Paragraph className="text-muted-foreground" size={"xs"}>
          Share
        </Paragraph>
      </motion.div>
    </div>
  )
}
