import { db } from "@/lib/db"
import { serverClient } from "@/lib/trpc/server"

import { TitleForm } from "./_title-form"

type Props = {
  params: { id: string }
}

const TitlePage: React.FC<Props> = async ({ params: { id } }) => {
  const space = await serverClient.space.draft({ id })

  return <TitleForm id={id} defaultValues={{ title: space?.title ?? "" }} />
}

export default TitlePage
