import { z } from "zod";

export const LoginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(8, 'This password is too short. It must contain at least 8 characters'),
});

export type LoginParam = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
    email: z.string().email('Invalid email address'),
    first_name: z.string().min(2),
    last_name: z.string().min(2),
    password: z.string().min(3, 'This password is too short. It must contain at least 8 characters').refine(value => !/^\d+$/.test(value), { message: 'This password is entirely numeric.' }),
    password2: z.string()
}).refine((data) => data.password === data.password2, {
    message: 'Passwords do not match.',
    path: ['password2'],
});;

export type RegisterParams = z.infer<typeof RegisterSchema>;

export const EditProfileSchema = z.object({

    email: z.string().readonly(),
    username: z.string().readonly(),

    lastName: z.string().min(3, 'atleast 2 words required'),
    firstName: z.string().min(3, 'atleast 2 words required'),
    city: z.string().optional(),
    country: z.string().optional(),
    address: z.string().optional(),
    currency: z.string().optional().nullable()
})
export type EditProfileParam = z.infer<typeof EditProfileSchema>


