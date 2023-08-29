import { db } from "@/lib/db"

import { FeatureForm } from "./_feature-form"

type Props = {
  params: { id: string }
}
const FeaturePage: React.FC<Props> = async ({ params: { id } }) => {
  const [space, amenities, offerings] = await Promise.all([
    await db.space.findFirst({
      where: {
        id,
        status: "draft",
      },
      include: {
        offerings: true,
        amenities: true,
      },
    }),
    await db.amenity.findMany(),
    await db.offering.findMany(),
    // (async () => {
    //   const update = db.space.update({
    //     where: {
    //       id,
    //     },
    //     data: {
    //       offerings: {
    //         connect: [{ id: "cljstcwch000olsxx163jg9zc" }],
    //       },
    //       amenities: {
    //         connect: [{ id: "cljstctl1000blsxxxe95ll88" }],
    //       },
    //     },
    //   })
    // })(),
  ])
  console.log("space", space)
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
