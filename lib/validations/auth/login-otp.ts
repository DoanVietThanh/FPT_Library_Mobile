import { z } from 'zod'

export const loginByOtpSchema = z.object({
  email: z.string().email('email').min(2, { message: 'min2' }).max(50, { message: 'max50' }),
  otp: z.string(),
})

export type TLoginByOtpSchema = z.infer<typeof loginByOtpSchema>
