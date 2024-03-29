"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Category } from "@prisma/client"
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

import { SpaceCreateFooter } from "../space-create-footer"

type Props = {
  id: string
  defaultValues: { categoryId: string }
  categories: Category[]
}

const FormSchema = z.object({
  categoryId: z.string({ description: "Please Select a type" }),
})
export const CategoryForm: React.FC<Props> = ({
  id,
  defaultValues,
  categories,
}) => {
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
            category: {
              connect: { id: data.categoryId },
            },
          },
        }),
        500
      )
    })
  }

  console.log("step::: ", step)

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
          {categories.map((category, i) => (
            <motion.label
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: Number(`0.${i + 1}`),
                duration: 0.95,
                ease: [0.165, 0.84, 0.44, 1],
              }}
              key={category.label}
            >
              <input
                type="radio"
                className="peer hidden"
                id={category.label}
                value={category.id}
                {...form.register("categoryId")}
              />
              <div className="flex w-full cursor-pointer gap-2 rounded-lg border bg-background/75 p-6 shadow-lg backdrop-blur transition-all hover:border-zinc-600 hover:shadow peer-checked:border-blue-600 peer-checked:text-blue-600">
                <div className="grow">
                  <Paragraph>{category.label}</Paragraph>
                  <Paragraph className="text-muted-foreground" size={"sm"}>
                    {category?.description}
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
