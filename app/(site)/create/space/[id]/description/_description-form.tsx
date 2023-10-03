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
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Paragraph } from "@/components/ui/paragraph"
import { Textarea } from "@/components/ui/textarea"
import { Title } from "@/components/ui/title"
import { ToastAction } from "@/components/ui/toast"

import { updateSpaceWithParsedData } from "../../actions"
import { SpaceCreateFooter } from "../space-create-footer"

const FormSchema = z.object({
  description: z
    .string()
    .min(25, {
      message: "Description must be at least 25 characters.",
    })
    .max(100, {
      message: "Description must not be longer than 100 characters.",
    }),
})
type Props = {
  id: string
  defaultValues: { description: string }
}
export const DescriptionForm: React.FC<Props> = ({ id, defaultValues }) => {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const { data } = useSession()
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
      await forceDelay(mutateAsync({ id, data }), 500)
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gutter z-10 flex h-screen flex-col justify-between"
      >
        <div className="flex h-full w-full grow flex-col items-start justify-center">
          <Title
            style={{ marginBottom: 0 }}
            showAs={2}
            className="font-semibold"
          >
            Create your description
          </Title>
          <Paragraph className="mt-2 text-muted-foreground">
            Share what makes your place special.
          </Paragraph>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mt-8 w-full lg:w-3/4">
                <FormControl>
                  <Textarea
                    placeholder="Describe your space"
                    rows={10}
                    className="resize-none bg-background"
                    {...field}
                  />
                  {/* <input
                    autoFocus
                    type="text"
                    // className="bg-transparent text-5xl font-medium focus:outline-none md:text-8xl"
                    placeholder="A Space Oddity."
                    {...field}
                  /> */}
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
