import { db } from "@/lib/db"
import { serverClient } from "@/lib/trpc/server"

import { FeatureForm } from "./_feature-form"

type Props = {
  params: { id: string }
}

const FeaturePage: React.FC<Props> = async ({ params: { id } }) => {
  const [space, amenities, offerings] = await Promise.all([
    await serverClient.space.draft({ id }),
    await db.amenity.findMany(),
    await db.offering.findMany(),
  ])
  return (
    <FeatureForm
      id={id}
      amenities={amenities}
      offerings={offerings}
      defaultValues={{
        offeringIds: space?.offerings.map((x) => x.id) ?? [],
        amenityIds: space?.amenities.map((x) => x.id) ?? [],
      }}
    />
  )
}
export default FeaturePage
