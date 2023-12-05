"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"

import { sectionVariants } from "@/components/section"

import { background, blur, height, opacity, translate } from "./anim"

type Props = {}

export const MarketingHeader: React.FC<Props> = ({}) => {
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
  const [isActive, setIsActive] = useState(false)
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
    <div className="sticky inset-x-0 top-0 z-10 bg-[#f4f0ea] p-3">
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
        onClick={() => setIsActive(false)}
        variants={background}
        initial="initial"
        animate={isActive ? "open" : "closed"}
        className="absolute inset-x-0 top-[100%] h-full w-full cursor-pointer bg-black opacity-50"
      ></motion.div>
      <AnimatePresence mode="wait">
        {isActive ? (
          <motion.div
            variants={height}
            initial="initial"
            animate="enter"
            exit="exit"
            className="gutter flex flex-col overflow-hidden"
          >
            <div
              className={sectionVariants({
                size: "sm",
                className:
                  "flex w-full items-center gap-[50px] justify-between",
              })}
            >
              <div className="flex grow flex-col gap-2 md:gap-4 lg:gap-6 xl:gap-8">
                {/* OPTIONS */}
                <div className="flex flex-wrap gap-2 md:gap-4 lg:gap-6 xl:gap-8">
                  {links.map((link, index) => {
                    const { title, href } = link
                    return (
                      <motion.p
                        key={`l_${index}`}
                        className="text-5xl font-light uppercase lg:text-6xl xl:text-[5.5rem]"
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
                    )
                  })}
                </div>

                {/* FOOTER */}
                <div className="flex w-full justify-between gap-4 text-sm uppercase">
                  <p>
                    <span className="text-muted-foreground/50">MADE BY: </span>{" "}
                    WIXELS DIGITAL
                  </p>
                  <p>
                    <span className="text-muted-foreground/50">PROUDLY: </span>{" "}
                    SOUTH AFRICAN
                  </p>
                </div>
              </div>

              <motion.div
                variants={opacity}
                initial="initial"
                animate={selectedLink.isActive ? "open" : "closed"}
                className="relative mb-3 aspect-square w-[500px] grow overflow-hidden"
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
        ) : null}
      </AnimatePresence>
    </div>
  )
}
