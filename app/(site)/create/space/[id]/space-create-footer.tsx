"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"

import { useSpaceCreationStep } from "@/hooks/use-space-creation-step"
import { Button } from "@/components/ui/button"

type Props = {
  pending: boolean
  className?: string
}
export const SpaceCreateFooter: React.FC<Props> = ({ pending, className }) => {
  const { step } = useSpaceCreationStep()
  return (
    <footer className="flex items-center justify-end py-8">
      <div className="flex items-center gap-2">
        {step.previousPath ? (
          <Button asChild variant={"outline"} rounded={"full"}>
            <Link href={"." + step.previousPath}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
        ) : null}

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
  )
}
