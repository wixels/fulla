import { serverClient } from "@/lib/trpc/server"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"

import { ImageForm } from "./_iamge-form"

type Props = {
  params: { id: string }
}
const ImagePage: React.FC<Props> = async ({ params: { id } }) => {
  const space = await serverClient.space.draft({ id })
  console.log("space::: ", space)
  return (
    <section className="mx-auto mt-28 flex w-full max-w-xl flex-col gap-8 pb-32">
      <Title style={{ marginBottom: 0 }} showAs={2} className="font-semibold">
        Add some photos of your space
      </Title>
      <Paragraph className="text-muted-foreground">
        {
          "You'll need 5 photos to get started. You can add more or make changes later."
        }
      </Paragraph>
      <ImageForm images={space?.images ?? []} id={id} />
    </section>
  )
}
export default ImagePage
