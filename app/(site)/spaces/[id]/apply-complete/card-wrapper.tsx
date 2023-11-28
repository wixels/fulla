"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion"
import { CheckCircle2 } from "lucide-react"

type Props = {
  children: React.ReactNode
}
export const CardWrapper: React.FC<Props> = ({ children }) => {
  const boundary = 400

  const [trackMouse, setTrackMouse] = useState(false)

  const timeoutRef = useRef<NodeJS.Timeout>()

  const cardX = useMotionValue(0)
  const cardY = useMotionValue(0)
  const rotateX = useTransform(cardY, [-600, 600], [8, -8])
  const rotateY = useTransform(cardX, [-600, 600], [-8, 8])

  const diagonalMovement = useTransform<number, number>(
    [rotateX, rotateY],
    ([newRotateX, newRotateY]) => newRotateX + newRotateY
  )

  const sheenPosition = useTransform(diagonalMovement, [-16, 16], [-100, 200])
  const sheenOpacity = useTransform(sheenPosition, [-100, 50, 200], [0, 0.1, 0])
  const sheenGradient = useMotionTemplate`linear-gradient(
    30deg,
    transparent,
    rgba(var(--sheen-color) / ${sheenOpacity}) ${sheenPosition}%,
    transparent)`

  const cardRef = useRef<HTMLDivElement>(null)

  const cardCenterPosition = useCallback(() => {
    if (!cardRef.current) {
      return { x: 0, y: 0 }
    }

    const { x, y, width, height } = cardRef.current.getBoundingClientRect()

    return { x: x + width / 2, y: y + height / 2 }
  }, [cardRef])

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      const { x, y } = cardCenterPosition()

      const offsetX = event.clientX - x
      const offsetY = event.clientY - y

      // Calculate distance between the mouse pointer and center of the card.
      const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY)

      // Mouse enters enter boundary.
      if (distance <= boundary && !trackMouse) {
        setTrackMouse(true)
      } else if (!trackMouse) {
        return
      }

      cardX.set(offsetX)
      cardY.set(offsetY)

      // @ts-ignore
      clearTimeout(timeoutRef.current)

      // Revert the card back to the center position after the mouse stops moving.
      timeoutRef.current = setTimeout(() => {
        void animate(cardX, 0, { duration: 2, ease: "backInOut" })
        void animate(cardY, 0, { duration: 2, ease: "backInOut" })

        void animate(sheenOpacity, 0, { duration: 2, ease: "backInOut" })

        setTrackMouse(false)
      }, 1000)
    },
    [cardX, cardY, cardCenterPosition, trackMouse, sheenOpacity]
  )

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
    }
  }, [onMouseMove])

  return (
    <motion.div
      className="w-full rounded-lg bg-background [--sheen-color:180_180_180] dark:[--sheen-color:200_200_200]"
      ref={cardRef}
      style={{
        perspective: "800",
        backgroundImage: sheenGradient,
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
    >
      {children}
    </motion.div>
  )
}
