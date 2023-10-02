"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Type } from "@prisma/client"
import { useQueryClient } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { forceDelay } from "@/lib/forceDelay"
import { trpc } from "@/lib/trpc/client"
import { useSpaceCreationStep } from "@/hooks/use-space-creation-step"
import { useToast } from "@/hooks/use-toast"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { ToastAction } from "@/components/ui/toast"

import { updateSpaceWithParsedData } from "../../actions"
import { SpaceCreateFooter } from "../space-create-footer"

type Props = {
  id: string
  defaultValues: { typeId: string }
  types: Type[]
}

const FormSchema = z.object({
  typeId: z.string({ description: "Please Select a type" }),
})
export const TypeForm: React.FC<Props> = ({ id, defaultValues, types }) => {
  const utils = trpc.useContext()
  const { toast } = useToast()
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const { step } = useSpaceCreationStep()
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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      await forceDelay(
        mutateAsync({
          id,
          data: {
            type: {
              connect: {
                id: data.typeId,
              },
            },
          },
        }),
        500
      )
    })
  }
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="gutter z-10 flex h-screen flex-col justify-between"
    >
      <div className="flex h-full grow flex-col items-start justify-center gap-2">
        <Title showAs={5} className="font-medium">
          {step.label}
        </Title>
        <div className="flex flex-col gap-4">
          {types.map((type, i) => (
            <motion.label
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: Number(`0.${i + 1}`),
                duration: 0.95,
                ease: [0.165, 0.84, 0.44, 1],
              }}
              key={type.label}
            >
              <input
                type="radio"
                className="peer hidden"
                id={type.label}
                value={type.id}
                {...form.register("typeId")}
              />
              <div className="flex w-full cursor-pointer gap-2 rounded-lg border bg-background/75 p-6 shadow-lg backdrop-blur transition-all hover:border-zinc-600 hover:shadow peer-checked:border-blue-600 peer-checked:text-blue-600">
                <div className="grow">
                  <Paragraph>{type.label}</Paragraph>
                  <Paragraph className="text-muted-foreground" size={"sm"}>
                    {type.description}
                  </Paragraph>
                </div>
              </div>
            </motion.label>
          ))}
        </div>
      </div>
      <SpaceCreateFooter pending={pending} />
    </form>
  )
}
