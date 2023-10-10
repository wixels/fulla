import { serverClient } from "@/lib/trpc/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import OverviewForm from "./_overview-form"

type Props = { params: { id: string } }

const OverviewPage: React.FC<Props> = async ({ params: { id } }) => {
  const property = await serverClient.org.property({ id })
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent>
          <OverviewForm
            id={id}
            defaultValues={{
              address: property?.address ?? "",
              type: property?.type ?? "",
              size: property?.size ?? "",
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
export default OverviewPage
