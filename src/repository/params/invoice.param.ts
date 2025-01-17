import { z } from "zod";
import { CreateProductSchema, EditProductSchema } from "./product.param";
import { ImageSchema } from "../models/invoice.model";

export const CreateInvoiceSchema = z.object({
    bill_from: z.string().min(2, "at least 2 words required"),
    number: z.string().min(3, "at least 3 numbers required"),
    due_date: z.string().optional().nullable().transform((value) => (value === "default" ? undefined : value)),
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
    products: z.array(CreateProductSchema).nonempty("At least one product is required"),
    note: z.string().optional().nullable(),
    terms: z.string().optional().nullable(),
    bank: z.string().optional().nullable(),
    amount: z.number().optional(),
    logo: ImageSchema,
    status: z.string().optional(),
    currency: z.string().optional(),
});
export type CreateInvoiceParams = z.infer<typeof CreateInvoiceSchema>

export const GetInvoiceListParamSchema = z.object({
    page: z.number().optional(),
    pageSize: z.number().optional()
})
export type GetInvoiceListParam = z.infer<typeof GetInvoiceListParamSchema>
export const GetInvoiceIdSchema = z.object({
    id: z.number()
})
export type GetInvoiceByIdParam = z.infer<typeof GetInvoiceIdSchema>


export const EditInvoiceSchema = z.object({
    id: z.number(),
    bill_from: z.string().min(2, "at least 2 words required"),
    number: z.string().min(3, "at least 3 numbers required"),
    due_date: z.string().optional().nullable().transform((value) => (value === "default" ? undefined : value)),
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
    products: z.array(EditProductSchema).nonempty("At least one product is required"),
    note: z.string().optional().nullable(),
    terms: z.string().optional().nullable(),
    bank: z.string().optional().nullable(),
    amount: z.number().optional(),
    logo: ImageSchema,
    status: z.string().optional(),
    currency: z.string().optional(),
});

export type EditInvoiceByIdParam = z.infer<typeof EditInvoiceSchema>
