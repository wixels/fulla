import Image from "next/image"
import { Bath, BedSingle, Calendar, ChevronRight, Users } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Paragraph } from "@/components/ui/paragraph"
import { Separator } from "@/components/ui/separator"
import { Title } from "@/components/ui/title"
import { SiteFooter } from "@/components/site-footer"

import { ListingAuthor } from "./_listing-author"
import { ListingGallery } from "./_listing-gallery"
import { ListingMap } from "./_listing-map"
import { ListingReviews } from "./_listing-reviews"

export default async function ListingPage() {
  return (
    <div>
      <div className="gutter section-padding-bottom relative flex min-h-screen flex-col flex-wrap gap-16 lg:flex-row">
        <div className="section-top flex w-full flex-col gap-12 lg:w-[40%]">
          <div className="relative flex aspect-video w-full overflow-hidden rounded-lg bg-muted-foreground lg:hidden">
            <Image
              fill
              className="object-cover"
              alt="house primary image"
              src={
                "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80"
              }
            />
          </div>
          <header>
            <Title className="font-bold" style={{ margin: 0 }}>
              Soho Apartment
            </Title>
            <Paragraph className="mt-4 text-muted-foreground" size={"lg"}>
              Beverley Gardens, Fourways, Gauteng
            </Paragraph>
            <div className="mt-8 flex items-end">
              <Title className="font-semibold" style={{ margin: 0 }} level={4}>
                R14,000
              </Title>{" "}
              <Paragraph
                className="text-muted-foreground"
                style={{ margin: 0 }}
              >
                {" "}
                / month
              </Paragraph>
            </div>
          </header>
          <div className="flex h-16 items-center justify-between rounded-full border">
            <Input
              rounded={"full"}
              className="ml-2 border-none"
              placeholder="Check Availability"
            />
            <button className="flex aspect-square h-full items-center justify-center rounded-full bg-primary text-background">
              <Calendar size={14} />
            </button>
          </div>
          <ul className="flex gap-7">
            <li className="flex flex-col gap-1">
              <Users />
              <Paragraph size="sm" className="font-semibold">
                4 Guests
              </Paragraph>
            </li>
            <li className="flex flex-col gap-1">
              <BedSingle />
              <Paragraph size="sm" className="font-semibold">
                2 Beds
              </Paragraph>
            </li>
            <li className="flex flex-col gap-1">
              <Bath />
              <Paragraph size="sm" className="font-semibold">
                2 Bathrooms
              </Paragraph>
            </li>
          </ul>
          <Paragraph className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus
            dolore, minima unde incidunt odit enim necessitatibus impedit
            temporibus! Sit aspernatur corrupti autem voluptas doloremque, quam
            saepe deserunt ipsam assumenda nobis.
          </Paragraph>
          <div>
            <Title className="font-semibold" level={6}>
              Offerings & Amenities
            </Title>
            <Separator />
            <ul className="mt-2 grid grid-cols-2">
              <li className="col-span-1 flex items-center gap-2 py-2 text-sm text-muted-foreground">
                <ChevronRight size={10} />
                Kitchen
              </li>
              <li className="col-span-1 flex items-center gap-2 py-2 text-sm text-muted-foreground">
                <ChevronRight size={10} />
                Kitchen
              </li>
              <li className="col-span-1 flex items-center gap-2 py-2 text-sm text-muted-foreground">
                <ChevronRight size={10} />
                Kitchen
              </li>
            </ul>
          </div>
          <ListingReviews />
        </div>
        <ListingGallery />
        <ListingMap />
        <ListingAuthor />
      </div>
      <SiteFooter />
    </div>
  )
}
