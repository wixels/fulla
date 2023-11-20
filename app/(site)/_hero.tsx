"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { useInView } from "framer-motion"
import Balancer from "react-wrap-balancer"

import { buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { useNav } from "@/components/providers/nav-provider"

type Props = {}
export const Hero: React.FC<Props> = ({}) => {
  const { dispatch } = useNav()
  const ref = useRef(null)
  const isInView = useInView(ref)

  useEffect(() => {
    if (isInView) {
      dispatch({ type: "field", payload: true, field: "blur" })
      dispatch({ type: "field", payload: false, field: "background" })
    } else {
      dispatch({ type: "field", payload: false, field: "blur" })
      dispatch({ type: "field", payload: true, field: "background" })
    }
  }, [isInView])
  return (
    <div
      ref={ref}
      style={{ width: "100vw" }}
      className="card 2xl:aspect-[16:4] relative mt-[-3.7rem] aspect-video w-screen bg-stone-900 md:aspect-[16/5]"
    >
      <div className="card-content gutter flex h-full w-full items-center justify-normal">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center text-center">
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
