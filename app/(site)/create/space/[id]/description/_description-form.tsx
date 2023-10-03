"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Prisma, Space } from "@prisma/client"
import { useCompletion } from "ai/react"
import { motion } from "framer-motion"
import { ArrowRight, Info, Loader2, Star } from "lucide-react"
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
import { Icons } from "@/components/icons"
import { Spin } from "@/components/spin"

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
  space: Prisma.SpaceGetPayload<{
    include: {
      highlights: true
      amenities: true
      offerings: true
      type: true
      category: true
    }
  }>
  defaultValues: { description: string }
}
export const DescriptionForm: React.FC<Props> = ({
  id,
  defaultValues,
  space,
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
      await forceDelay(mutateAsync({ id, data }), 500)
    })
  }

  const { complete, completion, isLoading } = useCompletion({
    api: "/api/ai/completion",
    onResponse: (res) => {
      // trigger something when the response starts streaming in
      // e.g. if the user is rate limited, you can show a toast
      if (res.status === 429) {
        toast({
          variant: "destructive",
          description: "Youa re being rate limited. Please try again later.",
        })
        // toast.error("You are being rate limited. Please try again later.")
      }
    },
    onError(error) {
      toast({
        description: error.message,
        variant: "destructive",
      })
    },
  })

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
          <Button
            type="button"
            aria-disabled={isLoading}
            onClick={() => complete(JSON.stringify(space))}
            size={"sm"}
            rounded={"full"}
          >
            <Star className="mr-2 h-4 w-4" /> Ask AI
            {isLoading ? <Spin /> : null}
          </Button>
          <p>{completion}</p>
        </div>
        <SpaceCreateFooter pending={pending} />
      </form>
    </Form>
  )
}
