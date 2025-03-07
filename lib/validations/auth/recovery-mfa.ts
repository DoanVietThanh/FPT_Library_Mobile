import { z } from 'zod'

export const recoveryMfaSchema = z.object({
  backupCode: z.string().trim().trim(),
})

export type TRecoveryMfaSchema = z.infer<typeof recoveryMfaSchema>
