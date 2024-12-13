import { useMutation } from '@tanstack/react-query'
import { handleHttpError, http } from '~/lib/http'
import { ActionResponse } from '~/types/action-response'

function useResendOtp() {
  return useMutation({
    mutationFn: async (email: string): Promise<ActionResponse<string>> => {
      try {
        const { message } = await http.post('/api/auth/resend-otp', { email })

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

export default useResendOtp
