"use client"

import { useCallback } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, CircleDot, FormInput, ImageIcon } from "lucide-react"
import { FileWithPath, useDropzone } from "react-dropzone"
import { useForm } from "react-hook-form"
import Balancer from "react-wrap-balancer"
import { generateClientDropzoneAccept } from "uploadthing/client"
import * as z from "zod"

import { useUploadThing } from "@/lib/uploadthing"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Paragraph } from "@/components/ui/paragraph"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Title } from "@/components/ui/title"
import { gridVariants } from "@/components/grid"
import { Icons } from "@/components/icons"

const formLabelClassName =
  "flex aspect-square cursor-pointer flex-col justify-between gap-2 rounded-lg border bg-background p-4 transition-all hover:border-zinc-600 hover:shadow peer-aria-checked:border-blue-500 peer-aria-checked:text-blue-600 peer-aria-checked:ring-1 peer-aria-checked:ring-blue-500"

const leaseOptions = [
  {
    label: "Long",
    key: "long",
    description: "more than a year",
  },
  {
    label: "Mid",
    key: "mid",
    description: "6 months to a year",
  },
  {
    label: "Short",
    key: "short",
    description: "less than 6 months",
  },
]
type Props = {}
const FormSchema = z.object({
  term: z.enum(["long", "mid", "short"], {
    required_error: "Please select a leasing term",
  }),
  date: z.date({
    required_error: "A date is required",
  }),
  letter: z.string(),
})

const readFileAsync = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      resolve(reader.result)
    }

    reader.onerror = reject

    reader.readAsDataURL(file)
  })
}

const Apply: React.FC<Props> = ({}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const { toast } = useToast()
  const onDropAndOnChange = useCallback(async (files: FileWithPath[]) => {
    // log the files
    // if (files && files.length) {
    //   const data = await Promise.all(
    //     files.map(async (file) => {
    //       const content = await readFileAsync(file)
    //       return {
    //         name: file.name,
    //         url: URL.createObjectURL(file),
    //         type: file.type,
    //         size: file.size,
    //         content: content as string,
    //       }
    //     })
    //   )
    //   form.setValue("documents", data)
    // }
  }, [])
  const { startUpload, isUploading, permittedFileInfo } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: () => {
        toast({
          description: "Successfully uploaded image",
        })
      },
      onUploadError: () => {
        toast({
          variant: "destructive",
          title: "An upload error occurred",
          description: "Please try again later",
        })
      },
    }
  )

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : []

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("values::: ", data)
  }

  return (
    <div>
      <Title className="font-mono" level={2}>
        Proposal
      </Title>
      <Paragraph className="text-muted-foreground/50">
        <Balancer>
          Apply now: Transforming Empty Spaces into Productivity Havens
        </Balancer>
      </Paragraph>
      <Separator className="my-4" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lease Term</FormLabel>
                <FormControl className={gridVariants({ gap: "xs" })}>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {leaseOptions.map((opt) => (
                      <FormItem className="col-span-4" key={opt.key}>
                        <FormControl>
                          <RadioGroupItem
                            className="peer hidden"
                            value={opt.key}
                          />
                        </FormControl>
                        <FormLabel className={cn(formLabelClassName)}>
                          <CircleDot />
                          <div>
                            <Paragraph size="sm">{opt.label}</Paragraph>
                            <Paragraph
                              className="text-muted-foreground/50"
                              size="xs"
                            >
                              {opt.description}
                            </Paragraph>
                          </div>
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Move-in Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            // @ts-ignore
            name="documents"
            render={({ field }) => (
              <FormItem>
                <Label>Relevant Documents</Label>
                <FormLabel className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dotted border-muted-foreground/50 p-4">
                  <ImageIcon size={64} />
                  <Title className="font-semibold" level={6}>
                    Click here to add photos
                  </Title>
                  <Paragraph size="xs" className="text-muted-foreground/50">
                    Choose at least 5 photos
                  </Paragraph>
                </FormLabel>
                <FormControl>
                  {/* @ts-ignore */}
                  <input type="file" {...field} className="peer hidden" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="letter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Letter</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell the owner why they should consider you"
                    rows={10}
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

export default Apply
