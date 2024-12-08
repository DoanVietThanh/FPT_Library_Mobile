import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('email'),
})

export type TLoginSchema = z.infer<typeof loginSchema>
