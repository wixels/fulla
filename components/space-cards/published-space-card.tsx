"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValue,
} from "framer-motion"
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react"

import { buttonVariants } from "../ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"

type Props = {
  title: string
}

const images = [
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2301&q=80",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2301&q=80",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2301&q=80",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2301&q=80",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2301&q=80",
]
export const PublishedSpaceCard: React.FC<Props> = ({ title }) => {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)

  return (
    <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="group flex w-full grid-cols-1 flex-col gap-4"
      >
        <div className="relative overflow-hidden rounded-lg">
          <motion.div animate={{ x: `-${index * 100}%` }} className="flex">
            {images.map((image, i) => (
              <motion.img
                key={i}
                src={image}
                className="aspect-[16/11] object-cover"
                drag="x"
                dragDirectionLock
                onDragEnd={(event, info) => {
                  console.log("event::: ", event)
                  console.log("ingo::: ", info)

                  if (info.offset.x < 0) {
                    const convertedToPositive = info.offset.x * -1
                    if (index + 1 < images.length) {
                      if (convertedToPositive > 10) {
                        setIndex(index + 1)
                      }
                    }
                  } else {
                    if (index > 0) {
                      if (info.offset.x > 10) {
                        setIndex(index - 1)
                      }
                    }
                  }
                }}
                dragConstraints={{ right: 0, left: 0, top: 0, bottom: 0 }}
              />
            ))}
          </motion.div>
          <AnimatePresence initial={false}>
            {index > 0 && hovered && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0, pointerEvents: "none" }}
                whileHover={{ opacity: 1 }}
                className={buttonVariants({
                  size: "icon",
                  variant: "secondary",
                  rounded: "full",
                  className:
                    "absolute left-2 top-1/2 -mt-4 group-hover:opacity-100 opacity-0",
                })}
                onClick={() => setIndex(index - 1)}
              >
                <ChevronLeft size={13} />
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence initial={false}>
            {index + 1 < images.length && hovered && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0, pointerEvents: "none" }}
                whileHover={{ opacity: 1 }}
                className={buttonVariants({
                  size: "icon",
                  variant: "secondary",
                  rounded: "full",
                  className: "absolute right-2 top-1/2 -mt-4",
                })}
                onClick={() => setIndex(index + 1)}
              >
                <ChevronRight size={13} />
              </motion.button>
            )}
          </AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, pointerEvents: "none" }}
              className="absolute inset-x-0 bottom-6 flex justify-center overflow-hidden"
            >
              <div className="flex rounded-full bg-foreground/20 px-1 backdrop-blur-md">
                {images.map((image, i) => (
                  <motion.button
                    key={image}
                    onClick={() => setIndex(i)}
                    whileHover={{ opacity: 1 }}
                    initial={false}
                    animate={i === index ? "active" : "inactive"}
                    variants={{
                      active: {
                        opacity: 1,
                      },
                      inactive: {
                        opacity: 0.5,
                      },
                    }}
                    className="flex items-center justify-center px-1 py-2"
                  >
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
        <div className="flex items-center justify-between gap-x-3">
          <div className="flex items-center gap-2">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-primary shadow-md">
              <Image
                fill
                className="object-cover"
                alt="house primary image"
                src={
                  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2301&q=80"
                }
              />
            </div>
            <div className="">
              <p className="line-clamp-1 text-base font-medium">{title}</p>
              <p className="line-clamp-1 text-sm text-muted-foreground">
                Suburb, Province
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 transition-opacity delay-150">
            <TooltipProvider delayDuration={100} skipDelayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild>
                  {hovered ? (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, pointerEvents: "none" }}
                      transition={{
                        delay: 0.15,
                        duration: 0.95,
                        ease: [0.165, 0.84, 0.44, 1],
                      }}
                      className={buttonVariants({
                        size: "icon",
                        className: "h-9 w-9 rounded-xl",
                      })}
                    >
                      <Bookmark size={12} />
                    </motion.button>
                  ) : null}
                </TooltipTrigger>
                <TooltipContent>Bookmark to collection</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={100} skipDelayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild>
                  {hovered ? (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, pointerEvents: "none" }}
                      transition={{
                        delay: 0.25,
                        duration: 0.95,
                        ease: [0.165, 0.84, 0.44, 1],
                      }}
                      className={buttonVariants({
                        size: "icon",
                        variant: "ghost",
                        className: "h-9 w-9 rounded-xl",
                      })}
                    >
                      <MoreHorizontal size={12} />
                    </motion.button>
                  ) : null}
                </TooltipTrigger>
                <TooltipContent>Share</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </motion.div>
    </MotionConfig>
  )
}
