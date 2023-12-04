import { Paragraph } from "@/components/ui/paragraph"
import { Separator } from "@/components/ui/separator"
import { Title } from "@/components/ui/title"
import { Grid } from "@/components/grid"

import { Nav } from "./_nav"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="gutter section">
      <Title
        showAs={3}
        className="font-semibold"
        style={{ marginBottom: "1rem" }}
      >
        Profile
      </Title>
      <Paragraph className="text-muted-foreground">
        Manage your profile and preferences here.
      </Paragraph>
      <Separator className="my-4" />
      <Grid>
        <Nav />
        <div className="col-span-10">{children}</div>
      </Grid>
    </div>
  )
}
