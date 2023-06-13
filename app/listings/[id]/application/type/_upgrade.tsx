"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, FileQuestion } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Title } from "@/components/ui/title"

const createWord = (text, index) => {
  const word = document.createElement("span")

  word.innerHTML = `${text} `

  word.classList.add("card-subtitle-word")

  word.style.transitionDelay = `${index * 40}ms`

  return word
}

type Props = {}
export const Upgrade: React.FC<Props> = ({}) => {
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    ;(() => {
      const subtitle = document.getElementsByClassName("card-subtitle")[0]
      const addWord = (text, index) =>
        subtitle.appendChild(createWord(text, index))
      const createSubtitle = (text) => text.split(" ").map(addWord)
      createSubtitle(
        "Upgrade to Priority Account for Faster Processing and Increased Visibility"
      )
    })()
  }, [])

  return (
    <motion.div
      onHoverEnd={() => setHovering((x) => !x)}
      onHoverStart={() => setHovering((x) => !x)}
      className="card relative hidden h-[40vh] w-screen flex-col items-start justify-between bg-stone-900 lg:order-2 lg:flex lg:h-screen lg:w-1/2"
    >
      <div className="card-content">
        <Title level={2} showAs={1} className="text-white">
          Go Pro and Get Ahead of the Crowd!
        </Title>
        <Title level={3} className="card-subtitle text-white"></Title>
        {hovering ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: Number(`0.15`),
              duration: 0.95,
              ease: [0.165, 0.84, 0.44, 1],
            }}
            className="w-full"
          >
            <Button className="w-full" variant={"secondary"} size={"lg"}>
              Upgrade Now!
            </Button>
          </motion.div>
        ) : null}
      </div>
      <footer className="absolute inset-x-0 bottom-0 z-10 p-12">
        <Button className="flex items-center gap-4 text-white" variant={"link"}>
          <span>Discover the Perks of Paid Account</span>
          <CheckCircle />
        </Button>
      </footer>
    </motion.div>
  )
}
