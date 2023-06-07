"use client"

import React, { useCallback, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { rest } from "@/lib/rest"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Login } from "@/types/authTypes"

const schema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
})
const Login: React.FC = () => {
  const [error, setError] = useState("")
  const [pending, startTransition] = useTransition()

  const router = useRouter()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const login = useCallback<Login>(async (args) => {
    const user = await rest(
      `${process.env.NEXT_PUBLIC_API_URL as string}/api/users/login`,
      args
    )
    return user
  }, [])
  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      await login(values)
      router.push("/")
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occurred while attempting to login.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="gutter section">
      <h1>Log in</h1>
      <p>
        To log in, use the email <b>dev@payloadcms.com</b> with the password{" "}
        <b>test</b>.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="example@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default Login
