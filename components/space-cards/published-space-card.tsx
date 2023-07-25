"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Prisma } from "@prisma/client"
import { AnimatePresence, MotionConfig, motion } from "framer-motion"
import {
  Bookmark,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react"

import { useViewportSize } from "@/hooks/use-viewport-size"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { buttonVariants } from "../ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"

type Props = {
  space: Prisma.SpaceGetPayload<{
    include: {
      organization: {
        include: {
          logo: true
        }
      }
      type: true
      category: true
      offerings: true
      highlights: true
      amenities: true
      images: true
    }
  }>
}

export const PublishedSpaceCard: React.FC<Props> = ({ space }) => {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)

  const { width } = useViewportSize()

  return (
    <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="group flex w-full grid-cols-1 flex-col gap-4"
      >
        <div className="relative overflow-hidden rounded-lg">
          <motion.div animate={{ x: `-${index * 100}%` }} className="flex">
            {space.images
              .map((image) => image.fileUrl)
              .map((image, i) => (
                <motion.img
                  key={i}
                  src={image}
                  className="aspect-[16/11] object-cover"
                  drag="x"
                  dragDirectionLock
                  onDragEnd={(_, info) => {
                    if (info.offset.x < 0) {
                      const convertedToPositive = info.offset.x * -1
                      if (index + 1 < space.images.length) {
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
            {(width <= 1024 && index > 0) ||
            (width > 1024 && index > 0 && hovered) ? (
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
            ) : null}
          </AnimatePresence>

          <AnimatePresence initial={false}>
            {(width <= 1024 && index + 1 < space.images.length) ||
            (width > 1024 && index + 1 < space.images.length && hovered) ? (
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
            ) : null}
          </AnimatePresence>
          {width <= 1024 || (width > 1024 && hovered) ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, pointerEvents: "none" }}
              className="absolute inset-x-0 bottom-6 flex justify-center overflow-hidden"
            >
              <div className="flex rounded-full bg-foreground/20 px-1 backdrop-blur-md">
                {space.images.map((image, i) => (
                  <motion.button
                    key={image.id}
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
          ) : null}
        </div>
        <div className="flex items-center justify-between gap-x-3">
          <div className="flex items-center gap-3">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Avatar size={"sm"}>
                  <AvatarImage src={space.organization.logo?.fileUrl} />
                  <AvatarFallback className="capitalize">
                    {space.organization.name[0]}
                  </AvatarFallback>
                </Avatar>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex gap-4">
                  <Avatar size={"sm"}>
                    <AvatarImage src={space.organization.logo?.fileUrl} />
                    <AvatarFallback className="capitalize">
                      {space.organization.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <Link
                      href={"/orgs/" + space.organization.id}
                      className="text-sm font-semibold hover:underline"
                    >
                      @{space.organization.name}
                    </Link>

                    <p className="text-sm">{space.organization.description}</p>
                    <div className="flex items-center pt-2">
                      <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                      <span className="text-xs text-muted-foreground">
                        Joined December 2021
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <div className="">
              <p className="line-clamp-1 text-sm font-medium transition-all group-hover:underline">
                {space.title}
              </p>
              <p className="line-clamp-1 text-xs text-muted-foreground">
                Suburb, Province
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 transition-opacity delay-150">
            <TooltipProvider delayDuration={100} skipDelayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild>
                  {width <= 1024 || (width > 1024 && hovered) ? (
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
                  {width <= 1024 || (width > 1024 && hovered) ? (
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
