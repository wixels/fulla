import { db } from "@/lib/db"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"

import { AddressForm } from "./_address-form"

type Props = {
  params: { id: string }
}
const AddressPage: React.FC<Props> = async ({ params: { id } }) => {
  const space = await db.space.findFirst({
    where: {
      id,
      status: "draft",
    },
    select: {
      city: true,
      postalCode: true,
      province: true,
      street: true,
      suburb: true,
      unitNumber: true,
    },
  })

  return (
    <div className="gutter mt-36 flex h-screen flex-col">
      <div className="rounded-xl bg-background px-8 pb-8 shadow-xl">
        <Title showAs={2} className="font-semibold">
          Confirm your address
        </Title>
        <Paragraph className="text-muted-foreground">
          Your address is only shared with guests after they’ve made a
          reservation.
        </Paragraph>
        <AddressForm
          id={id}
          defaultValues={{
            city: space?.city ?? "",
            postalCode: space?.postalCode ?? "",
            province: space?.province ?? "",
            street: space?.street ?? "",
            suburb: space?.suburb ?? "",
            unitNumber: space?.unitNumber ?? "",
          }}
        />
      </div>
    </div>
  )
}

export default AddressPage
