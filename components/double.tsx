"use client"

import { useRef } from "react"
import Image from "next/image"
import ImageTwo from "@/public/office-2.jpg"
import ImageOne from "@/public/office.avif"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

import { sectionVariants } from "./section"
import { Title } from "./ui/title"

type Props = {
  reversed?: boolean
}

export const Double: React.FC<Props> = ({ projects, reversed = false }) => {
  const firstImage = useRef(null)
  const secondImage = useRef(null)
  let requestAnimationFrameId = null
  let xPercent = reversed ? 100 : 0
  let currentXPercent = reversed ? 100 : 0
  const speed = 0.15

  const manageMouseMove = (e) => {
    const { clientX } = e
    xPercent = (clientX / window.innerWidth) * 100

    if (!requestAnimationFrameId) {
      requestAnimationFrameId = window.requestAnimationFrame(animate)
    }
  }

  const animate = () => {
    //Add easing to the animation
    const xPercentDelta = xPercent - currentXPercent
    currentXPercent = currentXPercent + xPercentDelta * speed

    //Change width of images between 33.33% and 66.66% based on cursor
    const firstImagePercent = 66.66 - currentXPercent * 0.33
    const secondImagePercent = 33.33 + currentXPercent * 0.33
    console.log(secondImagePercent)
    firstImage.current.style.width = `${firstImagePercent}%`
    secondImage.current.style.width = `${secondImagePercent}%`

    if (Math.round(xPercent) == Math.round(currentXPercent)) {
      window.cancelAnimationFrame(requestAnimationFrameId)
      requestAnimationFrameId = null
    } else {
      window.requestAnimationFrame(animate)
    }
  }

  return (
    <motion.div
      className={cn(sectionVariants({ size: "sm" }), "flex h-[45vw] w-full")}
      onMouseMove={(e) => {
        manageMouseMove(e)
      }}
    >
      <div ref={firstImage} className="w-[66.66%]">
        <div className="relative pb-[66%]">
          <Image className="object-cover" src={ImageOne} alt={"image"} fill />
        </div>
        <div className="p-3">
          <Title className="font-bold font-mono" level={3} showAs={6}>
            On-Demand Desk
          </Title>
          <p>Book desks when you need them, where you need them.</p>
        </div>
      </div>

      <div ref={secondImage} className="w-[33.33%]">
        <div className="relative pb-[66%]">
          <Image src={ImageTwo} className="object-cover" fill alt={"image"} />
        </div>
        <div className="p-3">
          <Title className="font-bold font-mono" level={3} showAs={6}>
            Meeting Spaces
          </Title>
          <p>Conduct meetings in style – reserve our modern meeting rooms.</p>
        </div>
      </div>
    </motion.div>
  )
}
