"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { amenities, offerings } from "@/prisma/data"
import { zodResolver } from "@hookform/resolvers/zod"
import { Amenity, Highlight, Offering } from "@prisma/client"
import { motion } from "framer-motion"
import { Building, Circle, Citrus, Home, Pin, Trees } from "lucide-react"
import { useForm } from "react-hook-form"
import Balancer from "react-wrap-balancer"
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
  defaultValues: { highlightIds: string[] }
  highlights: Highlight[]
}
const FormSchema = z.object({
  highlightIds: z
    .array(z.string())
    .min(1, { message: "Please select at least one" }),
})
export const HighlightForm: React.FC<Props> = ({
  id,
  defaultValues,
  highlights,
}) => {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const { step } = useSpaceCreationStep()
  const utils = trpc.useContext()
  const { toast } = useToast()
  const { mutateAsync } = trpc.space.update.useMutation({
    onSuccess(data, variables, context) {
      utils.space.draft.invalidate({ id })
      router.push("." + step.nextPath)
    },
    onError(error) {
      console.log("error::: ", error)
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
            highlights: {
              set: data.highlightIds?.length
                ? data.highlightIds.map((x) => ({ id: x }))
                : [],
            },
          },
        }),
        500
      )
    })
  }
  const IconRenderer: React.FC<{ iconName: string }> = ({ iconName }) => {
    const iconMapping: { [key: string]: React.ComponentType<any> } = {
      Trees: Trees,
      Building: Building,
      Pin: Pin,
      Home: Home,
      Citrus: Citrus,
    }

    const IconComponent = iconMapping[iconName]

    if (!IconComponent) {
      return <Circle />
    }

    return <IconComponent />
  }
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="gutter z-10 flex h-screen flex-col justify-between"
    >
      <div className="flex h-full grow flex-col items-start justify-center gap-2">
        <Title style={{ marginBottom: 0 }} showAs={2} className="font-semibold">
          <Balancer>{"Next, let's describe your space"}</Balancer>
        </Title>
        <Paragraph className="mt-2 text-muted-foreground">
          <Balancer>
            {
              "Choose up to 2 highlights. We'll use these to get your description started."
            }
          </Balancer>
        </Paragraph>
        <div className="mt-8 flex flex-wrap gap-3">
          {highlights.map(({ id: highlightId, label, icon }, i) => (
            <motion.label
              key={highlightId}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: Number(`0.${i + 1}`),
                duration: 0.95,
                ease: [0.165, 0.84, 0.44, 1],
              }}
              id={highlightId}
            >
              <input
                {...form.register("highlightIds")}
                value={highlightId}
                type="checkbox"
                className="peer hidden"
                id={highlightId}
              />
              <li className="flex cursor-pointer gap-3 rounded-full border bg-background px-4 py-3 transition-all hover:border-zinc-600 hover:shadow peer-checked:border-blue-600 peer-checked:text-blue-600">
                <IconRenderer iconName={icon} />
                <Paragraph size={"sm"}>{label}</Paragraph>
              </li>
            </motion.label>
          ))}
        </div>
      </div>

      <SpaceCreateFooter pending={pending} />
    </form>
  )
}
