import Image from "next/image"
import { Image as ImageType } from "@prisma/client"

type Props = { images: ImageType[] }
export const ListingGallery: React.FC<Props> = ({ images }) => {
  console.log("images::: ", images)
  return (
    <div className="section-top hidden aspect-video grow flex-col flex-wrap gap-6 lg:flex lg:aspect-auto">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted-foreground">
        <Image
          fill
          className="object-cover"
          alt="house primary image"
          src={images?.[0]?.fileUrl}
        />
      </div>
      <div className="w-full gap-6 lg:flex">
        <div className="relative aspect-video w-1/2 overflow-hidden rounded-lg bg-muted-foreground">
          <Image
            fill
            className="object-cover"
            alt="house primary image"
            src={images?.[1]?.fileUrl}
          />
        </div>
        <div className="relative aspect-video w-1/2 overflow-hidden rounded-lg bg-muted-foreground">
          <Image
            fill
            className="object-cover"
            alt="house primary image"
            src={images?.[2]?.fileUrl}
          />
        </div>
      </div>
      <div className="w-full gap-6 lg:flex">
        <div className="relative aspect-video w-3/4 grow overflow-hidden rounded-lg bg-muted-foreground">
          <Image
            fill
            className="object-cover"
            alt="house primary image"
            src={images?.[3]?.fileUrl}
          />
        </div>
        <div className="relative aspect-square w-1/4 overflow-hidden rounded-lg bg-muted-foreground">
          <Image
            fill
            className="object-cover"
            alt="house primary image"
            src={images?.[4]?.fileUrl}
          />
        </div>
      </div>
    </div>
  )
}
