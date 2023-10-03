import { serverClient } from "@/lib/trpc/server"

import { PriceForm } from "./_price-form"

type Props = { params: { id: string } }
const PricePage: React.FC<Props> = async ({ params: { id } }) => {
  const space = await serverClient.space.draft({ id })
  return <PriceForm id={id} defaultValues={{ price: space?.price ?? 0 }} />
}
export default PricePage
