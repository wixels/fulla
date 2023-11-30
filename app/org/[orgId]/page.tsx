import { Table } from "lucide-react"
import Balancer from "react-wrap-balancer"

import { getCurrentUser } from "@/lib/session"
import { serverClient } from "@/lib/trpc/server"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { Grid, gridVariants } from "@/components/grid"
import { Section, sectionVariants } from "@/components/section"

type Props = {
  params: {
    orgId: string
  }
}

const OrgPage: React.FC<Props> = async ({ params: { orgId } }) => {
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

      <Grid className={sectionVariants({ size: "sm" })}>
        <div className="relative col-span-5 flex min-h-[20rem] flex-col justify-between overflow-hidden rounded-xl border border-border p-8">
          <div className="absolute left-[-20%] top-0 h-full w-full dark:[mask-image:linear-gradient(white,transparent)]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#36b49f] to-[#DBFF75] opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-[#36b49f]/30 dark:to-[#DBFF75]/30 dark:opacity-100">
              <svg
                aria-hidden="true"
                className="dark:fill-white/2.5 absolute inset-x-0 inset-y-[-50%] h-[200%] w-full skew-y-[-18deg] fill-black/40 stroke-black/50 mix-blend-overlay dark:stroke-white/5"
              >
                <defs>
                  <pattern
                    id=":S2:"
                    width="72"
                    height="56"
                    patternUnits="userSpaceOnUse"
                    x="-12"
                    y="4"
                  >
                    <path d="M.5 56V.5H72" fill="none"></path>
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  stroke-width="0"
                  fill="url(#:S2:)"
                ></rect>
                <svg x="-12" y="4" className="overflow-visible">
                  <rect
                    stroke-width="0"
                    width="73"
                    height="57"
                    x="288"
                    y="168"
                  ></rect>
                  <rect
                    stroke-width="0"
                    width="73"
                    height="57"
                    x="144"
                    y="56"
                  ></rect>
                  <rect
                    stroke-width="0"
                    width="73"
                    height="57"
                    x="504"
                    y="168"
                  ></rect>
                  <rect
                    stroke-width="0"
                    width="73"
                    height="57"
                    x="720"
                    y="336"
                  ></rect>
                </svg>
              </svg>
            </div>
            <svg
              viewBox="0 0 1113 440"
              aria-hidden="true"
              className="absolute left-1/2 top-0 ml-[-19rem] w-[69.5625rem] fill-white blur-[26px] dark:hidden"
            >
              <path d="M.016 439.5s-9.5-300 434-300S882.516 20 882.516 20V0h230.004v439.5H.016Z"></path>
            </svg>
          </div>

          <Badge size={"lg"} className="w-fit" variant={"blur"}>
            Your spaces are{" "}
            <span className="ml-1 font-bold text-green-800">thriving</span>
          </Badge>

          <div className="relative z-10 flex flex-col gap-3">
            <Paragraph
              size={"xs"}
              className="font-mono font-semibold text-muted-foreground/60"
            >
              What&apos;s happening today?
            </Paragraph>
            <Paragraph size={"lg"} className="font-bold">
              <Balancer>
                Occupancy rates for our managed spaces increased today, driven
                by a rising demand for rooms, desks, and floors across
                properties.
              </Balancer>
            </Paragraph>
          </div>
        </div>
        <div className="col-span-7 flex flex-col gap-3 rounded-xl bg-primary-foreground p-8">
          <div className="flex items-center justify-between">
            <Paragraph className="font-bold">Space Performance</Paragraph>
            <Paragraph className="text-muted-foreground/50" size={"xs"}>
              % occupied
            </Paragraph>
          </div>
          <ul
            className="grid w-full grid-cols-12 gap-x-4 gap-y-[2px] md:gap-x-6 lg:gap-x-8 xl:gap-x-10"
            // className={gridVariants({
            //   className: "w-full space-y-[1px]",
            // })}
          >
            <li className="relative col-span-6 flex w-full items-center justify-between overflow-hidden rounded-md py-[5px] pr-3 text-sm text-muted-foreground/70">
              <span>The Buzz</span>
              <span className="text-green-800 font-semibold text-xs">
                +1.40%
              </span>
              <div className="absolute inset-x-0 bottom-0 h-[1px] w-3/4 bg-gradient-to-r from-border to-transparent"></div>
              <div className="absolute inset-y-0 right-0 h-full w-1/5 bg-gradient-to-r from-transparent via-[#36b49f]/25 to-[#DBFF75]/25"></div>
            </li>
            <li className="relative col-span-6 flex w-full items-center justify-between overflow-hidden rounded-md py-[5px] pr-3 text-sm text-muted-foreground/70">
              <span>Poplar Park</span>
              <span className="text-green-800 font-semibold text-xs">
                +1.40%
              </span>
              <div className="absolute inset-x-0 bottom-0 h-[1px] w-3/4 bg-gradient-to-r from-border to-transparent"></div>
              <div className="absolute inset-y-0 right-0 h-full w-1/5 bg-gradient-to-r from-transparent via-[#36b49f]/25 to-[#DBFF75]/25"></div>
            </li>
            <li className="relative col-span-6 flex w-full items-center justify-between overflow-hidden rounded-md py-[5px] pr-3 text-sm text-muted-foreground/70">
              <span>SOHO - Beverley</span>
              <span className="text-green-800 font-semibold text-xs">
                +1.40%
              </span>
              <div className="absolute inset-x-0 bottom-0 h-[1px] w-3/4 bg-gradient-to-r from-border to-transparent"></div>
              <div className="absolute inset-y-0 right-0 h-full w-1/5 bg-gradient-to-r from-transparent via-[#36b49f]/25 to-[#DBFF75]/25"></div>
            </li>
          </ul>
        </div>
      </Grid>
    </div>
  )
}
export default OrgPage
