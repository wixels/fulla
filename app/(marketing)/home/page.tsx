"use client"

import Balancer from "react-wrap-balancer"

import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { Double } from "@/components/double"
import { MarketingHeader } from "@/components/navigation/marketing-header"
import { Section } from "@/components/section"

type Props = {}
const MarketingHomePage: React.FC<Props> = ({}) => {
  const projects = [
    {
      name: "On-Demand Desk",
      description: "",
      src: "/office.jpg",
    },
    {
      name: "Decimal",
      description: "Portfolio site for Decimal.",
      src: "/office-2.avif",
    },
  ]
  return (
    <div>
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
      <div className="w-full gutter">
        <Double />
      </div>
    </div>
  )
}
export default MarketingHomePage
