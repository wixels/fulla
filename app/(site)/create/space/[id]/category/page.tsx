import { db } from "@/lib/db"

import { CategoryForm } from "./_category-form"

type Props = {
  params: { id: string }
}
const CategoryPage: React.FC<Props> = async ({ params: { id } }) => {
  const [space, categories] = await Promise.all([
    await db.space.findFirst({
      where: {
        id,
        status: "draft",
      },
      select: {
        category: true,
      },
    }),
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
