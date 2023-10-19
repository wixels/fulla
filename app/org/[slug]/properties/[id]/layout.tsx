import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  BellOff,
  Bookmark,
  ChevronLeft,
  MoreHorizontal,
  Plus,
  User,
} from "lucide-react"
import Balancer from "react-wrap-balancer"

import { db } from "@/lib/db"
import { serverClient } from "@/lib/trpc/server"
import { cn } from "@/lib/utils"
import { badgeVariants } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Title } from "@/components/ui/title"
import { Await } from "@/components/await"
// import { FancyBox } from "@/components/fancy-box"
import { Grid } from "@/components/grid"

import { NewPageButton } from "./_new-page-button"
import { Tabs } from "./_tabs"

type Props = {
  params: { id: string; slug: string }
  children: React.ReactNode
  modal: React.ReactNode
}
const PropertyPage: React.FC<Props> = async ({
  params: { slug, id },
  children,
  modal,
}) => {
  return (
    <Grid className="gutter section-top">
      <div className="col-span-3 flex flex-col">
        <Link
          className={cn(
            buttonVariants({
              variant: "link",
              size: "sm",
              rounded: "full",
              className: "pl-0",
            }),
            "mb-6 w-fit"
          )}
          href={"../"}
        >
          <ChevronLeft size={10} className="mr-2 h-6 w-6" /> Back to Properties
        </Link>
        <Suspense fallback="Fetching team...">
          <Await promise={serverClient.org.property({ id })}>
            {(property) => (
              <>
                <div className="relative flex aspect-square w-full max-w-[100px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-tl from-cyan-400 to-red-300">
                  {property?.logo?.fileUrl ? (
                    <Image
                      src={property?.logo?.fileUrl}
                      fill
                      className="object-cover"
                      alt="property alt text"
                    />
                  ) : (
                    <p className="text-4xl text-white">{property?.name?.[0]}</p>
                  )}
                </div>
                <Title showAs={3}>
                  <Balancer>{property?.name}</Balancer>
                </Title>
                <div className="flex flex-col gap-4">
                  <Link
                    href={"./manage"}
                    className={buttonVariants({
                      size: "xs",
                      variant: "secondary",
                      className: "w-fit",
                    })}
                  >
                    <User className="mr-2 h-3 w-3" />1 Member
                  </Link>
                  <Input
                    defaultValue={property?.description ?? ""}
                    placeholder="Enter a description"
                    sizing={"sm"}
                    variant={"ghost"}
                  />
                </div>
              </>
            )}
          </Await>
        </Suspense>
        <div className="mt-6 flex flex-col gap-4">
          <NewPageButton />
        </div>
      </div>

      <div className="col-span-9">
        <div className="flex items-center justify-between">
          <Tabs id={id} />
          <div className="flex items-center gap-1">
            <Button variant={"ghost"} size={"icon"}>
              <Bookmark className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button variant={"ghost"} size={"icon"}>
              <BellOff className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button variant={"ghost"} size={"icon"}>
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
        <Separator className="my-6" />
        {modal}
        {children}
      </div>
    </Grid>
  )
}
export default PropertyPage
