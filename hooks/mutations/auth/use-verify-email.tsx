import { useMutation } from '@tanstack/react-query'
import { handleHttpError, http } from '~/lib/http'
import { ActionResponse } from '~/types/action-response'

type TVerifyEmail = {
  email: string
  emailVerificationCode: string
}

function useVerifyEmail() {
  return useMutation({
    mutationFn: async (body: TVerifyEmail): Promise<ActionResponse<string>> => {
      try {
        const { message } = await http.patch('/api/auth/sign-up/confirm', body)

        return {
          isSuccess: true,
          data: message,
        }
      } catch (error) {
        return handleHttpError(error)
      }
    },
  })
}

export default useVerifyEmail
