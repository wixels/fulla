"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import Balancer from "react-wrap-balancer"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Title, titleVariants } from "@/components/ui/title"

type Props = {}
const Empty: React.FC<Props> = ({}) => {
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
          No Spaces Yet!
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
            Just like innovation, the excitement lies in the potential, not the
            current state. Sometimes, the best spaces are yet to be discovered,
            and they&apos;re waiting for you to explore them.
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
          Remember, an empty state today is a canvas for tomorrow.
          <br /> Your ideal workspace is out there, and it&apos;s just a search
          away.
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
          <Balancer>
            In the world of office rentals, every query without results is a
            step closer to discovering a hidden gem. Keep exploring; your
            perfect office space is out there on the horizon.
          </Balancer>
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.26,
            duration: 0.95,
            ease: [0.165, 0.84, 0.44, 1],
          }}
          className={cn(
            buttonVariants({ variant: "link" }),
            "w-fit px-0 underline"
          )}
        >
          Request a space!
        </motion.button>
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
          NO SPACES YET • NO SPACES YET • NO SPACES YET • NO SPACES YET • NO
          SPACES YET • NO SPACES YET • NO SPACES YET • NO SPACES YET • NO SPACES
          YET • NO SPACES YET • NO SPACES YET • NO SPACES YET • NO SPACES YET •
          NO SPACES YET • NO SPACES YET •
        </motion.p>
      </div>
    </>
  )
}
export default Empty
