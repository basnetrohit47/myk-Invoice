import { z } from "zod";
import { ProductSchema } from "./product.models";

export const TaxSchema = z.object({
  amount: z.string().optional(),
  sign: z.string().default('%'),
})

export const ImageSchema = z.instanceof(File).refine((file) => file.type.startsWith('image/'), 'only image file are allowd').optional().nullable()

export const InvoiceSchema = z.object({
  id: z.number(),
  bill_from: z.string().min(2, "at least 1 words required"),
  number: z.string().min(1, "at least 3 numbers required"),
  due_date: z.string().nullable().optional(),
  payment_date: z.string().optional().nullable(),
  issue_date: z.string(),
  bill_to: z.string(),
  shipping_to: z.string().optional().nullable(),
  tax_sign: z.enum(["amount", "percent"]).optional().nullable(),
  tax: z.number().nullable().optional(),
  discount: z.number().optional().nullable(),
  discount_sign: z.enum(["amount", "percent"]).optional().nullable(),
  shipping_cost: z.number().optional().nullable(),
  paid_amount: z.number().optional().nullable(),
  products: z
    .array(ProductSchema)
    .nonempty("At least one product is required"),
  note: z.string().optional().nullable(),
  terms: z.string().optional().nullable(),
  bank: z.string().optional().nullable(),
  amount: z.number().optional(),
  logo: ImageSchema,
  status: z.string().optional(),
  currency: z.string().optional(),
});

export type InvoiceModel = z.infer<typeof InvoiceSchema>

export const InvoiceListSchema = InvoiceSchema.array();

export type InvoiceListModel = z.infer<typeof InvoiceListSchema>

export const InvoiceListResponseSchema = z.object({
  count: z.number().nullable(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: InvoiceListSchema
})

export type InvoiceListResponseModel = z.infer<typeof InvoiceListResponseSchema>

export const InvoiceRowSchema = z.object({
  id: z.number(),
  bill_from: z.string().min(2, "at least 1 words required"),
  number: z.string().min(1, "at least 3 numbers required"),
  due_date: z.string().nullable().optional(),
  payment_date: z.string().optional().nullable(),
  issue_date: z.string(),
  bill_to: z.string(),
  shipping_to: z.string().optional().nullable(),
  tax_sign: z.enum(["amount", "percent"]).optional().nullable(),
  tax: z.number().nullable().optional(),
  discount: z.number().optional().nullable(),
  discount_sign: z.enum(["amount", "percent"]).optional().nullable(),
  shipping_cost: z.number().optional().nullable(),
  paid_amount: z.number().optional().nullable(),
  note: z.string().optional().nullable(),
  terms: z.string().optional().nullable(),
  bank: z.string().optional().nullable(),
  amount: z.number().optional(),
  logo: ImageSchema,
  status: z.string().optional(),
  currency: z.string().optional(),

});
export type InvoiceRow = z.infer<typeof InvoiceRowSchema>;

export const InvoiceStatSchema = z.object({
  count: z.number(),
  amount: z.number()
});

export const InvoiceStatResponseSchema = z.object({
  total_invoice: InvoiceStatSchema,
  total_unpaid_invoice: InvoiceStatSchema,
  total_paid_invoice: InvoiceStatSchema,
  total_ongoing_invoice: InvoiceStatSchema

})
export type InvoiceStatResponse = z.infer<typeof InvoiceStatResponseSchema>






