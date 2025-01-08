import { z } from 'zod'

export const newPassSchema = z
  .object({
    password: z.string().trim(),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    path: ['confirmPassword'],
    message: 'matchPassword',
  })

export type TNewPassSchema = z.infer<typeof newPassSchema>
