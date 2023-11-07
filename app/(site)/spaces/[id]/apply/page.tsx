"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CircleDot } from "lucide-react"
import { useForm } from "react-hook-form"
import Balancer from "react-wrap-balancer"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Paragraph } from "@/components/ui/paragraph"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Title } from "@/components/ui/title"
import { gridVariants } from "@/components/grid"
import { Icons } from "@/components/icons"

type Props = {}
const FormSchema = z.object({
  term: z.enum(["long", "mid", "short"], {
    required_error: "Please select a leasing term",
  }),
})
const Apply: React.FC<Props> = ({}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    <FormItem className="col-span-4 bg-red-200">
                      <FormControl>
                        <RadioGroupItem value="long" />
                      </FormControl>
                      <FormLabel className="flex aspect-square cursor-pointer flex-col justify-between gap-2 rounded-lg border bg-background p-4 transition-all hover:border-zinc-600 hover:shadow peer-checked:border-blue-600 peer-checked:text-blue-600">
                        <CircleDot />
                        <div>
                          <Paragraph size="sm">Long</Paragraph>
                          <Paragraph
                            className="text-muted-foreground/50"
                            size="xs"
                          >
                            {"more than a year"}
                          </Paragraph>
                        </div>
                      </FormLabel>
                      {/* <FormControl>
                        <RadioGroupItem value="long" className="peer hidden" />
                      </FormControl>
                      <FormLabel className="rounded-lg border p-6 hover:border-zinc-600 hover:shadow peer-aria-checked:border-blue-500 peer-aria-checked:ring-1 peer-aria-checked:ring-blue-500">
                        <span className="peer-aria-checked:border-red-500">
                          Label
                        </span>
                      </FormLabel> */}
                    </FormItem>
                    <FormItem className="col-span-4">
                      <FormControl>
                        <RadioGroupItem value="mid" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Mid term rental
                      </FormLabel>
                    </FormItem>
                    <FormItem className="col-span-4">
                      <FormControl>
                        <RadioGroupItem value="short" />
                      </FormControl>
                      <FormLabel className="font-normal">Short</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      {/* <Form>x</Form> */}
    </div>
  )
}

export default Apply
