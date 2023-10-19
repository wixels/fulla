import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { LoaderButton } from "@/components/loader-button"

type Props = {}
export const NewPageButton: React.FC<Props> = ({}) => {
  return (
    <LoaderButton
      pending={false}
      size="xs"
      variant="secondary"
      className="w-fit"
      icon="Plus"
    >
      New Page
    </LoaderButton>
  )
}
