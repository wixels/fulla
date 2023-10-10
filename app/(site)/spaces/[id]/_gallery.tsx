import Image from "next/image"
import { Image as ImageType } from "@prisma/client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Title } from "@/components/ui/title"
import { Grid } from "@/components/grid"

type Props = { images: ImageType[] }
export const Gallery: React.FC<Props> = ({ images }) => {
  return (
    <section className="gutter section mx-auto flex max-w-screen-xl flex-col gap-6">
      <div className="flex items-center gap-6">
        <Title level={2} showAs={3} style={{ margin: 0 }}>
          Gallery
        </Title>
        <div className="h-[1px] grow bg-border"></div>
        <Button size={"xs"} rounded={"full"} variant={"outline"}>
          Show All ({images.length})
        </Button>
      </div>
      <Grid gap={"xs"} className="w-full">
        <div className="relative col-span-7 h-full rounded-xl">
          <Image
            fill
            className="object-cover"
            src={images[0].fileUrl}
            alt={images[0].fileUrl + "image"}
          />
        </div>
        <div className="col-span-5 flex h-full flex-col gap-1 md:gap-2 lg:gap-4 xl:gap-6">
          <div className="relative aspect-video w-full rounded-xl">
            <Image
              className="object-cover"
              src={images[1].fileUrl}
              alt={images[1].fileKey + "image"}
              fill
            />
          </div>
          <div className="relative aspect-video w-full rounded-xl">
            <Image
              fill
              className="object-cover"
              src={images[2].fileUrl}
              alt={images[2].fileKey + "image"}
            />
          </div>
        </div>
      </Grid>
    </section>
  )
}
