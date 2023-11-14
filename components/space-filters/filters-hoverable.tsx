"use client"

import { useState } from "react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "../ui/navigation-menu"

type Props = {}
export const FiltersHoverable: React.FC<Props> = ({}) => {
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
    <NavigationMenu hideViewport onValueChange={setValue}>
      <NavigationMenuList ref={setList}>
        {["All", "two", "three"].map((value, i) => (
          <NavigationMenuItem key={value} value={value}>
            <NavigationMenuTrigger ref={(node) => onNodeUpdate(node, value)}>
              {value}
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

      <NavigationMenuViewport
        offset={offset}
        style={{
          display: !offset ? "none" : undefined,
          transform: `translateX(${offset}px)`,
        }}
      />
    </NavigationMenu>
  )
}
