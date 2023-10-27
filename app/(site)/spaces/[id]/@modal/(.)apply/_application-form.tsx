"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Balancer from "react-wrap-balancer"
import * as z from "zod"

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
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Title } from "@/components/ui/title"

type Props = {}
const FormSchema = z.object({
  rate: z.string(),
  letter: z.string(),
})

export const ApplicationForm: React.FC<Props> = ({}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      rate: "",
      fee: 500,
    },
  })
  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }
  return (
    <div>
      <Separator className="my-6" />
      <Title level={6} className="font-semibold">
        Proposal Terms
      </Title>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Rate</FormLabel>
                <FormControl>
                  <Input placeholder="20,000" {...field} />
                </FormControl>
                <FormDescription>
                  Total amount the landlord will see on your proposal
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="my-6" />
          <Title level={6} className="font-semibold">
            Cover Letter
          </Title>
          <FormField
            control={form.control}
            name="letter"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    rows={10}
                    placeholder="Demonstrate Your Fit for This Space 🏡"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <Separator className="my-6" /> */}
          {/* <FormField
            control={form.control}
            name="fee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Fee</FormLabel>
                <FormControl>
                  <Input type="number" disabled {...field} />
                </FormControl>
                <FormDescription>
                  <Balancer>
                    This fee is set based on the ammenities your space provides
                  </Balancer>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="my-6" /> */}
        </form>
      </Form>
    </div>
  )
}
