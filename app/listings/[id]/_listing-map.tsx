import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Title } from "@/components/ui/title"

type Props = {}
export const ListingMap: React.FC<Props> = ({}) => {
  const grad =
    "bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
  return (
    <div className="section-top w-full">
      <Title level={3}>{"Where you'll be"}</Title>
      <Separator />
      <div
        className={cn([grad, "mt-8 aspect-video w-full rounded-lg opacity-30"])}
      />
    </div>
  )
}
