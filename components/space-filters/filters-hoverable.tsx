"use client"

import { useState } from "react"
import Link from "next/link"

import { serverClient } from "@/lib/trpc/server"
import { spaceQuerySchema } from "@/lib/validations/space"
import { useTypedQuery } from "@/hooks/use-typed-query"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { buttonVariants } from "../ui/button"
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
    <NavigationMenu hideViewport={orgs.length > 1} onValueChange={setValue}>
      <NavigationMenuList ref={setList}>
        <NavigationMenuItem>
          {/* <Link href="/" legacyBehavior passHref> */}
          <NavigationMenuLink
            onClick={() => {
              removeByKey("orgId")
            }}
            className={buttonVariants({
              rounded: "full",
              variant: data.orgId ? "outline" : "default",
              size: "sm",
              className: "cursor-pointer",
            })}
          >
            All
          </NavigationMenuLink>
        </NavigationMenuItem>
        {orgs.map((org, i) => (
          <NavigationMenuItem key={org.id} value={org.id}>
            <NavigationMenuTrigger
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
              {org.name}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-72 p-6">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. At
                iure quasi assumenda. Quaerat, eligendi! Adipisci alias, soluta
                libero saepe distinctio placeat molestias laborum dolorem
                doloremque.
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>

      {orgs.length > 1 ? (
        <NavigationMenuViewport
          offset={offset}
          style={{
            display: !offset ? "none" : undefined,
            transform: `translateX(${offset}px)`,
          }}
        />
      ) : null}
    </NavigationMenu>
  )
}
