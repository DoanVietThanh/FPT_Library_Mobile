import { z } from 'zod'

export const registerSchema = z
  .object({
    email: z.string().email('email'),
    password: z.string(),
    confirmPassword: z.string(),
    firstName: z.string(),
    lastName: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    path: ['confirmPassword'],
    message: 'matchPassword',
  })

export type TRegisterSchema = z.infer<typeof registerSchema>
