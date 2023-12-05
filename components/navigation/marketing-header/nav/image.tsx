"use client"

import NextImage from "next/image"
import { motion } from "framer-motion"

import { opacity } from "../anim"

type Props = {}
export const Image: React.FC<Props> = ({ src, isActive }) => {
  return (
    <motion.div
      variants={opacity}
      initial="initial"
      animate={isActive ? "open" : "closed"}
      className="block w-[500px] h-[450px] relative"
    >
      <NextImage
        src={`/images/${src}`}
        fill={true}
        className="object-cover"
        alt="image"
      />
    </motion.div>
  )
}
