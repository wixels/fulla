import { db } from "@/lib/db"
import { serverClient } from "@/lib/trpc/server"

import { CategoryForm } from "./_category-form"

type Props = {
  params: { id: string }
}
const CategoryPage: React.FC<Props> = async ({ params: { id } }) => {
  const [space, categories] = await Promise.all([
    await serverClient.space.draft({ id }),
    await db.category.findMany(),
  ])

  return (
    <CategoryForm
      id={id}
      defaultValues={{ categoryId: space?.category?.id ?? categories[0].id }}
      categories={categories}
    />
  )
}

export default CategoryPage
