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
  title: z.string().min(2, {
    message: "That's a little too short!",
  }),
  description: z
    .string()
    .min(2, {
      message: "That's a little too short",
    })
    .optional(),
})

type Props = {}
const CreateCollectionModal: React.FC<Props> = ({}) => {
  const [skipBack, setSkipBack] = useState(false)
  const [open, setOpen] = useState(true)
  const router = useRouter()
  const utils = trpc.useContext()
  const { toast } = useToast()
  const { mutateAsync, isLoading } = trpc.createCollection.useMutation({
    onSuccess(data) {
      utils.org.properties.invalidate()
      setOpen(false)
      router.push("/collections/" + data.id)
    },
    onError() {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
    },
  })
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setSkipBack(true)
    forceDelay(mutateAsync({ ...data }))
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
        if (!open && !skipBack) {
          router.back()
        }
      }}
    >
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      autoFocus
                      type="text"
                      className="bg-transparent text-2xl font-semibold focus:outline-none"
                      placeholder="A Fancy Collection"
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
              className="flex w-full items-end justify-end"
            >
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
export default CreateCollectionModal
