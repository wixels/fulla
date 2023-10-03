"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import Balancer from "react-wrap-balancer"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Title, titleVariants } from "@/components/ui/title"

type Props = {}
const NotFound: React.FC<Props> = ({}) => {
  const MotionLink = motion(Link, { forwardMotionProps: true })
  return (
    <>
      <div className="gutter section-top flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.15,
            duration: 0.95,
            ease: [0.165, 0.84, 0.44, 1],
          }}
          className="h-12 w-12 rounded-full bg-orange-700"
        ></motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.17,
            duration: 0.95,
            ease: [0.165, 0.84, 0.44, 1],
          }}
          className={titleVariants({ level: 1 })}
        >
          404-Not Found.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.19,
            duration: 0.95,
            ease: [0.165, 0.84, 0.44, 1],
          }}
          className="w-1/2"
        >
          <Balancer>
            The exciting thing is what something can become, not what it is. And
            the sooner something goes into the world, the sooner it can start
            being made better.
          </Balancer>
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.95,
            ease: [0.165, 0.84, 0.44, 1],
          }}
        >
          So done is still better than perfect.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.22,
            duration: 0.95,
            ease: [0.165, 0.84, 0.44, 1],
          }}
        >
          But done is never finished.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.24,
            duration: 0.95,
            ease: [0.165, 0.84, 0.44, 1],
          }}
        >
          {
            "Today's 404 page is tomorrow's breakthrough. <br /> It's the nature of the internet."
          }
        </motion.p>
        <MotionLink
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.26,
            duration: 0.95,
            ease: [0.165, 0.84, 0.44, 1],
          }}
          href={"/feed"}
          className={cn(
            buttonVariants({ variant: "link" }),
            "w-fit px-0 underline"
          )}
        >
          Back to home
        </MotionLink>
      </div>
      <div className="section-top w-screen overflow-x-hidden">
        <motion.p
          className="whitespace-nowrap font-mono text-muted-foreground"
          animate={{
            x: [0, -1035],
            transition: {
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 5,
                ease: "linear",
              },
            },
          }}
        >
          NOT FOUND • NOT FOUND • NOT FOUND • NOT FOUND • NOT FOUND • NOT FOUND
          • NOT FOUND • NOT FOUND • NOT FOUND • NOT FOUND • NOT FOUND • NOT
          FOUND • NOT FOUND • NOT FOUND • NOT FOUND • NOT FOUND • NOT FOUND •
          NOT FOUND • NOT FOUND • NOT FOUND • NOT FOUND • NOT FOUND • NOT FOUND
          • NOT FOUND • NOT FOUND • NOT FOUND • NOT FOUND • NOT FOUND • NOT
          FOUND • NOT FOUND • NOT FOUND • NOT FOUND • NOT FOUND • NOT FOUND •
          NOT FOUND • NOT FOUND • NOT FOUND • NOT FOUND • NOT FOUND • NOT FOUND
          • NOT FOUND • NOT FOUND • NOT FOUND • NOT FOUND • NOT FOUND • NOT
          FOUND • NOT FOUND • NOT FOUND • NOT FOUND • NOT FOUND • NOT FOUND •
          NOT FOUND • NOT FOUND • NOT FOUND • NOT FOUND • NOT FOUND • NOT FOUND
          •
        </motion.p>
      </div>
    </>
  )
}
export default NotFound
