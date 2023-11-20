"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Balancer from "react-wrap-balancer"

import { useInView } from "@/hooks/use-in-view"
import { buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { useNav } from "@/components/providers/nav-provider"

type Props = {}
export const Hero: React.FC<Props> = ({}) => {
  const { state, dispatch } = useNav()
  const [hasTriggeredHeroScroller, setHasTriggeredHeroScroller] =
    useState(false)

  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0,
    initialInView: true,
    onChange(inView) {
      if (inView) {
        console.log(
          "have i triggered scroll state::: ",
          hasTriggeredHeroScroller
        )
        if (hasTriggeredHeroScroller) {
          dispatch({ type: "field", payload: true, field: "blur" })
        } else {
          dispatch({ type: "field", payload: false, field: "blur" })
        }
        dispatch({ type: "field", payload: false, field: "background" })
      } else {
        dispatch({ type: "field", payload: false, field: "blur" })
        dispatch({ type: "field", payload: true, field: "background" })
      }
    },
  })

  const { ref } = useInView({
    threshold: 1,
    initialInView: true,
    onChange(inView) {
      if (inView) {
        dispatch({ type: "field", payload: false, field: "blur" })
        dispatch({ type: "field", payload: false, field: "background" })
      } else {
        dispatch({ type: "field", payload: true, field: "blur" })
        dispatch({ type: "field", payload: false, field: "background" })
      }
    },
  })

  useEffect(() => {
    if (!heroInView && !hasTriggeredHeroScroller) {
      setHasTriggeredHeroScroller(true)
    }
  }, [heroInView])

  return (
    <div
      style={{ width: "100vw" }}
      className="card relative mt-[-3.7rem] h-[40vh] 2xl:h-[47vh] w-screen bg-stone-900"
    >
      <div
        ref={heroRef}
        className="absolute inset-x-0 bottom-[4rem] h-1 w-full"
      ></div>
      <div className="card-content gutter flex h-full w-full items-center justify-normal">
        <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center justify-center text-center">
          <div
            ref={ref}
            className="absolute inset-x-0 top-[-2rem] h-2 w-full"
          ></div>
          <Title
            className="font-mono font-bold text-white"
            level={2}
            showAs={3}
          >
            <Balancer>Work Smarter, Not Harder – Go Pro!</Balancer>
          </Title>

          <Paragraph className="text-white">
            <Balancer>
              Stand Out, Sign Up. Pro Members Get Noticed First!
            </Balancer>
          </Paragraph>
          <Link
            href={"/profile"}
            className={buttonVariants({ className: "mt-4" })}
          >
            Go Pro!
          </Link>
        </div>
      </div>
    </div>
  )
}
