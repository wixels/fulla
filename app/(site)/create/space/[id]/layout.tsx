"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

import { spaceCreationSteps } from "@/lib/space-creation-steps"
import { cn } from "@/lib/utils"
import { useSpaceCreationStep } from "@/hooks/use-space-creation-step"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Icons } from "@/components/icons"

export default function Layout({
  children,
  params: { id },
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const { theme } = useTheme()
  const { index } = useSpaceCreationStep()

  return (
    <div
      style={{
        backgroundImage: `url(${
          theme === "dark" ? "/gradient-bg-dark.jpg" : "/gradient-bg-white.jpg"
        })`,
      }}
      className="flex min-h-screen flex-col bg-cover bg-center bg-no-repeat"
    >
      <div className="fixed inset-0 z-0 h-screen w-screen bg-background/30 backdrop-blur-xl"></div>
      <svg
        className="fixed inset-0 z-0 opacity-50 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
        viewBox="0 0 1422 800"
      >
        <defs>
          <linearGradient
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
            id="oooscillate-grad"
          >
            <stop
              stopColor="hsl(230, 55%, 50%)"
              stopOpacity="1"
              offset="0%"
            ></stop>
            <stop
              stopColor="hsl(230, 55%, 70%)"
              stopOpacity="1"
              offset="100%"
            ></stop>
          </linearGradient>
        </defs>
        <g
          strokeWidth="2"
          stroke="url(#oooscillate-grad)"
          fill="none"
          strokeLinecap="round"
        >
          <path
            d="M 0 572 Q 355.5 150 711 400 Q 1066.5 650 1422 572"
            opacity="0.05"
          ></path>
          <path
            d="M 0 550 Q 355.5 150 711 400 Q 1066.5 650 1422 550"
            opacity="0.09"
          ></path>
          <path
            d="M 0 528 Q 355.5 150 711 400 Q 1066.5 650 1422 528"
            opacity="0.13"
          ></path>
          <path
            d="M 0 506 Q 355.5 150 711 400 Q 1066.5 650 1422 506"
            opacity="0.16"
          ></path>
          <path
            d="M 0 484 Q 355.5 150 711 400 Q 1066.5 650 1422 484"
            opacity="0.20"
          ></path>
          <path
            d="M 0 462 Q 355.5 150 711 400 Q 1066.5 650 1422 462"
            opacity="0.24"
          ></path>
          <path
            d="M 0 440 Q 355.5 150 711 400 Q 1066.5 650 1422 440"
            opacity="0.28"
          ></path>
          <path
            d="M 0 418 Q 355.5 150 711 400 Q 1066.5 650 1422 418"
            opacity="0.32"
          ></path>
          <path
            d="M 0 396 Q 355.5 150 711 400 Q 1066.5 650 1422 396"
            opacity="0.35"
          ></path>
          <path
            d="M 0 374 Q 355.5 150 711 400 Q 1066.5 650 1422 374"
            opacity="0.39"
          ></path>
          <path
            d="M 0 352 Q 355.5 150 711 400 Q 1066.5 650 1422 352"
            opacity="0.43"
          ></path>
          <path
            d="M 0 330 Q 355.5 150 711 400 Q 1066.5 650 1422 330"
            opacity="0.47"
          ></path>
          <path
            d="M 0 308 Q 355.5 150 711 400 Q 1066.5 650 1422 308"
            opacity="0.51"
          ></path>
          <path
            d="M 0 286 Q 355.5 150 711 400 Q 1066.5 650 1422 286"
            opacity="0.54"
          ></path>
          <path
            d="M 0 264 Q 355.5 150 711 400 Q 1066.5 650 1422 264"
            opacity="0.58"
          ></path>
          <path
            d="M 0 242 Q 355.5 150 711 400 Q 1066.5 650 1422 242"
            opacity="0.62"
          ></path>
          <path
            d="M 0 220 Q 355.5 150 711 400 Q 1066.5 650 1422 220"
            opacity="0.66"
          ></path>
          <path
            d="M 0 198 Q 355.5 150 711 400 Q 1066.5 650 1422 198"
            opacity="0.70"
          ></path>
          <path
            d="M 0 176 Q 355.5 150 711 400 Q 1066.5 650 1422 176"
            opacity="0.73"
          ></path>
          <path
            d="M 0 154 Q 355.5 150 711 400 Q 1066.5 650 1422 154"
            opacity="0.77"
          ></path>
          <path
            d="M 0 132 Q 355.5 150 711 400 Q 1066.5 650 1422 132"
            opacity="0.81"
          ></path>
          <path
            d="M 0 110 Q 355.5 150 711 400 Q 1066.5 650 1422 110"
            opacity="0.85"
          ></path>
          <path
            d="M 0 88 Q 355.5 150 711 400 Q 1066.5 650 1422 88"
            opacity="0.89"
          ></path>
          <path
            d="M 0 66 Q 355.5 150 711 400 Q 1066.5 650 1422 66"
            opacity="0.92"
          ></path>
          <path
            d="M 0 44 Q 355.5 150 711 400 Q 1066.5 650 1422 44"
            opacity="0.96"
          ></path>
        </g>
      </svg>
      <header className="gutter absolute inset-x-0 top-0 z-20 mx-auto flex w-full max-w-7xl items-center justify-between py-8">
        <Icons.logo className="h-6 w-6" />
        <div className="flex gap-2">
          {spaceCreationSteps.map((step, i) => (
            <TooltipProvider delayDuration={0} key={step.path}>
              <Tooltip>
                <TooltipTrigger>
                  {i < index ? (
                    <Link href={"." + step.path}>
                      <motion.div
                        initial={{ scale: 1 }}
                        animate={
                          i === index
                            ? { scale: 1.5, opacity: 1, y: 0 }
                            : { scale: 1, opacity: 1, y: 0 }
                        }
                        className={cn("h-2 w-2 rounded-full bg-foreground/25", {
                          "bg-foreground": i === index,
                          "cursor-pointer": i <= index,
                        })}
                        transition={{
                          delay: Number(
                            i + 1 >= 10 ? `1.${i + 1}` : `0.${i + 1}`
                          ),
                          duration: 0.55,
                          ease: [0.075, 0.82, 0.965, 1],
                        }}
                      />
                    </Link>
                  ) : (
                    <motion.div
                      initial={{ scale: 1, opacity: 0, y: 40 }}
                      animate={
                        i === index
                          ? { scale: 1.5, opacity: 1, y: 0 }
                          : { scale: 1, opacity: 1, y: 0 }
                      }
                      className={cn("h-2 w-2 rounded-full bg-foreground/25", {
                        "bg-foreground": i === index,
                        "cursor-pointer": i <= index,
                      })}
                      transition={{
                        delay: Number(
                          i + 1 >= 10 ? `1.${i + 1}` : `0.${i + 1}`
                        ),
                        duration: 0.55,
                        ease: [0.075, 0.82, 0.965, 1],
                      }}
                    />
                  )}
                </TooltipTrigger>
                <TooltipContent>{step.name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </header>
      <div className="z-10 mx-auto w-full max-w-7xl">{children}</div>
    </div>
  )
}
