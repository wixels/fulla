import { Button } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"

export default async function Profile() {
  return (
    <div className="">
      <div className="sticky top-[3.6rem] flex items-center justify-between bg-background/70 px-6 py-7 backdrop-blur">
        <div>
          <Title
            showAs={5}
            level={2}
            className="font-semibold"
            style={{ marginTop: 0, marginBottom: "0.5rem" }}
          >
            Your Details
          </Title>
          <Paragraph className="text-muted-foreground">
            Manage your profile and preferences here.
          </Paragraph>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button size="sm">Save</Button>
        </div>
      </div>
      <ul>
        {Array(100)
          .fill(null)
          .map((x, i) => (
            <li key={i} className="rounded-xl bg-accent/50 p-4">
              {i + 1}
            </li>
          ))}
      </ul>
    </div>
  )
}
