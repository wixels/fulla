import * as z from "zod"

export const addressFormSchema = z.object({
  province: z.string({
    required_error: "required",
  }),
  street: z.string({
    required_error: "required",
  }),
  unitNumber: z.string().optional(),
  suburb: z.string().optional(),
  city: z.string({
    required_error: "required",
  }),
  postalCode: z.string({
    required_error: "required",
  }),
})
