"use client"

import React, { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Trees } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Highlight, Listing } from "@/types/payload-types"
import { compareObjects } from "@/lib/compareObjects"
import { Paragraph } from "@/components/ui/paragraph"

type Props = {
  listing: Listing & { highlights: Highlight[] }
  update: (payload: { highlight: Highlight["id"][] }) => Promise<void>
  highlights: Highlight[]
}

const formSchema = z.object({
  highlights: z.array(z.string()),
})

export const HighlightForm: React.FC<Props> = ({
  listing,
  update,
  highlights,
}) => {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      highlights: listing.highlights?.map((x) => x?.id) || null,
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (compareObjects({ highlights: listing.highlights }, data)) {
      router.push(`/listings/${listing.id}/description`)
    } else {
      startTransition(async () => await update(data))
    }
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <ul className="mt-8 flex flex-wrap gap-3">
        <li className="flex cursor-pointer gap-3 rounded-full border bg-background px-4 py-3 transition-all hover:border-zinc-600 hover:shadow">
          <Trees /> <Paragraph className="font-semibold">Peaceful</Paragraph>
        </li>
      </ul>
    </form>
  )
}
