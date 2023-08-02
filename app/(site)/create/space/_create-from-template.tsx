"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import { Paragraph } from "@/components/ui/paragraph"
import { Separator } from "@/components/ui/separator"

type Props = {}
const templates: { id: string; label: string; description: string }[] = []

export const CreateFromTemplate: React.FC<Props> = () => {
  return (
    <>
      {templates.length > 0 ? (
        templates?.map((type, i) => (
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
        ))
      ) : (
        <>
          <Separator />
          <Paragraph size={"sm"}>
            You don&apos;t have any templates yet.{" "}
            <Link className="text-blue-500 underline" href={"#"}>
              Create Template
            </Link>
          </Paragraph>
        </>
      )}
    </>
  )
}
