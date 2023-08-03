"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { amenities, offerings } from "@/prisma/data"
import { zodResolver } from "@hookform/resolvers/zod"
import { Amenity, Highlight, Offering } from "@prisma/client"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { forceDelay } from "@/lib/forceDelay"
import { useSpaceCreationStep } from "@/hooks/use-space-creation-step"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { Icons } from "@/components/icons"

import { updateSpaceWithParsedData } from "../../actions"
import { SpaceCreateFooter } from "../space-create-footer"

type Props = {
  id: string
  defaultValues: { amenityIds: string[]; offeringIds: string[] }
  amenities: Amenity[]
  offerings: Offering[]
}
const FormSchema = z.object({
  amenityIds: z
    .array(z.string())
    .min(1, { message: "Please select at least one" }),
  offeringIds: z
    .array(z.string())
    .min(1, { message: "Please select at least one" }),
})
export const FeatureForm: React.FC<Props> = ({
  id,
  defaultValues,
  offerings,
  amenities,
}) => {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const { step } = useSpaceCreationStep()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  })
  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const update = await forceDelay(
        updateSpaceWithParsedData({
          data: {
            amenities: {
              connect: data.amenityIds?.length
                ? data.amenityIds.map((x) => ({ id: x }))
                : null,
            },
            offerings: {
              connect: data.offeringIds
                ? data.offeringIds.map((x) => ({ id: x }))
                : null,
            },
          },
          id,
        }),
        500
      )
      console.log("update", update)
    })

    // router.push("." + step.nextPath)
  }
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="gutter z-10 flex h-screen flex-col justify-between"
    >
      <div className="flex h-full grow flex-col items-start justify-center gap-2">
        <Title showAs={5} className="font-medium">
          What does your space have to offer?
        </Title>
        <div className="mb-12 flex w-3/4 flex-wrap  gap-3 lg:w-2/4">
          {offerings.map(({ id: offeringId, label }, i) => (
            <motion.label
              key={offeringId}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: Number(`0.${i + 1}`),
                duration: 0.95,
                ease: [0.165, 0.84, 0.44, 1],
              }}
              id={offeringId}
            >
              <input
                {...form.register("offeringIds")}
                value={offeringId}
                type="checkbox"
                className="peer hidden"
                id={offeringId}
              />
              <li className="flex cursor-pointer gap-3 rounded-full border bg-background/75 px-4 py-3 backdrop-blur transition-all hover:border-zinc-600 hover:shadow peer-checked:border-blue-600 peer-checked:text-blue-600">
                <p>{label}</p>
              </li>
            </motion.label>
          ))}
        </div>
        <Title showAs={5} className="font-medium">
          What amenities does your space have?
        </Title>
        <div className="flex w-3/4 flex-wrap gap-3  lg:w-2/4">
          {amenities.map(({ id: amenityId, label }, i) => (
            <motion.label
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: Number(`0.${i + 1}`),
                duration: 0.95,
                ease: [0.165, 0.84, 0.44, 1],
              }}
              id={amenityId}
              key={amenityId}
            >
              <input
                {...form.register("amenityIds")}
                value={amenityId}
                type="checkbox"
                className="peer hidden"
                id={amenityId}
              />
              <li className="flex cursor-pointer gap-3 rounded-full border bg-background/75 px-4 py-3 backdrop-blur transition-all hover:border-zinc-600 hover:shadow peer-checked:border-blue-600 peer-checked:text-blue-600">
                <p>{label}</p>
              </li>
            </motion.label>
          ))}
        </div>
      </div>
      <SpaceCreateFooter pending={pending} />
    </form>
  )
}
