import { db } from "@/lib/db"
import { serverClient } from "@/lib/trpc/server"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"

import { HighlightForm } from "./_hightlight-form"

type Props = {
  params: { id: string }
}
const HighlightPage: React.FC<Props> = async ({ params: { id } }) => {
  const [space, highlights] = await Promise.all([
    await serverClient.space.draft({ id }),
    await db.highlight.findMany(),
  ])
  return (
    <HighlightForm
      id={id}
      defaultValues={{
        highlightIds: space?.highlights.map((h) => h.id) ?? [],
      }}
      highlights={highlights}
    />
  )
}
export default HighlightPage
