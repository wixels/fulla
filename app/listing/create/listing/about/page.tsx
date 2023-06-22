import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Home, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button, buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Slider } from "@/components/ui/slider"
import { Title } from "@/components/ui/title"

export default function ListingsHome() {
  const grad =
    "bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
  return (
    <main>
      <header className="gutter flex h-20 items-center justify-between">
        <Link href={"/"}>
          <div className={cn([grad, "h-8 w-8 rounded-full bg-red-200"])} />
        </Link>
        <div className="flex">
          <Link
            className={cn(buttonVariants({ class: "flex gap-2" }))}
            href={"/listings/create"}
          >
            <Home size={16} />
            Setup a Fulla Home
          </Link>
          {/* <button>x</button> */}
          {/* <Button>Fulla Setup</Button> */}
        </div>
      </header>
      <section className="gutter section flex items-center gap-8">
        <div className="flex w-full flex-col items-center gap-10 xl:w-1/2">
          <Title
            style={{ margin: 0 }}
            showAs={2}
            className="text-center font-semibold"
          >
            <span className="text-sky-500">Fulla Home.</span> <br />
            You could earn
          </Title>
          <Title className="font-bold" style={{ margin: 0 }} showAs={1}>
            R160,167 ZAR
          </Title>
          <Paragraph>
            <u>12 nights</u> at an estimated R13, 347 ZAR a month
          </Paragraph>
          <Slider defaultValue={[50]} max={100} step={1} className="w-[60%]" />
          <Paragraph className="text-stone-500 underline" size={"sm"}>
            Learn how we estimate your earnings
          </Paragraph>
          <Button
            rounded={"full"}
            variant={"outline"}
            size={"lg"}
            className="flex h-fit items-center gap-6"
          >
            <Search className="text-sky-500" size={16} />
            <div className="my-4 text-left">
              <Paragraph size={"sm"} className="font-semibold">
                Johannesburg
              </Paragraph>
              <Paragraph size={"sm"} className="text-zinc-500">
                Entire Place • 2 Bedrooms
              </Paragraph>
            </div>
          </Button>
        </div>
        <div
          className={cn([
            "aspect-video w-full rounded-lg bg-red-50 opacity-25 xl:aspect-square xl:w-1/2",
            grad,
          ])}
        />
      </section>
      <section className="gutter section text-left xl:text-center">
        <Title level={2} className="font-semibold">
          Easily Maintain Your Tenants
        </Title>
        <Image
          src={"/fulla_home.webp"}
          width={1280}
          height={843}
          alt="Authentication"
        />
        <div className="mt-8 grid grid-cols-3 gap-8">
          <div className="col-span-3 text-left lg:col-span-1">
            <Title level={5}>Automate Document Sending</Title>
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
              qui repudiandae. Sapiente sit ad, blanditiis mollitia id ut
              quisquam! Doloribus minima voluptatibus.
            </Paragraph>
          </div>
          <div className="col-span-3 text-left lg:col-span-1">
            <Title level={5}>Manage Tenant Requests</Title>
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
              qui repudiandae. Sapiente sit ad.
            </Paragraph>
          </div>
          <div className="col-span-3 text-left lg:col-span-1">
            <Title level={5}>Engage the community</Title>
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
              qui repudiandae. Sapiente sit ad. Lorem ipsum dolor sit amet
              consectetur.
            </Paragraph>
          </div>
        </div>
      </section>
      <section className="gutter section-top grid grid-cols-1 gap-10 bg-gray-100 py-12 dark:bg-gray-900 lg:grid-cols-2">
        <Title level={2} className="font-semibold">
          Got Questions?
        </Title>
        <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <Title level={5}>Is my place right for Fulla?</Title>
            </AccordionTrigger>
            <AccordionContent>
              Fulla guests are interested in all kinds of places. We have
              listings for tiny homes, cabins, tree houses, and more. Even a
              spare room can be a great place to stay.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <Title level={5}>Do I have to host all the time?</Title>
            </AccordionTrigger>
            <AccordionContent>
              Not at all—you control your calendar.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <Title level={5}>How much should I interact with tenants?</Title>
            </AccordionTrigger>
            <AccordionContent>
              It’s up to you. Some Hosts prefer to message guests only at key
              moments—like sending a short note when they check in—while others
              also enjoy meeting their guests in person. You’ll find a style
              that works for you and your guests.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </main>
  )
}
