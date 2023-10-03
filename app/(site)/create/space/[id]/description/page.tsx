import { serverClient } from "@/lib/trpc/server"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"

import { DescriptionForm } from "./_description-form"

type Props = {
  params: { id: string }
}
const DescriptionPage: React.FC<Props> = async ({ params: { id } }) => {
  const space = await serverClient.space.draft({ id })
  return (
    <DescriptionForm
      id={id}
      defaultValues={{ description: space?.description ?? "" }}
    />
  )
}
export default DescriptionPage
