"use client"

import { useCallback, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "lucide-react"
import { useSession } from "next-auth/react"
import { useTheme } from "next-themes"
import { FileWithPath, useDropzone } from "react-dropzone"
import { useForm } from "react-hook-form"
import Balancer from "react-wrap-balancer"
import { generateClientDropzoneAccept } from "uploadthing/client"
import * as z from "zod"

import { trpc } from "@/lib/trpc/client"
import { useUploadThing } from "@/lib/uploadthing"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { LoaderButton } from "@/components/loader-button"

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  image: z.string().nullable().optional(),
})

export default function NewUserPage() {
  const { theme } = useTheme()
  const { toast } = useToast()
  const { data: session } = useSession()
  const router = useRouter()
  const updateUser = trpc.user.update.useMutation({
    onSettled() {
      router.push("/")
    },
  })
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const [files, setFiles] = useState<File[]>([])
  const { startUpload, isUploading, permittedFileInfo } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: () => {
        toast({
          description: "uploaded successfully!",
        })
      },
      onUploadError: () => {
        toast({ description: "error occurred while uploading" })
      },
    }
  )
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles)
  }, [])

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : []
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    let upload
    if (files.length) {
      upload = await startUpload([files?.[0]])
    }

    await updateUser.mutateAsync({
      id: session?.user.id!,
      data: {
        name: data.name,
        image: upload?.[0]?.fileUrl ?? null,
        organizations: {
          connect: {
            id: "clnn4qfq30003lside006jl4a",
          },
        },
      },
    })
  }
  return (
    <div
      style={{
        backgroundImage: `url(${
          theme === "dark" ? "/gradient-bg-dark.jpg" : "/gradient-bg-white.jpg"
        })`,
      }}
      className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
    >
      <div className="fixed inset-0 z-0 h-screen w-screen bg-background/30 backdrop-blur-xl"></div>
      <svg
        className="fixed inset-0 z-0 opacity-50 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
        viewBox="0 0 1422 800"
      >
        <defs>
          <linearGradient
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
            id="oooscillate-grad"
          >
            <stop
              stopColor="hsl(230, 55%, 50%)"
              stopOpacity="1"
              offset="0%"
            ></stop>
            <stop
              stopColor="hsl(230, 55%, 70%)"
              stopOpacity="1"
              offset="100%"
            ></stop>
          </linearGradient>
        </defs>
        <g
          strokeWidth="2"
          stroke="url(#oooscillate-grad)"
          fill="none"
          strokeLinecap="round"
        >
          <path
            d="M 0 572 Q 355.5 150 711 400 Q 1066.5 650 1422 572"
            opacity="0.05"
          ></path>
          <path
            d="M 0 550 Q 355.5 150 711 400 Q 1066.5 650 1422 550"
            opacity="0.09"
          ></path>
          <path
            d="M 0 528 Q 355.5 150 711 400 Q 1066.5 650 1422 528"
            opacity="0.13"
          ></path>
          <path
            d="M 0 506 Q 355.5 150 711 400 Q 1066.5 650 1422 506"
            opacity="0.16"
          ></path>
          <path
            d="M 0 484 Q 355.5 150 711 400 Q 1066.5 650 1422 484"
            opacity="0.20"
          ></path>
          <path
            d="M 0 462 Q 355.5 150 711 400 Q 1066.5 650 1422 462"
            opacity="0.24"
          ></path>
          <path
            d="M 0 440 Q 355.5 150 711 400 Q 1066.5 650 1422 440"
            opacity="0.28"
          ></path>
          <path
            d="M 0 418 Q 355.5 150 711 400 Q 1066.5 650 1422 418"
            opacity="0.32"
          ></path>
          <path
            d="M 0 396 Q 355.5 150 711 400 Q 1066.5 650 1422 396"
            opacity="0.35"
          ></path>
          <path
            d="M 0 374 Q 355.5 150 711 400 Q 1066.5 650 1422 374"
            opacity="0.39"
          ></path>
          <path
            d="M 0 352 Q 355.5 150 711 400 Q 1066.5 650 1422 352"
            opacity="0.43"
          ></path>
          <path
            d="M 0 330 Q 355.5 150 711 400 Q 1066.5 650 1422 330"
            opacity="0.47"
          ></path>
          <path
            d="M 0 308 Q 355.5 150 711 400 Q 1066.5 650 1422 308"
            opacity="0.51"
          ></path>
          <path
            d="M 0 286 Q 355.5 150 711 400 Q 1066.5 650 1422 286"
            opacity="0.54"
          ></path>
          <path
            d="M 0 264 Q 355.5 150 711 400 Q 1066.5 650 1422 264"
            opacity="0.58"
          ></path>
          <path
            d="M 0 242 Q 355.5 150 711 400 Q 1066.5 650 1422 242"
            opacity="0.62"
          ></path>
          <path
            d="M 0 220 Q 355.5 150 711 400 Q 1066.5 650 1422 220"
            opacity="0.66"
          ></path>
          <path
            d="M 0 198 Q 355.5 150 711 400 Q 1066.5 650 1422 198"
            opacity="0.70"
          ></path>
          <path
            d="M 0 176 Q 355.5 150 711 400 Q 1066.5 650 1422 176"
            opacity="0.73"
          ></path>
          <path
            d="M 0 154 Q 355.5 150 711 400 Q 1066.5 650 1422 154"
            opacity="0.77"
          ></path>
          <path
            d="M 0 132 Q 355.5 150 711 400 Q 1066.5 650 1422 132"
            opacity="0.81"
          ></path>
          <path
            d="M 0 110 Q 355.5 150 711 400 Q 1066.5 650 1422 110"
            opacity="0.85"
          ></path>
          <path
            d="M 0 88 Q 355.5 150 711 400 Q 1066.5 650 1422 88"
            opacity="0.89"
          ></path>
          <path
            d="M 0 66 Q 355.5 150 711 400 Q 1066.5 650 1422 66"
            opacity="0.92"
          ></path>
          <path
            d="M 0 44 Q 355.5 150 711 400 Q 1066.5 650 1422 44"
            opacity="0.96"
          ></path>
        </g>
      </svg>
      <Card className="z-10 mx-auto w-full max-w-xl">
        <CardHeader>
          <CardTitle>Setup your profile</CardTitle>
          <CardDescription>
            <Balancer>
              Add some basic information before we find the best space for you
            </Balancer>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full items-center gap-4"
            >
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel {...getRootProps()} className="w-full lg:w-1/2">
                      Profile Image
                      <div className="relative  mt-4 flex aspect-square w-full max-w-[100px] items-center justify-center overflow-hidden rounded-full bg-accent">
                        {files?.[0] ? (
                          <Image
                            fill
                            className="object-cover"
                            alt="house primary image"
                            src={URL.createObjectURL(files?.[0])}
                          />
                        ) : (
                          <User className="text-muted-foreground" />
                        )}
                      </div>
                      <FormControl className="hidden">
                        <input type="file" {...getInputProps()} />
                      </FormControl>
                    </FormLabel>
                    <FormDescription>
                      Drag and drop your profile image here
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name i.e John Doe.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoaderButton
                disabled={!session?.user || isUploading || updateUser.isLoading}
                type="submit"
                pending={isUploading || updateUser.isLoading}
                icon="ArrowRight"
                className="w-fit"
              >
                {updateUser.isLoading
                  ? "Saving..."
                  : isUploading
                  ? "Uploading..."
                  : "Create"}
              </LoaderButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
