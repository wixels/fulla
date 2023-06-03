import Image from "next/image"
import { Heart, Search } from "lucide-react"

import { CategoriesList } from "@/lib/categories"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { FiltersModal } from "@/components/filters-modal"
import { Icons } from "@/components/icons"

export default function IndexPage() {
  return (
    <div>
      <section className="gutter section grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="grow">
          <Title className="font-semibold">
            Find a home <br /> to make <br /> your own
          </Title>
          <Paragraph className="text-muted-foreground">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil
            necessitatibus repellendus enim eaque incidunt, quod aut praesentium
            ut perferendis cumque eum? Maxime.
          </Paragraph>
          <div className="mt-12 flex h-16 items-center justify-between rounded-full border">
            <Input
              rounded={"full"}
              className="ml-2 border-none"
              placeholder="Find your next home"
            />
            <button className="bg-primary text-background flex aspect-square h-full items-center justify-center rounded-full">
              <Search size={14} />
            </button>
          </div>
        </div>
        <div className="flex grow flex-col gap-4">
          <div className="text-white flex w-full grow bg-center bg-cover flex-row md:flex-col items-center md:items-start justify-between rounded-xl bg-[url('https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80')] p-8">
            <Title style={{ margin: 0 }} level={2}>
              Learn how <span className="font-semibold">Fulla</span> <br />
              can help you
            </Title>
            <button className="rounded-full border border-white/50 bg-white/75 px-6 py-3 text-sm text-black backdrop-blur-sm transition-all hover:bg-white/100">
              Revolutionize your renting
            </button>
          </div>
          <div className="bg-foreground text-background flex h-16 items-center justify-between rounded-full px-8">
            <Title className="font-semibold" level={5}>
              2,000+
            </Title>
            <Title level={5}>Unique Places</Title>
          </div>
        </div>
      </section>
      <section className="gutter section relative overflow-x-auto">
        <Title
          className="font-semibold"
          style={{ marginBottom: 0 }}
          level={2}
          showAs={4}
        >
          Discover your Home
        </Title>
        <Paragraph size={"sm"} className="text-muted-foreground pb-6">
          This will be some subtext
        </Paragraph>
        <div className="relative">
          {/* eslint-disable-next-line tailwindcss/no-contradicting-classname */}
          <div className="from-background absolute right-0 top-1/2 flex h-full -translate-y-1/2 items-center gap-2 bg-gradient-to-l from-[35%] pl-24">
            <button className="bg-background text-foreground rounded-full border p-2 shadow-lg">
              <Icons.arrowRight size={10} />
            </button>
            <FiltersModal>
              <Button variant={"outline"} className="bg-background">
                Filters
              </Button>
            </FiltersModal>
          </div>
          <div className="scrollbar-hide flex w-full gap-6 overflow-x-auto pr-36">
            {CategoriesList.map((item) => (
              <div
                className="flex w-96 cursor-pointer flex-col items-center justify-center gap-2 p-3 text-neutral-500 transition hover:text-neutral-800"
                key={item.label}
              >
                {item.icon}
                <div className="text-sm font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="gutter section grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="w-full grid-cols-1">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <div className="absolute inset-x-0 top-0 z-[1] flex w-full items-center justify-between p-8">
              <Badge size={"lg"} variant={"border"} style={{ color: "white" }}>
                Rating: 4.5
              </Badge>
              <div className="flex cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:text-red-500">
                <Heart size={14} />
              </div>
            </div>
            <Image
              fill
              className="object-cover"
              alt="house primary image"
              src={
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              }
            />
          </div>
          <div className="mt-4 flex flex-row items-center justify-between gap-10">
            <Title
              className="line-clamp-2 grow"
              style={{ margin: 0 }}
              level={3}
              showAs={5}
            >
              Listing Title
            </Title>
            <Badge>R3,352 / month</Badge>
          </div>
          <Paragraph size={"sm"} className="text-muted-foreground">
            Johannesburg
          </Paragraph>
        </div>
      </section>
    </div>
  )
}