"use client"

import { Check, Star } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Paragraph } from "@/components/ui/paragraph"
import { Separator } from "@/components/ui/separator"
import { Title } from "@/components/ui/title"

type Props = {}
export const ListingAuthor: React.FC<Props> = ({}) => {
  return (
    <section className="section flex w-full flex-col gap-6">
      <div className="flex items-center gap-6">
        <Avatar size={"xl"}>
          <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <Title
            className="font-semibold"
            style={{ margin: "0 0 0.625rem 0" }}
            level={3}
          >
            Hosted by Dan
          </Title>
          <Paragraph className="text-muted-foreground" size={"sm"}>
            Joined in November 2020
          </Paragraph>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:gap-12">
        <div className="col-span-2 flex flex-col gap-6 lg:col-span-1">
          <div className="flex items-center gap-8">
            <Paragraph
              size={"lg"}
              className="flex items-center gap-2 font-semibold"
            >
              <Star size={22} /> Reviews
            </Paragraph>
            <Paragraph
              size={"lg"}
              className="flex items-center gap-2 font-semibold"
            >
              <Check size={22} /> Identity verified
            </Paragraph>
          </div>
          <Paragraph size={"sm"} className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas
            sequi aliquid cum eaque, voluptatum, nostrum quae natus at corrupti
            ad quidem expedita, voluptatibus aut. Adipisci quas sit enim debitis
            fugit?
          </Paragraph>
        </div>
        <div className="col-span-2 flex flex-col gap-6 lg:col-span-1">
          <Paragraph size={"sm"} className="text-muted-foreground">
            Language: English
          </Paragraph>
          <Paragraph size={"sm"} className="text-muted-foreground">
            Response Time: Within an hour
          </Paragraph>
        </div>
      </div>
      <Separator className="mt-16" />
    </section>
  )
}
