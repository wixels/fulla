"use client"

import React, { useReducer, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { compareObjects } from "@/lib/compareObjects"
import { useToast } from "@/hooks/use-toast"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paragraph } from "@/components/ui/paragraph"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ListingFooter } from "@/components/listing-footer"
import { Spin } from "@/components/spin"

import { BasicsType } from "./page"

const basics: Array<{
  key: keyof BasicsType
  label: string
}> = [
  { key: "guestCount", label: "Guests" },
  { key: "roomCount", label: "Bedrooms" },
  { key: "bedCount", label: "Beds" },
  { key: "bathroomCount", label: "Bathrooms" },
]

type CounterAction =
  | {
      type: "INCREMENT"
      item: keyof BasicsType
    }
  | {
      type: "DECREMENT"
      item: keyof BasicsType
    }

type CounterState = {
  guestCount: number
  roomCount: number
  bedCount: number
  bathroomCount: number
}

const counterReducer = (
  state: CounterState,
  action: CounterAction
): CounterState => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, [action.item]: state[action.item] + 1 }
    case "DECREMENT":
      return {
        ...state,
        [action.item]: Math.max(0, state[action.item] - 1),
      }
    default:
      return state
  }
}

export const BasicsForm = ({
  update,
  listing,
  id,
}: {
  update: (payload: BasicsType) => Promise<void>
  listing: BasicsType
  id: string
}) => {
  const { toast } = useToast()
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [state, dispatch] = useReducer(counterReducer, {
    guestCount: listing.guestCount ?? 0,
    roomCount: listing.roomCount ?? 0,
    bedCount: listing.bedCount ?? 0,
    bathroomCount: listing.bathroomCount ?? 0,
  })

  const areAllCountsGreaterThanZero = (state: CounterState): boolean => {
    return Object.values(state).every((count) => count > 0)
  }

  const handleIncrement = (item: keyof BasicsType) => {
    dispatch({ type: "INCREMENT", item })
  }

  const handleDecrement = (item: keyof BasicsType) => {
    dispatch({ type: "DECREMENT", item })
  }

  async function onSubmit() {
    if (areAllCountsGreaterThanZero(state)) {
      if (compareObjects(listing, state)) {
        router.push(`/listings/${id}/offerings`)
      } else {
        startTransition(async () => await update(state))
      }
    } else {
      toast({
        title: "Uh oh!",
        description: "Make sure you have at least 1 of everything",
      })
    }
  }

  return (
    <div className="flex flex-col">
      {basics.map((basic) => (
        <div className="flex cursor-pointer items-center justify-between border-b py-8">
          <div className="flex items-center gap-2">
            <Paragraph className="font-medium">{basic.label}</Paragraph>
          </div>
          <div className="flex items-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    onClick={() => handleDecrement(basic.key)}
                    size={"sm"}
                    variant={"outline"}
                    rounded={"full"}
                  >
                    -
                  </Button>
                </TooltipTrigger>
                {state[basic.key] === 0 ? (
                  <TooltipContent key={`${basic.key}-tooltip`}>
                    <p>You cannot have 0 {basic.label.toLowerCase()}</p>
                  </TooltipContent>
                ) : null}
              </Tooltip>
            </TooltipProvider>

            <Input
              style={{ width: "5rem" }}
              rounded={"full"}
              value={state[basic.key]}
              type="number"
              readOnly
            />
            <Button
              onClick={() => handleIncrement(basic.key)}
              size={"sm"}
              variant={"outline"}
              rounded={"full"}
            >
              +
            </Button>
          </div>
        </div>
      ))}
      <ListingFooter progress={22}>
        <Link
          href={`/listings/${id}/address`}
          className={buttonVariants({ variant: "link" })}
        >
          Back
        </Link>
        <Button onClick={onSubmit} type="submit">
          {pending ? <Spin /> : "Next"}
        </Button>
      </ListingFooter>
    </div>
  )
}
