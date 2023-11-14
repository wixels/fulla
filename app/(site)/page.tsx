"use client"

import { Dispatch, SetStateAction, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Sliders } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Separator } from "@/components/ui/separator"
import { Title } from "@/components/ui/title"

import { Filters } from "./_filters"

export default function Page({ searchParams }: { searchParams: QueryParams }) {
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
  return (
    <div className="gutter section">
      <Title className="font-mono font-semibold" level={1} showAs={2}>
        Browse
      </Title>
      <div className="flex items-center gap-5">
        <Filters defaultValues={searchParams} />
        <div className="h-5 w-[1px] bg-border"></div>
        <NavigationMenu hideViewport onValueChange={setValue}>
          <NavigationMenuList ref={setList}>
            {["All", "two", "three"].map((value, i) => (
              <NavigationMenuItem key={value} value={value}>
                <NavigationMenuTrigger
                  ref={(node) => onNodeUpdate(node, value)}
                >
                  {value}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-72 p-6">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. At
                    iure quasi assumenda. Quaerat, eligendi! Adipisci alias,
                    soluta libero saepe distinctio placeat molestias laborum
                    dolorem doloremque.
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>

          <NavigationMenuViewport
            offset={offset}
            style={{
              display: !offset ? "none" : undefined,
              transform: `translateX(${offset}px)`,
            }}
          />
        </NavigationMenu>
      </div>
    </div>
  )
}
