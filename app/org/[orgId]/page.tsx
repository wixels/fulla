import { Suspense } from "react"
import { Table } from "lucide-react"
import Balancer from "react-wrap-balancer"

import { getCurrentUser } from "@/lib/session"
import { serverClient } from "@/lib/trpc/server"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paragraph } from "@/components/ui/paragraph"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Title } from "@/components/ui/title"
import { Await } from "@/components/await"
import { Grid } from "@/components/grid"
import { PlaiceholderImage } from "@/components/plaiceholder-image"
import { Section, sectionVariants } from "@/components/section"
import Empty from "@/app/(site)/_empty"

import { Graph } from "./_graph"

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
        {/* DAILY AI INSIGHTS */}
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
        {/* OCCUPANCY RATE */}
        <div className="col-span-7 flex flex-col gap-3 rounded-xl bg-primary-foreground p-8">
          <div className="flex items-center justify-between">
            <Paragraph className="font-bold">Property Performance</Paragraph>
            <Paragraph className="text-muted-foreground/50" size={"xs"}>
              % occupied
            </Paragraph>
          </div>
          <ul className="grid w-full grid-cols-12 gap-x-4 gap-y-[2px] md:gap-x-6 lg:gap-x-8 xl:gap-x-10">
            <li className="relative col-span-6 flex w-full items-center justify-between overflow-hidden rounded-md py-[5px] pr-3 text-sm text-muted-foreground/70">
              <span>Open Window</span>
              <span className="text-xs font-semibold text-green-800">
                +5.40%
              </span>
              <div className="absolute inset-x-0 bottom-0 h-[1px] w-3/4 bg-gradient-to-r from-border to-transparent"></div>
              <div className="absolute inset-y-0 right-0 h-full w-2/5 bg-gradient-to-r from-transparent via-[#36b49f]/25 to-[#DBFF75]/25"></div>
            </li>
            <li className="relative col-span-6 flex w-full items-center justify-between overflow-hidden rounded-md py-[5px] pr-3 text-sm text-muted-foreground/70">
              <span>SOHO - Beverley</span>
              <span className="text-xs font-semibold text-red-800">-0.07%</span>
              <div className="absolute inset-x-0 bottom-0 h-[1px] w-3/4 bg-gradient-to-r from-border to-transparent"></div>
              <div className="absolute inset-y-0 right-0 h-full w-[10%] bg-gradient-to-r from-transparent via-[#FF6B6B]/25 to-[#FFB347]/25"></div>
            </li>

            <li className="relative col-span-6 flex w-full items-center justify-between overflow-hidden rounded-md py-[5px] pr-3 text-sm text-muted-foreground/70">
              <span>The Buzz</span>
              <span className="text-xs font-semibold text-green-800">
                +1.40%
              </span>
              <div className="absolute inset-x-0 bottom-0 h-[1px] w-3/4 bg-gradient-to-r from-border to-transparent"></div>
              <div className="absolute inset-y-0 right-0 h-full w-1/5 bg-gradient-to-r from-transparent via-[#36b49f]/25 to-[#DBFF75]/25"></div>
            </li>
            <li className="relative col-span-6 flex w-full items-center justify-between overflow-hidden rounded-md py-[5px] pr-3 text-sm text-muted-foreground/70">
              <span>The Junction</span>
              <span className="text-xs font-semibold text-red-800">-0.07%</span>
              <div className="absolute inset-x-0 bottom-0 h-[1px] w-3/4 bg-gradient-to-r from-border to-transparent"></div>
              <div className="absolute inset-y-0 right-0 h-full w-[10%] bg-gradient-to-r from-transparent via-[#FF6B6B]/25 to-[#FFB347]/25"></div>
            </li>

            <li className="relative col-span-6 flex w-full items-center justify-between overflow-hidden rounded-md py-[5px] pr-3 text-sm text-muted-foreground/70">
              <span>Poplar Park</span>
              <span className="text-xs font-semibold text-green-800">
                +1.40%
              </span>
              <div className="absolute inset-x-0 bottom-0 h-[1px] w-3/4 bg-gradient-to-r from-border to-transparent"></div>
              <div className="absolute inset-y-0 right-0 h-full w-1/5 bg-gradient-to-r from-transparent via-[#36b49f]/25 to-[#DBFF75]/25"></div>
            </li>
            <li className="relative col-span-6 flex w-full items-center justify-between overflow-hidden rounded-md py-[5px] pr-3 text-sm text-muted-foreground/70">
              <span>The Junction</span>
              <span className="text-xs font-semibold text-red-800">-0.07%</span>
              <div className="absolute inset-x-0 bottom-0 h-[1px] w-3/4 bg-gradient-to-r from-border to-transparent"></div>
              <div className="absolute inset-y-0 right-0 h-full w-[10%] bg-gradient-to-r from-transparent via-[#FF6B6B]/25 to-[#FFB347]/25"></div>
            </li>

            <li className="relative col-span-6 flex w-full items-center justify-between overflow-hidden rounded-md py-[5px] pr-3 text-sm text-muted-foreground/70">
              <span>Open Window</span>
              <span className="text-xs font-semibold text-green-800">
                +0.02%
              </span>
              <div className="absolute inset-x-0 bottom-0 h-[1px] w-3/4 bg-gradient-to-r from-border to-transparent"></div>
              <div className="absolute inset-y-0 right-0 h-full w-[5%] bg-gradient-to-r from-transparent via-[#36b49f]/25 to-[#DBFF75]/25"></div>
            </li>
          </ul>
        </div>
      </Grid>

      <Section size={"sm"}>
        <Title style={{ marginTop: 0 }} level={2} showAs={5}>
          <span className="font-mono font-bold">Revenue</span>
          <span className="text-xs text-muted-foreground/50"> / month</span>
        </Title>
        <Grid gap={"xs"} className="rounded-xl bg-primary-foreground">
          <ul className="relative col-span-5 w-full py-8 pl-8">
            {[
              "Poplar Park - Riverclub",
              "The Buzz",
              "Open Window",
              "The Junction",
              "SOHO Beverly",
            ].map((property, i) => {
              const positive = Math.random() < 0.5
              return (
                <li
                  key={i}
                  className="group rounded-[10px] p-0.5 transition-all hover:bg-foreground/5"
                >
                  <div
                    className={cn(
                      "flex h-8 items-center justify-between rounded-[8px] bg-primary-foreground px-3 text-xs",
                      {
                        "bg-foreground/5": i === 0,
                      }
                    )}
                  >
                    <span className="font-bold">{property}</span>
                    <div className="flex items-center gap-3">
                      <span>5 Spaces</span>
                      <Badge variant={positive ? "green" : "red"}>
                        {positive ? "+" : "-"}0.37%
                      </Badge>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="col-span-7 w-full py-8 pr-8">
            <Paragraph size={"sm"} className="font-mono font-bold">
              Poplar Park - Riverclub
            </Paragraph>
            <div className="flex items-center justify-between text-xs text-muted-foreground/50">
              <span>456.70</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className=" h-2 w-2 rounded-full bg-red-400"></span>
                  <p>Below Average</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className=" h-2 w-2 rounded-full bg-green-400"></span>
                  <p>Avg: R {new Intl.NumberFormat().format(21566)}</p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="1M">
              <TabsContent value="1D">
                <Graph total={24} />
              </TabsContent>
              <TabsContent value="1W">
                <Graph total={7} />
              </TabsContent>
              <TabsContent value="1M">
                <Graph total={31} />
              </TabsContent>
              <TabsContent value="3M">
                <Graph total={13} />
              </TabsContent>
              <TabsContent value="1Y">
                <Graph total={12} />
              </TabsContent>
              <TabsList className="mt-1">
                <TabsTrigger value="1D">1D</TabsTrigger>
                <TabsTrigger value="1W">1W</TabsTrigger>
                <TabsTrigger value="1M">1M</TabsTrigger>
                <TabsTrigger value="3M">3M</TabsTrigger>
                <TabsTrigger value="1Y">1Y</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </Grid>
      </Section>

      {/* POPULAR */}
      <Section size={"sm"}>
        <Title style={{ marginTop: 0 }} level={2} showAs={5}>
          <span className="font-mono font-bold">Popular</span>
          <span className="text-xs text-muted-foreground/50">
            {" "}
            / this month
          </span>
        </Title>
        <Suspense fallback="fetching popular spaces...">
          <Await promise={serverClient.spaces.published({})}>
            {(spaces) => (
              <>
                {spaces.length ? (
                  <Grid gap={"xs"} className="w-full">
                    {spaces.map((space) => (
                      <div
                        key={space.id}
                        className="group col-span-3 flex flex-col items-center gap-5 rounded-lg bg-primary-foreground p-5"
                      >
                        <div className="relative mx-auto aspect-square w-1/2 overflow-hidden rounded-full">
                          <PlaiceholderImage
                            src={space?.featureImageUrl ?? ""}
                            hasParent
                            alt={space.title as string}
                          />
                        </div>
                        <div className="flex w-full flex-col items-center gap-1">
                          <p className="w-3/4 cursor-pointer text-center font-mono font-bold group-hover:underline">
                            <Balancer>{space.title}</Balancer>
                          </p>
                          <Badge className="w-fit hover:underline">
                            @The Buzz
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground/50">
                          {new Intl.NumberFormat().format(
                            (Math.floor(Math.random() * 91) + 10) * 100
                          )}{" "}
                          Views
                        </p>
                      </div>
                    ))}
                  </Grid>
                ) : (
                  <Empty />
                )}
              </>
            )}
          </Await>
        </Suspense>
      </Section>
    </div>
  )
}
export default OrgPage
