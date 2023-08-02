import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

import { spaceCreationSteps } from "@/lib/space-creation-steps"

export const useSpaceCreationStep = () => {
  const [index, setIndex] = useState(0)
  const path = usePathname()

  useEffect(() => {
    const splitPath = path?.split("/")
    const stepString = splitPath?.[splitPath?.length - 1]
    const indexOfStepInArray = spaceCreationSteps.findIndex(
      (x) => x.path.toLocaleLowerCase() === "/" + stepString.toLocaleLowerCase()
    )
    setIndex(indexOfStepInArray)
  }, [path])
  return {
    index,
    step: spaceCreationSteps[index],
  }
}
