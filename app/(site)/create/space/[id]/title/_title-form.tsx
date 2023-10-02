"use client"

import { useTransition } from "react"
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
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Title } from "@/components/ui/title"

import { updateSpaceWithParsedData } from "../../actions"
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

type Props = {
  id: string
  defaultValues: { title: string }
}
export const TitleForm: React.FC<Props> = ({ id, defaultValues }) => {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const { data } = useSession()
  const { step } = useSpaceCreationStep()
  const { mutateAsync } = trpc.updateSpace.useMutation({
    onSuccess() {
      router.push("." + step.nextPath)
    },
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      await forceDelay(mutateAsync({ id, data }), 500)
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gutter z-10 flex h-screen flex-col justify-between"
      >
        <div className="flex h-full grow flex-col items-start justify-center">
          <Title showAs={5} className="font-medium">
            Hi {data?.user?.name?.split(" ")[0]}! {step.label}
          </Title>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    autoFocus
                    type="text"
                    className="bg-transparent text-5xl font-medium focus:outline-none md:text-8xl"
                    placeholder="A Space Oddity."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <SpaceCreateFooter pending={pending} />
      </form>
    </Form>
  )
}
