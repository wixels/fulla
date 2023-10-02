import { db } from "@/lib/db"
import { serverClient } from "@/lib/trpc/server"

type Props = {
  params: { id: string }
}
const ImagePage: React.FC<Props> = async ({ params: { id } }) => {
  const space = await serverClient.space.draft({ id })
  console.log("space::: ", space)
  return <div>ImagePage</div>
}
export default ImagePage
