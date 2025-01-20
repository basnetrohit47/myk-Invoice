import { z } from "zod";

export const CreateProductSchema = z.object({
    name: z.string().min(2, "Item is required"),
    rate: z.union([z.string(), z.number()]).transform((value) => {
        if (value === null || value === "") return null; // Handle nullable or empty cases

        // Convert value to a number if it's a string
        const num = typeof value === "string" ? Number(value) : value;

        // Validate the number
        if (isNaN(num)) {
            throw new Error("Invalid number format");
        }
        return num;
    }),
    quantity: z.union([z.string(), z.number()]).transform((value) => {
        if (value === null || value === "") return null; // Handle nullable or empty cases

        // Convert value to a number if it's a string
        const num = typeof value === "string" ? Number(value) : value;

        // Validate the number
        if (isNaN(num)) {
            throw new Error("Invalid number format");
        }
        return num;
    }),



})

export const EditProductSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(2, "Item is required"),
    rate: z.union([z.string(), z.number()]).transform((value) => {
        if (value === null || value === "") return null; // Handle nullable or empty cases

        // Convert value to a number if it's a string
        const num = typeof value === "string" ? Number(value) : value;

        // Validate the number
        if (isNaN(num)) {
            throw new Error("Invalid number format");
        }
        return num;
    }),
    quantity: z.union([z.string(), z.number()]).transform((value) => {
        if (value === null || value === "") return null; // Handle nullable or empty cases

        // Convert value to a number if it's a string
        const num = typeof value === "string" ? Number(value) : value;

        // Validate the number
        if (isNaN(num)) {
            throw new Error("Invalid number format");
        }
        return num;
    }),


})

export type CreateProductModel = z.infer<typeof CreateProductSchema>