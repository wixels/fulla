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
import { Button } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Separator } from "@/components/ui/separator"
import { Title } from "@/components/ui/title"
import Balancer from "@/components/balancer"
import { ClientAvatar } from "@/components/client-avatar"

import { CreateButton } from "./_create-button"
import { CreateFromTemplate } from "./_create-from-template"
import { GradPanel } from "./_grad-panel"

export default async function SpaceCreationPage() {
  const user = await getCurrentUser()

  const [spaces, dbUser] = await Promise.all([
    await db.space.findMany({
      where: {
        status: "draft",
        organization: {
          users: {
            every: {
              userId: {
                equals: user?.id,
              },
            },
          },
        },
      },
      include: {
        organization: {
          include: {
            logo: true,
          },
        },
      },
    }),
    await db.user.findFirst({
      where: {
        id: user?.id,
      },
      include: {
        organizations: {
          include: {
            organization: true,
          },
        },
      },
    }),
  ])

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
              <CreateButton orgId={dbUser?.organizations[0].organization.id} />
            </ul>
            <CreateFromTemplate />
          </div>
        </div>
      </div>
      <GradPanel orgId={dbUser?.organizations[0].organization.id} />
    </div>
  )
}
