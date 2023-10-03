"use client"

import { useEffect, useState, useTransition } from "react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
    .max(500, {
      message: "Description must not be longer than 500 characters.",
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
      images: true
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
  const [tone, setTone] = useState("formal")
  const { step } = useSpaceCreationStep()
  const utils = trpc.useContext()
  const { toast } = useToast()
  const { mutateAsync } = trpc.space.update.useMutation({
    onSuccess() {
      utils.space.draft.invalidate({ id })
      router.push("." + step.nextPath)
    },
    onError(error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
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
      }
    },
    onFinish: () => {
      // alert("Successfully generated completion!")
      // do something with the completion result
      // toast.success("Successfully generated completion!")
    },
  })

  useEffect(() => {
    if (completion) {
      form.setValue("description", completion)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completion])

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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-4 flex items-center gap-2">
            <Button
              type="button"
              aria-disabled={isLoading}
              onClick={() =>
                complete(
                  "generate a property description in a " +
                    tone +
                    " tone based on this stringified json obj. Also, don't wrap anything in quotations and don't include any images or links or references to that. Also, don't make up any information or details, only take information from my prompt and do not add anything you do not know." +
                    JSON.stringify(space)
                )
              }
              rounded={"full"}
            >
              Ask AI
              <motion.div
                animate={
                  isLoading
                    ? { y: 0, opacity: 1 }
                    : { y: "100%", opacity: 0, display: "none" }
                }
              >
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              </motion.div>
              <motion.div
                animate={
                  !isLoading
                    ? { y: 0, opacity: 1 }
                    : { y: "-100%", opacity: 0, display: "none" }
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-sparkles ml-2"
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                  <path d="M5 3v4" />
                  <path d="M19 17v4" />
                  <path d="M3 5h4" />
                  <path d="M17 19h4" />
                </svg>
              </motion.div>
            </Button>
            <Select value={tone} onValueChange={(e) => setTone(e)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a tone..." />
              </SelectTrigger>
              <SelectContent>
                {[
                  { label: "Formal 🎩", value: "formal" },
                  { label: "Casual 🌼", value: "casual" },
                  { label: "Inquisitive 🧐", value: "inquisitive" },
                  { label: "Appreciative 🌟", value: "appreciative" },
                  { label: "Assertive 🚀", value: "assertive" },
                  { label: "Apologetic 😔", value: "apologetic" },
                  { label: "Friendly 🌞", value: "friendly" },
                  { label: "Patient 🌱", value: "patient" },
                  { label: "Encouraging 🌈", value: "encouraging" },
                  { label: "Humorous 😂", value: "humorous" },
                ].map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <SpaceCreateFooter pending={pending} />
      </form>
    </Form>
  )
}
