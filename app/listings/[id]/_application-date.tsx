"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { Calendar as Cal } from "lucide-react"

import useElementWidth from "@/hooks/use-element-width"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Props = {
  listingId: string
}
export const ApplicationDate: React.FC<Props> = ({ listingId }) => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const elementRef = useRef<HTMLDivElement>(null)
  const width = useElementWidth(elementRef)
  console.log("data::: ", date)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          ref={elementRef}
          className="relative flex h-16 items-center justify-between rounded-full border"
        >
          <Input
            rounded={"full"}
            className="ml-2 border-none"
            placeholder="Check Availability"
          />
          <button className="flex aspect-square h-full items-center justify-center rounded-full bg-primary text-background">
            <Cal size={14} />
          </button>
        </div>
      </PopoverTrigger>
      <PopoverContent className={`w-[${width}px]`}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(date) => date < new Date()}
        />
        <Link href={`/listings/${listingId}/application/type`}>
          <Button disabled={date === undefined} size={"sm"} className="w-full">
            Start Application
          </Button>
        </Link>
      </PopoverContent>
    </Popover>
  )
}
