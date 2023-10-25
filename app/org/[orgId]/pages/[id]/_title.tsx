"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import EmojiPicker, { Emoji, EmojiClickData } from "emoji-picker-react"
import { motion } from "framer-motion"
import { Image, Smile } from "lucide-react"
import { useForm } from "react-hook-form"
import { useDebouncedCallback } from "use-debounce"
import * as z from "zod"

import { trpc } from "@/lib/trpc/client"
import { serverClient } from "@/lib/trpc/server"
import { cn } from "@/lib/utils"
import { useDebouncedState } from "@/hooks/use-debounced-state"
import { useToast } from "@/hooks/use-toast"
import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CoverPicker } from "@/components/cover-picker"

import Cover from "./_cover"

type Props = {
  // @ts-ignore
  initial: Awaited<ReturnType<typeof serverClient["page.single"]>>
  children?: React.ReactNode
  orgId: string
}
const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
})

export const PageContainer: React.FC<Props> = ({
  initial,
  children,
  orgId,
}) => {
  const page = trpc.page.single.useQuery(
    {
      id: initial.id,
    },
    {
      initialData: initial,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  )
  const [emojiLoading, setEmojiLoading] = useState(false)
  const [coverLoading, setCoverLoading] = useState(false)
  const [cover, setCover] = useDebouncedState(
    page.data?.coverImage?.fileUrl,
    500
  )
  const randomImage = trpc.randomImage.useQuery(undefined, {
    enabled: !cover,
  })
  const [emoji, setEmoji] = useDebouncedState(page.data.icon, 500)
  const [hovered, setHovered] = useState(false)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: initial.title ?? "",
    },
    mode: "all",
  })
  const utils = trpc.useContext()
  const updatePage = trpc.page.update.useMutation({
    onMutate: async () => {
      await utils.page.list.cancel()
      await utils.page.single.cancel()
    },
    onSuccess: () => {
      toast({
        description: "Todo updated",
      })
    },
    onSettled: () => {
      setEmojiLoading(false)
      setEmojiLoading(false)
      void utils.page.single.invalidate()
      void utils.page.list.invalidate()
    },
  })
  const debouncedUpdates = useDebouncedCallback(
    async (string: z.infer<typeof FormSchema>["title"]) => {
      if (string !== "" && string !== initial.title && string.length >= 2) {
        form.handleSubmit(onSubmit)()
      }
    },
    1000
  )

  useEffect(() => {
    if (emoji === initial.icon) return
    setEmojiLoading(true)
    updatePage.mutate({
      id: initial.id,
      data: {
        icon: emoji,
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emoji])

  function onSubmit(data: z.infer<typeof FormSchema>) {
    updatePage.mutate({
      id: initial.id,
      data: {
        title: data.title,
        icon: null,
      },
    })
  }
  function onClick(emojiData: EmojiClickData) {
    setEmoji(emojiData.unified)
  }
  return (
    <div className="flex min-h-screen flex-col pb-40">
      {/* <Cover url={cover} /> */}
      {cover ? <div className="group relative h-[35vh] w-full"></div> : null}
      <div className="gutter">
        {emoji ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="mt-6 aspect-square w-fit rounded-xl p-3 text-4xl hover:bg-accent lg:text-5xl xl:text-6xl">
                {emoji ? <Emoji unified={emoji} size={40} /> : null}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-none" style={{ padding: 0 }}>
              <EmojiPicker lazyLoadEmojis onEmojiClick={onClick} />
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
        <Form {...form}>
          <motion.form
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex items-center gap-2">
              {!page.data.coverImage && !cover ? (
                <CoverPicker background={cover} setBackground={setCover} />
              ) : // <motion.button
              //   onClick={() => {
              //     if (page.data && !page.isLoading) {
              //       setCoverLoading(true)
              //       setCover(randomImage.data?.urls?.regular)
              //       updatePage.mutate({
              //         id: page.data.id,
              //         data: {
              //           coverImage: {
              //             create: {
              //               fileKey: randomImage?.data?.alt_description,
              //               fileUrl: randomImage.data?.urls?.regular,
              //             },
              //           },
              //         },
              //       })
              //     }
              //   }}
              //   initial={{ opacity: 0, y: 10 }}
              //   animate={hovered || open ? { opacity: 1, y: 0 } : {}}
              //   transition={{
              //     delay: Number(`0.2`),
              //     duration: 0.3,
              //     ease: [0.165, 0.84, 0.44, 1],
              //   }}
              //   className={cn(
              //     buttonVariants({
              //       size: "xs",
              //       variant: "secondary",
              //       className: "w-fit text-accent-foreground/30",
              //     })
              //   )}
              // >
              //   {/* eslint-disable-next-line jsx-a11y/alt-text */}
              //   <Image className="mr-2 h-3 w-3" />
              //   Add Cover
              // </motion.button>
              null}
              {!page.data.icon && !emoji ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={hovered || open ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: Number(`0.2`),
                    duration: 0.3,
                    ease: [0.165, 0.84, 0.44, 1],
                  }}
                >
                  <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger asChild>
                      <button
                        onClick={() => setOpen(true)}
                        className={cn(
                          buttonVariants({
                            size: "xs",
                            variant: "secondary",
                            className: "w-fit text-accent-foreground/30",
                          })
                        )}
                      >
                        <Smile className="mr-2 h-3 w-3" />
                        Add Emoji
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="border-none"
                      style={{ padding: 0 }}
                    >
                      <EmojiPicker onEmojiClick={onClick} lazyLoadEmojis />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
              ) : null}
            </div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      onInput={(e) =>
                        debouncedUpdates(
                          (e.target as HTMLTextAreaElement)?.value
                        )
                      }
                      placeholder="Untitled"
                      style={{ padding: 0 }}
                      className="mb-7 border-none text-4xl lg:mb-8 lg:text-5xl xl:mb-9 xl:text-6xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.form>
        </Form>
        {children}
      </div>
    </div>
  )
}
