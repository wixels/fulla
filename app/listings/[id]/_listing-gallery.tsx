import Image from "next/image"

type Props = {}
export const ListingGallery: React.FC<Props> = ({}) => {
  return (
    <div className="section-top relative order-1 flex aspect-video grow flex-col flex-wrap gap-6 lg:order-2 lg:aspect-auto">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted-foreground">
        <Image
          fill
          className="object-cover"
          alt="house primary image"
          src={
            "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80"
          }
        />
      </div>
      <div className="hidden w-full gap-6 lg:flex">
        <div className="relative aspect-video w-1/2 overflow-hidden rounded-lg bg-muted-foreground">
          <Image
            fill
            className="object-cover"
            alt="house primary image"
            src={
              "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
            }
          />
        </div>
        <div className="relative aspect-video w-1/2 overflow-hidden rounded-lg bg-muted-foreground">
          <Image
            fill
            className="object-cover"
            alt="house primary image"
            src={
              "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80"
            }
          />
        </div>
      </div>
      <div className="hidden w-full gap-6 lg:flex">
        <div className="relative aspect-video w-3/4 grow overflow-hidden rounded-lg bg-muted-foreground">
          <Image
            fill
            className="object-cover"
            alt="house primary image"
            src={
              "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
            }
          />
        </div>
        <div className="relative aspect-square w-1/4 overflow-hidden rounded-lg bg-muted-foreground">
          <Image
            fill
            className="object-cover"
            alt="house primary image"
            src={
              "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80"
            }
          />
        </div>
      </div>
    </div>
  )
}
