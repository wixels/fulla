"use client"

import React, { useReducer, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Listing } from "@prisma/client"
import * as z from "zod"

import { toast } from "@/hooks/use-toast"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Paragraph } from "@/components/ui/paragraph"
import { ListingFooter } from "@/components/listing-footer"
import { Spin } from "@/components/spin"

type Props = {
  update: (payload: { price: number }) => Promise<void>
  listing: Listing
}

type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "SET"; payload: string }

type CounterState = {
  price: number
}

const counterReducer = (
  state: CounterState,
  action: CounterAction
): CounterState => {
  switch (action.type) {
    case "INCREMENT":
      return { price: Number(state.price) + 1 }
    case "DECREMENT":
      return { price: Math.max(0, Number(state.price) - 1) }
    case "SET":
      return { price: Number(action.payload) }
    default:
      return state
  }
}
export const PriceForm: React.FC<Props> = ({ update, listing }) => {
  const [state, dispatch] = useReducer(counterReducer, {
    price: listing.price || 0,
  })
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  async function onSubmit() {
    router.prefetch(`/listings/create/${listing.id}/review`)
    if (state.price > 0) {
      if (listing.price === state.price) {
        router.push(`/listings/create/${listing.id}/review`)
      } else {
        startTransition(
          async () => await update({ price: Number(state.price) })
        )
      }
    } else {
      toast({
        title: "Uh oh!",
        description: "You can't rent your property for free",
      })
    }
  }

  return (
    <div>
      <Card className="mt-8 pt-6">
        <CardContent className="flex flex-col items-center gap-2 text-center">
          <div className="flex w-full items-center justify-between gap-5">
            <Button
              onClick={() => dispatch({ type: "DECREMENT" })}
              rounded={"full"}
              variant={"outline"}
            >
              -
            </Button>
            <Input
              type="number"
              sizing={"xl"}
              onChange={(e) =>
                dispatch({ type: "SET", payload: e.target.value })
              }
              min={1}
              step={1}
              value={state.price}
              className="grow text-center"
              style={{ fontSize: "2rem" }}
            />
            <Button
              onClick={() => dispatch({ type: "INCREMENT" })}
              rounded={"full"}
              variant={"outline"}
            >
              +
            </Button>
          </div>
          <Paragraph size={"sm"} className="text-muted-foreground">
            R {new Intl.NumberFormat().format(state.price)} / per month
          </Paragraph>
          <Paragraph
            size={"sm"}
            className="w-3/4 text-muted-foreground"
            style={{ marginTop: "2rem" }}
          >
            Places like yours in your area usually range from: R10,000 - R12,500
          </Paragraph>
        </CardContent>
      </Card>
      <ListingFooter progress={22}>
        <Link
          href={`/listings/create/${listing.id}/description`}
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
