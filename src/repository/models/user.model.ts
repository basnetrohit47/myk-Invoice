import { z } from 'zod';

export const LoginSchema = z.object({
    access: z.string().min(1),
    usernam: z.string().min(1),
});
export type LoginModel = z.infer<typeof LoginSchema>

export const Profilechema = z.object({
    email: z.string(),
    username: z.string(),
    last_name: z.string().min(3, 'atleast 2 words required'),
    first_name: z.string().min(3, 'atleast 2 words required'),
    city: z.string().optional(),
    country: z.string().optional(),
    address: z.string().optional(),
    currency: z.string().optional().nullable()

});
export type ProfileModel = z.infer<typeof Profilechema>;





