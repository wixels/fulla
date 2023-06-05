"use client"

import { Star } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"

type Props = {}
export const ListingReviews: React.FC<Props> = ({}) => {
  return (
    <section className="flex flex-col gap-4">
      <Title className="flex items-center" level={3}>
        <Star size={28} />
        <span className="mx-2 font-semibold">4.97 • </span>
        <span className="underline">Fulla Certified</span>
      </Title>
      <ul className="flex flex-col gap-6">
        <li className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" />
              <AvatarFallback>DS</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">Kevin Powell</p>
              <p className="text-xs text-muted-foreground">Apr 2023</p>
            </div>
          </div>
          <Paragraph size={"sm"} className="w-[80%] text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim
            cumque reiciendis odio quae earum cum esse delectus placeat a
            repudiandae nulla
          </Paragraph>
        </li>
      </ul>
    </section>
  )
}
