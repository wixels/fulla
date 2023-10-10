import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { serverClient } from "@/lib/trpc/server"
import { Icons } from "@/components/icons"

type Props = {
  children: React.ReactNode
  params: { slug: string }
}
const Layout: React.FC<Props> = async ({ children, params: { slug } }) => {
  const org = await serverClient.org.bySlug({ slug })
  return (
    <div className="relative">
      <div className="fixed inset-y-0 left-0 flex h-screen w-20 flex-col items-center justify-between bg-accent py-6">
        <div className="flex flex-col items-center gap-1">
          <Link href={"/org/" + org?.slug} className="mb-6">
            {org?.logo?.fileUrl ? (
              <div className="relative aspect-square w-8 rounded-full">
                <Image
                  fill
                  src={org?.logo?.fileUrl}
                  alt={org?.logo?.fileKey}
                  className="object-cover"
                />
              </div>
            ) : (
              <Icons.logo className="h-6 w-6" />
            )}
          </Link>
          {siteConfig.org.map((link) => (
            <Link
              key={link.href}
              href={"/org/" + slug + link.href}
              className="flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-xl p-2 text-muted-foreground hover:bg-muted-foreground/10"
            >
              {link.icon}
              <p className="text-xs">{link.title}</p>
            </Link>
          ))}
        </div>

        <div>ORF</div>
      </div>
      <div className="ml-20">{children}</div>
    </div>
  )
}
export default Layout
