import { z } from 'zod'

export const newPassSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    path: ['confirmPassword'],
    message: 'matchPassword',
  })

export type TNewPassSchema = z.infer<typeof newPassSchema>
