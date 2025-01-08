import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().trim().email('email').toLowerCase(),
})

export type TLoginSchema = z.infer<typeof loginSchema>
