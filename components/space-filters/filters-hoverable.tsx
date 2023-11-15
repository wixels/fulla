"use client"

import { useState } from "react"
import Link from "next/link"

import { serverClient } from "@/lib/trpc/server"
import { spaceQuerySchema } from "@/lib/validations/space"
import { useTypedQuery } from "@/hooks/use-typed-query"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { PublishedSpaceCard } from "../space-cards/published-space-card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button, buttonVariants } from "../ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "../ui/navigation-menu"

type Props = {
  orgs: Awaited<ReturnType<typeof serverClient.org.all>>
}
export const FiltersHoverable: React.FC<Props> = ({ orgs }) => {
  const [offset, setOffset] = useState<number | undefined>()
  const [list, setList] = useState<HTMLUListElement | null>(null)
  const [value, setValue] = useState<string>("")
  const onNodeUpdate = (
    trigger: HTMLButtonElement | null,
    itemValue: string | undefined
  ) => {
    if (trigger && list && value === itemValue) {
      const listWidth = list.offsetWidth
      const listCenter = listWidth / 2

      const triggerOffsetRight =
        listWidth -
        trigger.offsetLeft -
        trigger.offsetWidth +
        trigger.offsetWidth / 2

      setOffset(Math.round(listCenter - triggerOffsetRight))
    } else if (value === "" || !value) {
      setOffset(undefined)
    }
    return trigger
  }

  const { data, setQuery, removeByKey } = useTypedQuery(spaceQuerySchema)

  return (
    <div className="no-scrollbar relative flex grow items-start gap-4 overflow-y-visible overflow-x-scroll">
      <Button
        onClick={() => {
          removeByKey("orgId")
        }}
        rounded={"full"}
        variant={data.orgId ? "outline" : "default"}
        size="xs"
        className="sticky left-0 z-10 px-5"
      >
        All
      </Button>
      {orgs.map((org) => (
        <>
          {org.spaces.length > 0 ? (
            <HoverCard openDelay={20} closeDelay={0} key={org.id}>
              <HoverCardTrigger asChild>
                <Button
                  size="xs"
                  rounded={"full"}
                  variant={data.orgId === org.id ? "default" : "outline"}
                  onClick={() => {
                    setQuery("orgId", org.id)
                  }}
                  className="flex items-center gap-2"
                  ref={(node) => onNodeUpdate(node, org.id)}
                >
                  <Avatar size={"xs"}>
                    <AvatarFallback>{org.name[0]}</AvatarFallback>
                    <AvatarImage src={org.logo?.fileUrl} alt={org.name} />
                  </Avatar>
                  <span className="line-clamp-1">{org.name}</span>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="p-2">
                <PublishedSpaceCard space={org.spaces[0]} />
              </HoverCardContent>
            </HoverCard>
          ) : (
            <Button
              size="xs"
              rounded={"full"}
              variant={data.orgId === org.id ? "default" : "outline"}
              onClick={() => {
                setQuery("orgId", org.id)
              }}
              className="flex items-center gap-2"
              ref={(node) => onNodeUpdate(node, org.id)}
            >
              <Avatar size={"xs"}>
                <AvatarFallback>{org.name[0]}</AvatarFallback>
                <AvatarImage src={org.logo?.fileUrl} alt={org.name} />
              </Avatar>
              <span className="line-clamp-1">{org.name}</span>
            </Button>
          )}
        </>
      ))}
    </div>
  )
}
