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
import { badgeVariants } from "@/components/ui/badge"
import { Paragraph } from "@/components/ui/paragraph"
import { Skeleton } from "@/components/ui/skeleton"
import { Title } from "@/components/ui/title"
import { Await } from "@/components/await"
import { ClientAvatar } from "@/components/client-avatar"
import { Spin } from "@/components/spin"

type Props = {
  children: React.ReactNode
  params: { id: string }
}
const ApplicationLayout: React.FC<Props> = ({ children, params: { id } }) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="gutter section-padding relative z-10 mx-auto flex w-full max-w-7xl grow gap-4 md:gap-6 lg:gap-8 xl:gap-10">
        <div className="flex h-full w-3/5">{children}</div>
        <div className="sticky top-40 flex h-fit w-2/5 flex-col overflow-hidden rounded-xl border shadow-md">
          <Suspense
            fallback={
              <>
                <Skeleton className="aspect-[16/11] w-full rounded-xl" />
                <div className="px-6">
                  <Skeleton className="my-4 h-5 w-full lg:my-5 lg:h-6 xl:my-6 xl:h-8 " />
                </div>
              </>
            }
          >
            <Await promise={serverClient.space.published({ id })}>
              {(space) => (
                <>
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
                      {space?.title}
                    </Title>
                    <Paragraph
                      size={"xs"}
                      className="mt-4 text-muted-foreground"
                    >
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
                                    <Paragraph size={"sm"}>
                                      {org?.name}
                                    </Paragraph>
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
                                        <span className="flex items-center gap-2">
                                          <Loader2 className="h-3 w-3" />
                                          Spaces
                                        </span>
                                      }
                                    >
                                      <Await
                                        promise={db.space.count({
                                          where: {
                                            organizationId: org?.id,
                                            status: "published",
                                          },
                                        })}
                                      >
                                        {(count) => {
                                          return (
                                            <span>
                                              {count} Other Space
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
                                          src={
                                            space.featureImageUrl || undefined
                                          }
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
                                          src={
                                            space.featureImageUrl || undefined
                                          }
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
                </>
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  )
}
export default ApplicationLayout
