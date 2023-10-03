import { Space } from "@prisma/client"

import { serverClient } from "@/lib/trpc/server"
import { Title } from "@/components/ui/title"

import { BasicsForm } from "./_basics-form"

type Props = { params: { id: string } }
export type BasicsType = Pick<Space, "bathrooms" | "rooms" | "desks">
const BasicsPage: React.FC<Props> = async ({ params: { id } }) => {
  const space = await serverClient.space.draft({ id })
  return (
    <section className="gutter mt-36 flex h-screen flex-col">
      <div className="rounded-xl bg-background px-8 shadow-xl">
        <Title showAs={2} className="font-semibold">
          Share some basics about your place
        </Title>
        <BasicsForm
          defaultValues={{
            desks: space?.desks ?? 0,
            rooms: space?.rooms ?? 0,
            bathrooms: space?.bathrooms ?? 0,
          }}
          id={id}
        />
      </div>
    </section>
  )
}
export default BasicsPage
