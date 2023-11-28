"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, CircleDot } from "lucide-react"
import { useForm } from "react-hook-form"
import Balancer from "react-wrap-balancer"
import * as z from "zod"

import { trpc } from "@/lib/trpc/client"
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
import { LoaderButton } from "@/components/loader-button"
import { Uploader } from "@/components/uploader"

const formLabelClassName =
  "flex aspect-square cursor-pointer flex-col justify-between gap-2 rounded-lg border bg-background p-4 transition-all hover:border-zinc-600 hover:shadow peer-aria-checked:border-blue-500 peer-aria-checked:text-blue-600 peer-aria-checked:ring-1 peer-aria-checked:ring-blue-500"

const leaseOptions = [
  {
    label: "Fixed Term",
    key: "fixed_term",
    description: "1 year or more",
  },
  {
    label: "Month to Month",
    key: "month_to_month",
    description: "Pay for the month you stay",
  },
  {
    label: "Daily",
    key: "daily",
    description: "Stay free. Come and go as you please",
  },
]
type Props = {
  params: {
    id: string
  }
}
const FormSchema = z.object({
  term: z.enum(["daily", "fixed_term", "month_to_month"], {
    required_error: "Please select a leasing term",
  }),
  date: z.date({
    required_error: "A date is required",
  }),
  letter: z.string(),
})

const Apply: React.FC<Props> = ({ params: { id } }) => {
  const { toast } = useToast()
  const utils = trpc.useContext()
  const router = useRouter()
  const submitProposal = trpc.space.submitProposal.useMutation({
    onMutate: async (values) => {
      await utils.space.published.cancel({ id })
    },
    onSuccess: () => {
      toast({
        description: "Proposal submitted",
      })
      router.push(`/spaces/${id}/apply-complete`)
    },
    onSettled: () => {
      void utils.space.published.invalidate({ id })
    },
  })
  const [files, setFiles] = useState<File[]>([])
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  })
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
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (files.length === 0) {
      toast({
        description: "Please upload at least one file",
      })
      return
    } else {
      const filesToUpload = await startUpload(files)
      if (!filesToUpload?.length) {
        toast({
          variant: "destructive",
          description: "Error occurred while uploading your documents",
        })
        return
      }
      await submitProposal.mutateAsync({
        spaceId: id,
        docs: filesToUpload,
        letter: data.letter,
        startDate: data.date.toString(),
        term: data.term,
      })
    }
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
          <Uploader
            fileTypes={
              permittedFileInfo?.config
                ? Object.keys(permittedFileInfo?.config)
                : []
            }
            files={files}
            setFiles={setFiles}
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
          <LoaderButton
            disabled={isUploading || submitProposal.isLoading}
            type="submit"
            pending={isUploading || submitProposal.isLoading}
            icon="ArrowRight"
          >
            {submitProposal.isLoading
              ? "Saving..."
              : isUploading
              ? "Uploading..."
              : "Submit"}
          </LoaderButton>
          {/* <Button type="submit">Submit</Button> */}
        </form>
      </Form>
    </div>
  )
}

export default Apply
