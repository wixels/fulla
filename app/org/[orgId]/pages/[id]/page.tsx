import { Suspense } from "react"
import { Image } from "lucide-react"

import { serverClient } from "@/lib/trpc/server"
import { Button } from "@/components/ui/button"
import { Await } from "@/components/await"
import { Editor } from "@/components/editor"
import { Room } from "@/components/liveblocks/room"

import { CollaborativeEditor } from "./_live-editor"
import { PageContainer } from "./_title"

export const dynamic = "force-dynamic"

type Props = {
  params: {
    id: string
    orgId: string
  }
}
const Page: React.FC<Props> = async ({ params: { id, orgId } }) => {
  const page = await serverClient.page.single({
    id,
  })
  console.log("page::: ", page)
  return (
    <PageContainer orgId={orgId} initial={page}>
      <Editor />
      {/* <Room roomId={id}>
        <CollaborativeEditor />
      </Room> */}
    </PageContainer>
  )
}
export default Page
