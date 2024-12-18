import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { handleHttpError, http } from '~/lib/http'
import { ActionResponse } from '~/types/action-response'

type TConfirmNewBackupCodes = {
  otp: string
  token: string
}

function useConfirmNewBackupCodes() {
  const { accessToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: TConfirmNewBackupCodes): Promise<ActionResponse<string>> => {
      try {
        const { message } = await http.post('/api/auth/regenerate-mfa-backup/confirm', body, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        queryClient.invalidateQueries({
          queryKey: ['backup-codes', accessToken],
        })

        return {
          isSuccess: true,
          data: message,
        }
      } catch (error) {
        console.log({ error })

        return handleHttpError(error)
      }
    },
  })
}

export default useConfirmNewBackupCodes
