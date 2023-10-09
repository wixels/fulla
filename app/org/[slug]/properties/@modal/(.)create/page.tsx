"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { forceDelay } from "@/lib/forceDelay"
import { trpc } from "@/lib/trpc/client"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { Switch } from "@/components/ui/switch"
import { ToastAction } from "@/components/ui/toast"
import { LoaderButton } from "@/components/loader-button"

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "That's a little too short!",
  }),
  description: z.string().min(2, {
    message: "That's a little too short",
  }),
  private: z.boolean().default(false),
})

// const formSchema = z.object({
//   name: z.string().min(2).max(50),
//   description: z.string().min(2).max(200),
//   private: z.boolean().default(false),
// })
type Props = {
  params: { slug: string }
}
const CreatePropertyPage: React.FC<Props> = ({ params: { slug } }) => {
  const router = useRouter()
  const { toast } = useToast()
  const utils = trpc.useContext()
  const { mutateAsync, isLoading } = trpc.org.createProperty.useMutation({
    onSuccess() {
      utils.org.properties.invalidate()
      router.back()
      // router.push("." + step.nextPath)
    },
    onError() {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    },
  })
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      private: false,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    forceDelay(mutateAsync({ ...data, slug }))
  }

  return (
    <Dialog defaultOpen onOpenChange={(e) => (!e ? router.back() : null)}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      autoFocus
                      type="text"
                      className="bg-transparent text-2xl font-semibold focus:outline-none"
                      placeholder="A Space Oddity."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <textarea
                      className="w-full focus:outline-none"
                      placeholder="Enter a brief description"
                      {...field}
                      rows={10}
                    ></textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter
              style={{ justifyContent: "space-between" }}
              className="flex w-full items-center"
            >
              <FormField
                control={form.control}
                name="private"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Private</FormLabel>
                  </FormItem>
                )}
              />
              <LoaderButton
                type="submit"
                size={"xs"}
                pending={isLoading}
                icon="Plus"
              >
                Create
              </LoaderButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
export default CreatePropertyPage
