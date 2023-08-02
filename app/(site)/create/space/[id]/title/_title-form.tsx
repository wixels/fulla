"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Space } from "@prisma/client"
import { motion } from "framer-motion"
import { ArrowRight, Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { forceDelay } from "@/lib/forceDelay"
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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.title !== defaultValues.title) {
      startTransition(async () => {
        await forceDelay(updateSpaceWithParsedData({ data, id }), 500)
      })
    }
    router.push("." + step.nextPath)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="z-10 flex h-screen flex-col justify-between"
      >
        <div className="gutter flex h-full grow flex-col items-start justify-center px-16 lg:px-32 xl:px-64">
          <Title showAs={5} className="font-medium text-muted-foreground">
            Hi {data?.user?.name?.split(" ")[0]}! Give your space a name
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
        <footer className="gutter flex items-center justify-between py-8">
          <div>x</div>
          <div className="flex items-center gap-2">
            <Button disabled={pending} type="submit" rounded={"full"}>
              Next
              <motion.div
                animate={
                  pending
                    ? { y: 0, opacity: 1 }
                    : { y: "100%", opacity: 0, display: "none" }
                }
              >
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              </motion.div>
              <motion.div
                animate={
                  !pending
                    ? { y: 0, opacity: 1 }
                    : { y: "-100%", opacity: 0, display: "none" }
                }
              >
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.div>
            </Button>
          </div>
        </footer>
      </form>
    </Form>
  )
}
