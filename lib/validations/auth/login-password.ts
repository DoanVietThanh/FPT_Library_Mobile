import { z } from 'zod'

export const loginByPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email('email')
    .toLowerCase()
    .min(2, { message: 'min2' })
    .max(50, { message: 'max50' }),
  password: z.string().trim().min(6, { message: 'min6' }),
})

export type TLoginByPasswordSchema = z.infer<typeof loginByPasswordSchema>
