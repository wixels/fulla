import { serverClient } from "@/lib/trpc/server"

type Props = {
  params: { id: string }
}
const SinglePropertyPage: React.FC<Props> = async ({ params: { id } }) => {
  const property = await serverClient.org.property({ id })
  return <div>{JSON.stringify(property, null, 3)}</div>
}

export default SinglePropertyPage
