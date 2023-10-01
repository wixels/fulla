import { Suspense } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { CheckCircle, Home } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { serverClient } from "@/lib/trpc/server"
import { Button } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Title } from "@/components/ui/title"
import { Await } from "@/components/await"
import Balancer from "@/components/balancer"
import { ClientAvatar } from "@/components/client-avatar"

import { CreateButton } from "./_create-button"
import { CreateFromTemplate } from "./_create-from-template"
import { GradPanel } from "./_grad-panel"

export default async function SpaceCreationPage() {
  const user = await getCurrentUser()

  return (
    <div className="flex w-full flex-col md:flex-row md:overflow-hidden">
      <div className="gutter flex min-h-[60vh] w-full flex-col justify-center bg-[#FCFCFC] lg:h-screen lg:w-1/2">
        <div className="flex h-full w-full flex-col justify-center">
          <Title className="font-semibold" level={1} showAs={2}>
            <Balancer>
              Welcome back
              {", " + user?.name?.split(" ")?.[0]}
            </Balancer>
          </Title>
          <Paragraph className="text-muted-foreground" size={"lg"}>
            <Balancer>
              Create your next{" "}
              <i>
                <u>Fulla</u>
              </i>{" "}
              space
            </Balancer>
          </Paragraph>
          <div className="mt-12 flex flex-col gap-3">
            <ul className="flex flex-col gap-6">
              <Suspense
                fallback={
                  <>
                    <SpaceSkeleton />
                    <SpaceSkeleton />
                    <SpaceSkeleton />
                  </>
                }
              >
                <Await promise={serverClient.draftSpaces()}>
                  {(spaces) => (
                    <>
                      {spaces.map((space) => (
                        <li key={space.id}>
                          <Link
                            href={`/create/space/${space?.id}/title`}
                            className="flex items-center gap-6 rounded-lg border p-6 transition-all hover:border-primary hover:shadow"
                          >
                            <ClientAvatar
                              src={space.organization.logo?.fileUrl}
                              size="sm"
                              fallback={space.organization.name?.[0] ?? ""}
                            />
                            <Paragraph className="font-medium">
                              {space.title ?? "Untitled Space"}
                            </Paragraph>
                          </Link>
                        </li>
                      ))}
                    </>
                  )}
                </Await>
              </Suspense>

              <CreateButton orgId={user?.organizations[0].organization.id} />
            </ul>
            <CreateFromTemplate />
          </div>
        </div>
      </div>
      <GradPanel orgId={user?.organizations[0].organization.id} />
    </div>
  )
}

const SpaceSkeleton = () => {
  return (
    <li className="flex items-center gap-6 rounded-lg border p-6 transition-all hover:border-primary hover:shadow">
      <Skeleton className="h-10 w-10 rounded-full" />
      <Skeleton className="h-10 grow rounded-xl" />
    </li>
  )
}
