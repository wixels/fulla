import Image from "next/image"
import { Home, MapPin, Table } from "lucide-react"

import { serverClient } from "@/lib/trpc/server"

import { PlaiceholderImage } from "../plaiceholder-image"
import { Paragraph } from "../ui/paragraph"
import { titleVariants } from "../ui/title"

type Props = {
  space: Awaited<ReturnType<typeof serverClient.space.published>>
}
export const ReadOnlySpaceCard: React.FC<Props> = ({ space }) => {
  return (
    <div className="group col-span-12 flex w-full flex-col gap-3 md:col-span-6 xl:col-span-4">
      <div className="relative aspect-[16/11] w-full overflow-hidden rounded-lg">
        <PlaiceholderImage
          hasParent
          src={space?.featureImageUrl ?? ""}
          alt={"cover image for " + space?.title}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative h-4 w-4 overflow-hidden rounded-full bg-gradient-to-tl from-red-500 to-green-300">
            <Image
              src={space?.organization.logo?.fileUrl ?? ""}
              fill
              className="object-cover"
              alt={"logo for " + space?.organization.name}
            />
          </div>
          <Paragraph className="line-clamp-1 font-mono font-semibold group-hover:underline">
            {space?.title}
          </Paragraph>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground/50">
          <MapPin size={12} />
          <Paragraph size="xs">{space?.suburb}</Paragraph>
        </div>
      </div>
      <p style={{ margin: 0 }} className={titleVariants({ level: 5 })}>
        R{new Intl.NumberFormat().format(space?.price ?? 0)}
        <span className="text-xs text-muted-foreground/50"> / month</span>
      </p>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-muted-foreground/50">
          <Table size={12} />
          <Paragraph size="xs">
            {space?.desks} Desk{space?.desks === 1 ? "" : "s"}
          </Paragraph>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground/50">
          <Home size={12} />
          <Paragraph size="xs">
            {space?.rooms} Room{space?.rooms === 1 ? "" : "s"}
          </Paragraph>
        </div>
      </div>
    </div>
  )
}
