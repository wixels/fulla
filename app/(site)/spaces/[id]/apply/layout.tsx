import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Loader2 } from "lucide-react"

import { db } from "@/lib/db"
import { serverClient } from "@/lib/trpc/server"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar } from "@/components/ui/avatar"
import { badgeVariants } from "@/components/ui/badge"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { Await } from "@/components/await"
import { ClientAvatar } from "@/components/client-avatar"
import { Icons } from "@/components/icons"
import { PublishedSpaceCard } from "@/components/space-cards/published-space-card"
import { Spin } from "@/components/spin"

type Props = {
  children: React.ReactNode
  params: { id: string }
}
const ApplicationLayout: React.FC<Props> = ({ children, params: { id } }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="gutter inset-x-0 top-0 z-20 mx-auto flex w-full max-w-7xl items-center justify-between py-8">
        <Icons.logo className="h-6 w-6" />
        <div className="flex gap-2">
          <div className="h-2 w-2 rounded-full bg-foreground/25"></div>
          <div className="h-2 w-2 rounded-full bg-foreground/25"></div>
          <div className="h-2 w-2 rounded-full bg-foreground/25"></div>
        </div>
      </header>
      <div className="gutter section-top z-10 mx-auto flex h-fit w-full max-w-7xl grow">
        <div className="flex h-fit w-3/5">{children}</div>
        <Suspense fallback={<div>Loading...</div>}>
          <Await promise={serverClient.space.published({ id })}>
            {(space) => (
              <div className="flex h-fit w-2/5 flex-col overflow-hidden rounded-xl border shadow-md">
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    fill
                    src={space?.featureImageUrl!}
                    alt={space?.title! + "feature image"}
                    className="object-cover"
                  />
                </div>
                <div className="px-6 pb-6">
                  <Title className="font-semibold" showAs={4}>
                    {space?.title} - Application
                  </Title>
                  <Paragraph size={"xs"} className="mt-4 text-muted-foreground">
                    {space?.organization.name} •{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }).format(new Date(space?.createdAt!))}
                  </Paragraph>
                  <ul className="my-4 flex w-full flex-wrap gap-2 lg:w-3/4">
                    {[
                      ...(space?.amenities ?? []),
                      ...(space?.offerings ?? []),
                      ...(space?.highlights ?? []),
                    ]
                      .slice(0, 3)
                      .map((badge) => (
                        <li
                          className={badgeVariants({ variant: "secondary" })}
                          key={badge.id}
                        >
                          {badge.label}
                        </li>
                      ))}
                    {[
                      ...(space?.amenities ?? []),
                      ...(space?.offerings ?? []),
                      ...(space?.highlights ?? []),
                    ].length > 3 && (
                      <li className={badgeVariants({ variant: "secondary" })}>
                        +
                        {[
                          ...(space?.amenities ?? []),
                          ...(space?.offerings ?? []),
                          ...(space?.highlights ?? []),
                        ]?.length - 3}
                      </li>
                    )}
                  </ul>
                  <Accordion type="multiple">
                    <AccordionItem value="owner">
                      <AccordionTrigger>
                        <Title style={{ margin: 0 }} level={6}>
                          About the owner
                        </Title>
                      </AccordionTrigger>
                      <AccordionContent>
                        <Suspense
                          fallback={
                            <div className="flex w-full items-center justify-center p-6">
                              <Spin />
                            </div>
                          }
                        >
                          <Await
                            promise={serverClient.org.byId({
                              id: space?.organization.id!,
                            })}
                          >
                            {(org) => (
                              <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                  <ClientAvatar
                                    src={org?.logo?.fileUrl}
                                    fallback={org?.name?.[0]!}
                                    size="xs"
                                  />
                                  <Paragraph size={"sm"}>{org?.name}</Paragraph>
                                </div>
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                  <span>Payment Method Verified</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                  <span>Phone Number Verified</span>
                                </div>
                                <Paragraph
                                  className="font-semibold"
                                  size={"sm"}
                                >
                                  <Suspense
                                    fallback={
                                      <span>
                                        <Loader2 className="mr-2 h-3 w-3" />
                                        Spaces
                                      </span>
                                    }
                                  >
                                    <Await
                                      promise={db.space.count({
                                        where: { organizationId: org?.id },
                                      })}
                                    >
                                      {(count) => {
                                        return (
                                          <span>
                                            {count} Space
                                            {count === 1 ? "" : "s"}
                                          </span>
                                        )
                                      }}
                                    </Await>
                                  </Suspense>
                                </Paragraph>
                                <Paragraph
                                  size={"xs"}
                                  className="text-muted-foreground/50"
                                >
                                  Member since{" "}
                                  {new Intl.DateTimeFormat("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }).format(new Date(space?.updatedAt!))}
                                </Paragraph>
                              </div>
                            )}
                          </Await>
                        </Suspense>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="other-spaces">
                      <AccordionTrigger>
                        <Title style={{ margin: 0 }} level={6}>
                          Other Spaces from this company
                        </Title>
                      </AccordionTrigger>
                      <AccordionContent>
                        <Suspense
                          fallback={
                            <div className="flex w-full items-center justify-center p-6">
                              <Spin />
                            </div>
                          }
                        >
                          <Await
                            promise={db.space.findMany({
                              where: {
                                organizationId: space?.organizationId,
                                status: "published",
                                id: { not: space?.id },
                              },
                              take: 5,
                            })}
                          >
                            {(spaces) => {
                              return (
                                <ul>
                                  {spaces.length === 0 ? (
                                    <li className="flex w-full items-center justify-center p-4 text-muted-foreground/50">
                                      No other spaces
                                    </li>
                                  ) : null}
                                  {spaces.map((space) => (
                                    <li
                                      className="flex items-center gap-2"
                                      key={space.id}
                                    >
                                      <ClientAvatar
                                        src={space.featureImageUrl || undefined}
                                        fallback={space.title?.[0]!}
                                        size="xs"
                                      />
                                      <Link
                                        className="hover:text-blue-500 hover:underline"
                                        href={`/spaces/${space.id}`}
                                      >
                                        {space.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )
                            }}
                          </Await>
                        </Suspense>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="similar">
                      <AccordionTrigger>
                        <Title style={{ margin: 0 }} level={6}>
                          Similar Spaces
                        </Title>
                      </AccordionTrigger>
                      <AccordionContent>
                        <Suspense
                          fallback={
                            <div className="flex w-full items-center justify-center p-6">
                              <Spin />
                            </div>
                          }
                        >
                          <Await
                            promise={db.space.findMany({
                              where: {
                                category: {
                                  id: space?.categoryId!,
                                },
                                type: {
                                  id: space?.typeId!,
                                },
                                status: "published",
                                id: { not: space?.id },
                              },
                              take: 5,
                            })}
                          >
                            {(spaces) => {
                              return (
                                <ul>
                                  {spaces.length === 0 ? (
                                    <li className="flex w-full items-center justify-center p-4 text-muted-foreground/50">
                                      No other spaces
                                    </li>
                                  ) : null}
                                  {spaces.map((space) => (
                                    <li
                                      className="flex items-center gap-2"
                                      key={space.id}
                                    >
                                      <ClientAvatar
                                        src={space.featureImageUrl || undefined}
                                        fallback={space.title?.[0]!}
                                        size="xs"
                                      />
                                      <Link
                                        className="hover:text-blue-500 hover:underline"
                                        href={`/spaces/${space.id}`}
                                      >
                                        {space.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )
                            }}
                          </Await>
                        </Suspense>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  )
}
export default ApplicationLayout
