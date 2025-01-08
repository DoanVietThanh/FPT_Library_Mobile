import { z } from 'zod'

export const registerSchema = z
  .object({
    email: z.string().trim().email('email').toLowerCase(),
    password: z.string().trim(),
    confirmPassword: z.string().trim(),
    firstName: z.string().trim(),
    lastName: z.string().trim(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    path: ['confirmPassword'],
    message: 'matchPassword',
  })

export type TRegisterSchema = z.infer<typeof registerSchema>
