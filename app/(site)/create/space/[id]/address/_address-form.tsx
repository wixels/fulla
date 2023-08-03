"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { forceDelay } from "@/lib/forceDelay"
import { useSpaceCreationStep } from "@/hooks/use-space-creation-step"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Title } from "@/components/ui/title"

import { updateSpaceWithParsedData } from "../../actions"
import { SpaceCreateFooter } from "../space-create-footer"

type Props = {
  id: string
  defaultValues: {
    city: string
    postalCode: string
    suburb: string
    unitNumber: string
    street: string
    province: string
  }
}

const provinces: string[] = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "Northern Cape",
  "North West",
  "Western Cape",
]

const FormSchema = z.object({
  city: z.string().min(1, { message: "This field is required" }),
  postalCode: z.string().min(1, { message: "This field is required" }),
  suburb: z.string(),
  unitNumber: z.string().min(1, { message: "This field is required" }),
  street: z.string().min(1, { message: "This field is required" }),
  province: z.string().min(1, { message: "This field is required" }),
})
export const AddressForm: React.FC<Props> = ({ defaultValues, id }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
    mode: "onSubmit",
  })
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const { step } = useSpaceCreationStep()

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (
      data.city !== defaultValues.city ||
      data.postalCode !== defaultValues.postalCode ||
      data.suburb !== defaultValues.suburb ||
      data.unitNumber !== defaultValues.unitNumber ||
      data.street !== defaultValues.street ||
      data.province !== defaultValues.province
    ) {
      startTransition(async () => {
        await forceDelay(updateSpaceWithParsedData({ data, id }), 500)
      })
    }
    router.push("." + step.nextPath)
  }

  return (
    <Form {...form}>
      <form
        className="mt-8 flex flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Province/ Region</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger sizing={"xl"}>
                    <SelectValue placeholder="Province" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {provinces.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-4">
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    sizing={"xl"}
                    className="rounded-b-none"
                    placeholder="Street Address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unitNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    sizing={"xl"}
                    className="rounded-none border-t-0"
                    placeholder="Apt, suite, bldg, etc. (if applicable)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="suburb"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    sizing={"xl"}
                    className="rounded-none border-t-0"
                    placeholder="Suburb (if applicable)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    sizing={"xl"}
                    className="rounded-none border-t-0"
                    placeholder="City/village"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    sizing={"xl"}
                    className="rounded-t-none border-t-0"
                    placeholder="Postal Code"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <SpaceCreateFooter pending={pending} />
      </form>
    </Form>
  )
}
