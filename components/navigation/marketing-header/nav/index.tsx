"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { titleVariants } from "@/components/ui/title"
import { Section, sectionVariants } from "@/components/section"

import { blur, height, opacity, translate } from "../anim"
import { Footer } from "./footer"

type Props = {}
const links = [
  {
    title: "Home",
    href: "/",
    src: "1.avif",
  },
  {
    title: "Shop",
    href: "/shop",
    src: "2.avif",
  },
  {
    title: "About Us",
    href: "/about",
    src: "3.avif",
  },
  {
    title: "Lookbook",
    href: "/lookbook",
    src: "4.avif",
  },
  {
    title: "Contact",
    href: "/contact",
    src: "5.avif",
  },
]
export const Nav: React.FC<Props> = ({}) => {
  const [selectedLink, setSelectedLink] = useState({
    isActive: false,
    index: 0,
  })
  const getChars = (word: string): JSX.Element[] => {
    let chars: JSX.Element[] = []
    word.split("").forEach((char, i) => {
      chars.push(
        <motion.span
          custom={[i * 0.02, (word.length - i) * 0.01]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          key={char + i}
        >
          {char}
        </motion.span>
      )
    })
    return chars
  }

  return (
    <motion.div
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
      className="gutter flex flex-col overflow-hidden"
    >
      <div className="flex w-full items-center gap-20">
        <div className="flex bg-red-200  flex-wrap gap-14">
          {links.map((link, index) => {
            const { title, href } = link
            return (
              <Link key={`l_${index}`} href={href}>
                <motion.p
                  // className={cn(titleVariants({}))}
                  className="text-5xl lg:text-6xl xl:text-[5.5rem]"
                  style={{ margin: 0 }}
                  onMouseOver={() => {
                    setSelectedLink({ isActive: true, index })
                  }}
                  onMouseLeave={() => {
                    setSelectedLink({ isActive: false, index })
                  }}
                  variants={blur}
                  animate={
                    selectedLink.isActive && selectedLink.index != index
                      ? "open"
                      : "closed"
                  }
                >
                  {getChars(title)}
                </motion.p>
              </Link>
            )
          })}
        </div>
        <motion.div
          variants={opacity}
          initial="initial"
          animate={selectedLink.isActive ? "open" : "closed"}
          className="relative overflow-hidden  h-[300px] aspect-square bg-red-200"
        >
          <Image
            src={`/images/${links[selectedLink.index].src}`}
            fill={true}
            className="object-cover"
            alt="image"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
