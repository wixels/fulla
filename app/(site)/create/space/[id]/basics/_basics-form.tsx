"use client"

import React, { useReducer, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { forceDelay } from "@/lib/forceDelay"
import { trpc } from "@/lib/trpc/client"
import { cn } from "@/lib/utils"
import { useSpaceCreationStep } from "@/hooks/use-space-creation-step"
import { useToast } from "@/hooks/use-toast"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paragraph } from "@/components/ui/paragraph"
import { ToastAction } from "@/components/ui/toast"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { SpaceCreateFooter } from "../space-create-footer"
import { BasicsType } from "./page"

const basics: Array<{
  key: keyof BasicsType
  label: string
}> = [
  { key: "bathrooms", label: "Bathrooms" },
  { key: "rooms", label: "Rooms" },
  { key: "desks", label: "Desks" },
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
  bathrooms: number
  rooms: number
  desks: number
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

type NewType = BasicsType

export const BasicsForm = ({
  defaultValues,
  id,
}: {
  id: string
  defaultValues: {
    bathrooms: number
    rooms: number
    desks: number
  }
  //   listing: NewType & { id: string }
}) => {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [state, dispatch] = useReducer(counterReducer, defaultValues)
  const { step } = useSpaceCreationStep()
  const utils = trpc.useContext()
  const { toast } = useToast()
  const { mutateAsync } = trpc.space.update.useMutation({
    onSuccess() {
      utils.space.draft.invalidate({ id })
      router.push("." + step.nextPath)
    },
    onError() {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    },
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
    router.prefetch("." + step.nextPath)
    if (areAllCountsGreaterThanZero(state)) {
      startTransition(async () => {
        await forceDelay(mutateAsync({ data: state, id }), 500)
      })
    } else {
      toast({
        title: "Uh oh!",
        description: "Make sure you have at least 1 of everything",
      })
    }
  }

  return (
    <div className="flex flex-col">
      {basics.map((basic, i) => (
        <div className="flex cursor-pointer items-center justify-between border-b py-8">
          <div className="flex items-center gap-2">
            <Paragraph className="font-medium">{basic.label}</Paragraph>
          </div>
          <div className="flex items-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
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
      <SpaceCreateFooter pending={pending} onClick={() => onSubmit()} />
    </div>
  )
}
