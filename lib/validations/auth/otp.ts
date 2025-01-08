import { z } from 'zod'

export const otpSchema = z.object({
  pin: z.array(z.string().trim()).refine((value) => {
    let count = 0
    value.forEach((i) => {
      if (i !== '') count++
    })
    return count === 6
  }, 'length6'),
})

export type TOtpSchema = z.infer<typeof otpSchema>
