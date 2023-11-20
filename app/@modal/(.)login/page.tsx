"use client"

import { useState } from "react"
import { Metadata } from "next"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { is } from "date-fns/locale"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { Drawer } from "vaul"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})
export default function LoginPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const callback = searchParams?.get("callbackUrl") ?? "/"

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true)
    signIn("resend", {
      email: data.email,
      callbackUrl: callback,
    })
  }
  const router = useRouter()
  const [open, setOpen] = useState(true)
  return (
    <Drawer.Root
      dismissible={isLoading || isGitHubLoading ? false : true}
      shouldScaleBackground
      open={open}
      onOpenChange={(e) => {
        if (!isLoading && !isGitHubLoading) {
          setOpen(e)
          if (!e) {
            setTimeout(() => router.back(), 500)
          }
        }
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Drawer.Content className="fixed inset-0 z-50 mx-auto flex w-screen max-w-2xl flex-col justify-end">
          <div className="mt-6 h-full overflow-scroll rounded-t-xl bg-background">
            <div className="mx-auto mb-8 mt-2 h-1 w-12 shrink-0 cursor-grab rounded-full bg-gray-300" />
            <div className="flex w-full flex-col justify-center space-y-6 p-6">
              <div className="flex flex-col space-y-2 text-center">
                <Icons.logo className="mx-auto h-6 w-6" />
                <h1 className="text-2xl font-semibold tracking-tight">
                  Welcome back
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email to sign in to your account
                </p>
              </div>
              <div className={cn("grid gap-6")}>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="alan.turing@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            We&apos;ll send you an email with a link to sign in.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <button
                      className={cn(buttonVariants(), "mt-4 w-full")}
                      disabled={isLoading || isGitHubLoading}
                    >
                      {isLoading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Sign In with Email
                    </button>
                  </form>
                </Form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className={cn(buttonVariants({ variant: "outline" }))}
                  onClick={() => {
                    setIsGitHubLoading(true)
                    signIn("github")
                  }}
                  disabled={isLoading || isGitHubLoading}
                >
                  {isGitHubLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                  )}{" "}
                  Github
                </button>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
