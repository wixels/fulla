import { db } from "@/lib/db"

type Props = {
  params: { id: string }
}
const ImagePage: React.FC<Props> = async ({ params: { id } }) => {
  const space = await db.space.findFirst({
    where: {
      id,
      status: "draft",
    },
    select: {
      images: true,
    },
  })
  console.log("space::: ", space)
  return <div>ImagePage</div>
}
export default ImagePage
