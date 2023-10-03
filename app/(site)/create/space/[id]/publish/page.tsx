import { redirect } from "next/navigation"
import { Prisma } from "@prisma/client"
import { Calendar, Check, Pencil } from "lucide-react"

import { serverClient } from "@/lib/trpc/server"
import { Button } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { PublishedSpaceCard } from "@/components/space-cards/published-space-card"

type Props = { params: { id: string } }
const PublishPage: React.FC<Props> = async ({ params: { id } }) => {
  const space = await serverClient.space.draft({ id })

  async function publish() {
    "use server"
    await serverClient.space.update({ id, data: { status: "published" } })
    redirect("/browse")
  }
  return (
    <div className="gutter z-10 flex h-screen flex-col items-center justify-between">
      <div className="flex h-full grow flex-col items-start justify-center">
        <Title style={{ marginBottom: 0 }} showAs={2} className="font-semibold">
          Publish your space!
        </Title>
        <Paragraph className="mt-2 text-muted-foreground">
          {
            "Here's what we'll show to potential tenants. Make sure everything looks good."
          }
        </Paragraph>
        <div className="mb-8 mt-12 grid grid-cols-1 gap-16 lg:grid-cols-2">
          <PublishedSpaceCard
            space={
              space as Prisma.SpaceGetPayload<{
                include: {
                  organization: {
                    include: {
                      logo: true
                    }
                  }
                  type: true
                  category: true
                  offerings: true
                  highlights: true
                  amenities: true
                  images: true
                }
              }>
            }
          />
          <div className="col-span-1">
            <Title className="font-semibold" style={{ marginTop: 0 }} level={4}>
              {"What's next?"}
            </Title>
            <ul className="flex flex-col gap-12">
              <li className="flex items-start gap-4">
                <Check size={36} />
                <div>
                  <Paragraph>Confirm a few details and publish</Paragraph>
                  <Paragraph size={"sm"} className="text-muted-foreground">
                    {
                      "We'll let you know if you need to verify your identity or register with the local government"
                    }
                  </Paragraph>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Calendar size={36} />
                <div>
                  <Paragraph>Setup your calendar</Paragraph>
                  <Paragraph size={"sm"} className="text-muted-foreground">
                    {
                      "Choose when your listing will be available. It will be visible immediately after you publish"
                    }
                  </Paragraph>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Pencil size={36} />
                <div>
                  <Paragraph>Finalize your settings</Paragraph>
                  <Paragraph size={"sm"} className="text-muted-foreground">
                    {
                      "Set maintainence rules, deposit amount, communication preferences, and more."
                    }
                  </Paragraph>
                </div>
              </li>
              <form action={publish}>
                <Button className="w-full">Publish your Space</Button>
              </form>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PublishPage
