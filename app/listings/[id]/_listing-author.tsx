"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"

type Props = {}
export const ListingAuthor: React.FC<Props> = ({}) => {
  return (
    <section className="section-top order-4 flex w-full flex-col gap-6">
      <div className="flex items-center gap-6">
        <Avatar size={"xl"}>
          <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <Title style={{ margin: "0 0 0.625rem 0" }} level={3}>
            Hosted by Dan
          </Title>
          <Paragraph className="text-muted-foreground" size={"sm"}>
            Joined in November 2020
          </Paragraph>
        </div>
      </div>
    </section>
  )
}
