import { z } from "zod";

export const numberTransform = z
    .union([z.string(), z.number()])
    .transform((value) => {
        if (value === null || value === "") return null; // Handle nullable or empty cases

        // Convert value to a number if it's a string
        return typeof value === "string" ? Number(value) : value;
    })
    .refine((num) => num === null || !isNaN(num), {
        message: "Invalid number format",
    });