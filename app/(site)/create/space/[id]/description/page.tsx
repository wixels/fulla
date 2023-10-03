import { Prisma } from "@prisma/client"

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
      space={
        space as Prisma.SpaceGetPayload<{
          include: {
            highlights: true
            amenities: true
            offerings: true
            type: true
            category: true
            images: true
          }
        }>
      }
      defaultValues={{ description: space?.description ?? "" }}
    />
  )
}
export default DescriptionPage
