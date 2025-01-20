import { z } from "zod";

export const ProductSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Item is required"),
    rate: z.number().min(1),

    quantity: z.number().min(1),


})
export type ProductModel = z.infer<typeof ProductSchema>