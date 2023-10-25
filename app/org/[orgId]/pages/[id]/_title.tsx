"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import EmojiPicker, { Emoji, EmojiClickData } from "emoji-picker-react"
import { motion } from "framer-motion"
import { Image as ImageIcon, Smile, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { useDebouncedCallback } from "use-debounce"
import * as z from "zod"

import { trpc } from "@/lib/trpc/client"
import { serverClient } from "@/lib/trpc/server"
import { cn } from "@/lib/utils"
import { useDebouncedState } from "@/hooks/use-debounced-state"
import { useToast } from "@/hooks/use-toast"
import { Button, buttonVariants } from "@/components/ui/button"
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
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

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

const solids = [
  "#E2E2E2",
  "#ff75c3",
  "#ffa647",
  "#ffe83f",
  "#9fff5b",
  "#70e2ff",
  "#cd93ff",
  "#09203f",
]
const gradients = [
  "linear-gradient(to top left,#accbee,#e7f0fd)",
  "linear-gradient(to top left,#d5d4d0,#d5d4d0,#eeeeec)",
  "linear-gradient(to top left,#000000,#434343)",
  "linear-gradient(to top left,#09203f,#537895)",
  "linear-gradient(to top left,#AC32E4,#7918F2,#4801FF)",
  "linear-gradient(to top left,#f953c6,#b91d73)",
  "linear-gradient(to top left,#ee0979,#ff6a00)",
  "linear-gradient(to top left,#F00000,#DC281E)",
  "linear-gradient(to top left,#00c6ff,#0072ff)",
  "linear-gradient(to top left,#4facfe,#00f2fe)",
  "linear-gradient(to top left,#0ba360,#3cba92)",
  "linear-gradient(to top left,#FDFC47,#24FE41)",
  "linear-gradient(to top left,#8a2be2,#0000cd,#228b22,#ccff00)",
  "linear-gradient(to top left,#40E0D0,#FF8C00,#FF0080)",
  "linear-gradient(to top left,#fcc5e4,#fda34b,#ff7882,#c8699e,#7046aa,#0c1db8,#020f75)",
  "linear-gradient(to top left,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)",
]
export const images = [
  "url(https://images.unsplash.com/photo-1691200099282-16fd34790ade?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)",
  "url(https://images.unsplash.com/photo-1688822863426-8c5f9b257090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)",
  "url(https://images.unsplash.com/photo-1691225850735-6e4e51834cad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)",
]

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
  const [cover, setCover] = useState(page.data?.cover ?? "")
  const [emoji, setEmoji] = useState(page.data.icon)
  const [hovered, setHovered] = useState(false)
  const [open, setOpen] = useState(false)
  const [coverPopoverOpen, setCoverPopoverOpen] = useState(false)
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
        description: "Page updated",
      })
    },
    onSettled: () => {
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
    setOpen(false)
    setEmoji(emojiData.unified)
    updatePage.mutate({
      id: initial.id,
      data: {
        icon: emojiData.unified,
      },
    })
  }
  console.log("open::: ", open)
  return (
    <div className="flex min-h-screen flex-col pb-40">
      {cover ? (
        <div
          style={{ background: cover }}
          className="group relative h-[35vh] w-full bg-cover bg-center bg-no-repeat"
        >
          <div className="absolute bottom-5 right-5 flex items-center opacity-0 transition-all group-hover:opacity-100">
            <Popover open={coverPopoverOpen} onOpenChange={setCoverPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  // onClick={() => coverImage.onReplace(url)}
                  className="text-xs text-muted-foreground"
                  variant="secondary"
                  size="xs"
                >
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Change cover
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="h-[400px] w-screen max-w-[600px] overflow-y-scroll"
              >
                <Tabs defaultValue="account" className="pt-12">
                  <TabsList className="absolute left-4 top-4">
                    <TabsTrigger value="gallery">Gallery</TabsTrigger>
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                    <TabsTrigger value="link">Link</TabsTrigger>
                    <TabsTrigger value="unsplash">Unsplash</TabsTrigger>
                  </TabsList>
                  <TabsContent value="gallery" className="w-full">
                    <Label className="text-accent-foreground/50">
                      Color & Gradient
                    </Label>
                    <div className="mb-2 grid w-full grid-cols-3 gap-1">
                      {[...solids, ...gradients].map((color) => (
                        <button
                          key={color}
                          style={{ background: color }}
                          className="col-span-1 aspect-video w-full cursor-pointer rounded-md"
                          onClick={() => {
                            setCoverPopoverOpen(false)
                            setCover(color)
                            updatePage.mutate({
                              id: page.data.id,
                              data: {
                                cover: color,
                              },
                            })
                          }}
                        />
                      ))}
                    </div>
                    <Label className="text-accent-foreground/50">
                      Color & Gradient
                    </Label>
                    <div className="mb-2 grid w-full grid-cols-3 gap-1">
                      {images.map((imageString) => (
                        <button
                          key={imageString}
                          style={{ backgroundImage: imageString }}
                          className="col-span-1 aspect-video w-full cursor-pointer rounded-md bg-cover bg-center"
                          onClick={() => {
                            setCoverPopoverOpen(false)
                            setCover(imageString)
                            updatePage.mutate({
                              id: page.data.id,
                              data: {
                                cover: imageString,
                              },
                            })
                          }}
                        />
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="upload">Upload your own</TabsContent>
                  <TabsContent value="link">Link stuff</TabsContent>
                  <TabsContent value="unsplash">
                    Unsplash stuff goes here
                  </TabsContent>
                </Tabs>
                <Button
                  className="absolute right-4 top-4"
                  size={"xs"}
                  variant={"ghost"}
                >
                  Remove
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      ) : null}
      <div
        className={cn("gutter", {
          section: !cover,
        })}
      >
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
              {!cover || cover === "" ? (
                <motion.button
                  onClick={() => {
                    if (page.data && !page.isLoading) {
                      const coverOpts = [...solids, ...gradients]
                      const randomImage =
                        coverOpts[Math.floor(Math.random() * coverOpts.length)]
                      setCover(randomImage)
                      updatePage.mutate({
                        id: page.data.id,
                        data: {
                          cover: randomImage,
                        },
                      })
                    }
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={hovered || open ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: Number(`0.2`),
                    duration: 0.3,
                    ease: [0.165, 0.84, 0.44, 1],
                  }}
                  className={cn(
                    buttonVariants({
                      size: "xs",
                      variant: "secondary",
                      className: "w-fit text-accent-foreground/30",
                    })
                  )}
                >
                  <ImageIcon className="mr-2 h-3 w-3" />
                  Add Cover
                </motion.button>
              ) : null}
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
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <button
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
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="border-none"
                      style={{ padding: 0 }}
                    >
                      <EmojiPicker onEmojiClick={onClick} lazyLoadEmojis />
                    </PopoverContent>
                  </Popover>
                </motion.div>
              ) : null}
            </div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      onInput={(e) =>
                        debouncedUpdates(
                          (e.target as HTMLTextAreaElement)?.value
                        )
                      }
                      placeholder="Untitled"
                      style={{ padding: 0 }}
                      className="mb-7 w-full border-none text-2xl lg:text-3xl xl:text-4xl"
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
