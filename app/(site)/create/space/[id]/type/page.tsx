import { db } from "@/lib/db"

import { TypeForm } from "./_type-form"

type Props = {
  params: { id: string }
}
const TypePage: React.FC<Props> = async ({ params: { id } }) => {
  const [space, types] = await Promise.all([
    await db.space.findFirst({
      where: {
        id,
        status: "draft",
      },
      select: {
        type: true,
      },
    }),
    await db.type.findMany(),
  ])

  return (
    <TypeForm
      id={id}
      defaultValues={{ typeId: space?.type?.id ?? types[0].id }}
      types={types}
    />
  )
}

export default TypePage
