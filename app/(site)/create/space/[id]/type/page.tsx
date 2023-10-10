import { db } from "@/lib/db"
import { serverClient } from "@/lib/trpc/server"

import { TypeForm } from "./_type-form"

type Props = {
  params: { id: string }
}
const TypePage: React.FC<Props> = async ({ params: { id } }) => {
  const [space, types] = await Promise.all([
    await serverClient.space.draft({ id }),
    await db.type.findMany(),
  ])

  // console.log("types::: ", types)
  return (
    <TypeForm
      id={id}
      defaultValues={{ typeId: space?.type?.id ?? types[0].id }}
      types={types}
    />
  )
}

export default TypePage
