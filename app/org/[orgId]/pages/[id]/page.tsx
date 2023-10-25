import { Suspense } from "react"
import { Image } from "lucide-react"

import { serverClient } from "@/lib/trpc/server"
import { Button } from "@/components/ui/button"
import { Await } from "@/components/await"
import { Room } from "@/components/liveblocks/room"

import Cover from "./_cover"
import Emjoi from "./_emoji"
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
  return (
    <Suspense fallback="Fetching page content...">
      <Await
        promise={serverClient.page.single({
          id,
        })}
      >
        {(page) => (
          <PageContainer orgId={orgId} initial={page}>
            <Room roomId={page.id}>
              <CollaborativeEditor />
            </Room>
          </PageContainer>
        )}
      </Await>
    </Suspense>
  )
}
export default Page
