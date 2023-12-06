"use client"

import { useEffect, useRef, useState } from "react"
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import Balancer from "react-wrap-balancer"

import { useMousePosition } from "@/hooks/use-mouse-position"
import { Label } from "@/components/ui/label"
import { Title, titleVariants } from "@/components/ui/title"
import { sectionVariants } from "@/components/section"
import { StickyCursor } from "@/components/sticky-cursor"

type Props = {}
export const HeroText: React.FC<Props> = ({}) => {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start 0.9", "start 0.25"],
  })
  const paragraph =
    "Fulla – Where innovation meets functionality, unlocking your potential in every workspace."
  const words = paragraph.split(" ")
  return (
    <div
      className={sectionVariants({
        spacer: "p",
        className: "gutter bg-primary-foreground",
      })}
    >
      <Label className="uppercase text-muted-foreground/50">
        Redefining the Office Landscape
      </Label>

      <motion.p
        ref={container}
        style={{ opacity: scrollYProgress }}
        className={titleVariants({ className: "w-3/4" })}
      ></motion.p>
    </div>
  )
}
