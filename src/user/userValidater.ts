import{ z } from 'zod'

export const createUserSchema = z.object({
    name: z.string().min(1, 'Name is require'),
     email: z.email({ message: "Invalid email" }),
    password: z.string().min(4,"password must be at least 4 characters"),

})