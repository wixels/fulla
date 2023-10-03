"use client"

import { useReducer, useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Space } from "@prisma/client"
import { motion } from "framer-motion"
import { ArrowRight, Info, Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { forceDelay } from "@/lib/forceDelay"
import { trpc } from "@/lib/trpc/client"
import { useSpaceCreationStep } from "@/hooks/use-space-creation-step"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { ToastAction } from "@/components/ui/toast"

import { SpaceCreateFooter } from "../space-create-footer"

const FormSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters.",
    })
    .max(25, {
      message: "That's a little too long",
    }),
})

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

type Props = {
  id: string
  defaultValues: { price: number }
}
export const PriceForm: React.FC<Props> = ({ id, defaultValues }) => {
  const [state, dispatch] = useReducer(counterReducer, {
    price: defaultValues.price || 0,
  })
  const router = useRouter()
  const [pending, startTransition] = useTransition()
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

  function onSubmit() {
    startTransition(async () => {
      await forceDelay(
        mutateAsync({
          id,
          data: {
            price: Number(state.price),
          },
        }),
        500
      )
    })
  }

  return (
    <div className="gutter z-10 flex h-screen flex-col items-center justify-between">
      <div className="flex h-full grow flex-col items-start justify-center">
        <Title style={{ marginBottom: 0 }} showAs={2} className="font-semibold">
          Now, set your price
        </Title>
        <Paragraph className="mt-2 text-muted-foreground">
          {"Don't worry, you can change it later"}
        </Paragraph>
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
              Places like yours in your area usually range from: R10,000 -
              R12,500
            </Paragraph>
          </CardContent>
        </Card>
        <SpaceCreateFooter
          pending={pending}
          onClick={() => onSubmit()}
          className="w-full"
        />
      </div>
    </div>
  )
}
