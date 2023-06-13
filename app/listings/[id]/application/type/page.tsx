"use client"

import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import Balancer from "@/components/balancer"

import { TypeForm } from "./_type-form"
import { Upgrade } from "./_upgrade"

type Props = {
  params: { id: string }
}
const ListingApplicationType: React.FC<Props> = ({ params: { id } }) => {
  return (
    <div className="flex w-full flex-col md:flex-row md:overflow-hidden">
      <div className="gutter flex min-h-[60vh] w-full flex-col justify-center bg-[#FCFCFC] lg:h-screen lg:w-1/2">
        <div className="flex h-full w-full flex-col justify-center">
          <Title className="font-semibold" level={1} showAs={2}>
            <Balancer>Select your application type</Balancer>
          </Title>
          <Paragraph className="text-muted-foreground" size={"lg"}>
            <Balancer>Fast track your progress to your next home!</Balancer>
          </Paragraph>
          <TypeForm id={id} />
        </div>
      </div>
      <Upgrade />
    </div>
  )
}

export default ListingApplicationType
