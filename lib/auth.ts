import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import { Resend } from "resend"

import { db } from "@/lib/db"
import MagicLinkEmail from "@/components/emails/magic-link-template"

const resend = new Resend(process.env.RESEND_API_KEY)

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  debug: true,
  session: {
    strategy: "jwt",
  },
  pages: {
    verifyRequest: "/verifyRequest",
    signIn: "/login",
    newUser: "/newUser",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    {
      id: "resend",
      type: "email",
      // @ts-ignore
      sendVerificationRequest: async (params) => {
        const { identifier, url, provider, theme } = params
        const { host } = new URL(url)

        try {
          const data = await resend.emails.send({
            from: "Wixels <noreply@wixels.com>",
            to: [identifier],
            subject: `Log in to ${host}`,
            react: MagicLinkEmail({ url, host }),
            text: `Sign in to ${host}\n${url}\n\n`,
          })
          return { success: true, data }
        } catch (error) {
          throw new Error("Failed to send the verification email")
        }
      },
    },
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        // @ts-ignore
        session.user.organizations = token.organizations
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        include: {
          organizations: {
            include: {
              organization: {
                include: {
                  logo: true,
                },
              },
            },
          },
        },
        where: {
          email: {
            equals: token.email,
          },
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        organizations: dbUser.organizations,
      }
    },
  },
}
