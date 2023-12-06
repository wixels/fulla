"use client"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import Balancer from "react-wrap-balancer"

import { Label } from "@/components/ui/label"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { Double } from "@/components/double"
import { MarketingHeader } from "@/components/navigation/marketing-header"
import { Section, sectionVariants } from "@/components/section"
import { StickyCursor } from "@/components/sticky-cursor"

import { HeroText } from "./_hero-text"

type Props = {}
const MarketingHomePage: React.FC<Props> = ({}) => {
  return (
    <div className="relative">
      <MarketingHeader />
      <Section className="gutter">
        <Title>
          Built to accelerate <br /> your workspace
        </Title>
        <Paragraph size={"lg"}>
          <Balancer>
            Transforming offices, empowering individuals – your workspace
            revolution.
          </Balancer>
        </Paragraph>
      </Section>
      <div className="gutter w-full">
        <Double />
      </div>
      <HeroText />
    </div>
  )
}
export default MarketingHomePage
