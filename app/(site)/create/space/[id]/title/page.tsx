import { db } from "@/lib/db"

import { TitleForm } from "./_title-form"

type Props = {
  params: { id: string }
}

const TitlePage: React.FC<Props> = async ({ params: { id } }) => {
  const space = await db.space.findFirst({
    where: {
      id,
      status: "draft",
    },
    select: {
      title: true,
    },
  })

  return <TitleForm id={id} defaultValues={{ title: space?.title ?? "" }} />
}

export default TitlePage
