import { Table } from "lucide-react"

import { getCurrentUser } from "@/lib/session"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { Grid } from "@/components/grid"
import { Section } from "@/components/section"

type Props = {}

const OrgPage: React.FC<Props> = async ({}) => {
  const user = await getCurrentUser()
  return (
    <div className="gutter section-padding-top mx-auto w-full  max-w-[1400px]">
      <header className="mx-auto flex w-full flex-col items-center justify-between border-b border-border pb-6  md:pb-8 lg:flex-row lg:pb-10 xl:pb-12">
        <div className="flex w-full flex-col lg:w-fit">
          <Title style={{ margin: 0 }} showAs={5}>
            Hello, {user?.name?.split(" ")?.[0]}
          </Title>
          <Paragraph className="text-muted-foreground/50" size={"sm"}>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </Paragraph>
        </div>
        <div className="mt-3 flex w-full items-center gap-3 lg:mt-0 lg:w-fit">
          <Input
            className="grow"
            rounded={"full"}
            placeholder="Search Fulla..."
          />
          <Button rounded={"full"}>
            <Table className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="pb-7 lg:pb-14 xl:pb-28 bg-pink-500">Manual</div>
      <Section side="b" spacer="p" className="bg-green-200">
        Testing out section
      </Section>

      <Grid gap={"lg"} className=" bg-red-200">
        <div className="col-span-4">LEFT</div>
        <div className="col-span-8">RIGHT</div>
      </Grid>
    </div>
  )
}
export default OrgPage
