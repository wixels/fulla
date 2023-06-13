import { useId } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"

type Props = {
  id: string
}
const types = [
  {
    id: "priority",
    label: "Priority Application",
    description:
      "Get ahead of the competition with our Priority Application. Enjoy faster processing and increased visibility for your rental application. Upgrade now to boost your chances of securing your dream house!",
  },
  {
    id: "standard",
    label: "Standard Application",
    description:
      "Simplify your rental application process with our Standard Application. Submit your information effortlessly and let us take care of the rest. Streamline your journey to finding your perfect home. Start your Standard Application today!",
  },
]

const formSchema = z.object({
  type: z.string(),
})

export const TypeForm: React.FC<Props> = ({ id }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit({ type }: z.infer<typeof formSchema>) {
    // if (typeId) {
    //   if (listing.type && typeId === listing.type.id) {
    //     router.push(`/listings/create/${listing.id}/address`)
    //   } else {
    //     startTransition(async () => await update(typeId))
    //   }
    // } else {
    //   toast({
    //     title: "Validation Error",
    //     variant: "destructive",
    //     description: "Please select a type",
    //   })
    // }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mt-12 flex flex-col gap-3"
    >
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
            {...form.register("type")}
          />
          <div className="flex cursor-pointer gap-2 rounded-lg border bg-background p-6 transition-all hover:border-zinc-600 hover:shadow peer-checked:border-blue-600 peer-checked:text-blue-600">
            <div className="grow">
              <Paragraph>{type.label}</Paragraph>
              <Paragraph className="text-muted-foreground" size={"sm"}>
                {type.description}
              </Paragraph>
            </div>
          </div>
        </motion.label>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: Number(`0.4}`),
          duration: 0.95,
          ease: [0.165, 0.84, 0.44, 1],
        }}
        className="flex w-full items-center justify-end gap-3"
      >
        <Link href={"/"}>
          <Button variant={"outline"}>Back to home</Button>
        </Link>
        <Link href={`/listings/${id}/application`}>
          <Button>Continue</Button>
        </Link>
      </motion.div>
    </form>
  )
}
