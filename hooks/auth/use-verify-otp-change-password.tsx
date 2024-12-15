import { useMutation } from '@tanstack/react-query'
import { handleHttpError, http } from '~/lib/http'
import { TLoginByOtpSchema } from '~/lib/validations/auth/login-otp'
import { ActionResponse } from '~/types/action-response'

function useVerifyOtpChangePassword() {
  return useMutation({
    mutationFn: async (body: TLoginByOtpSchema): Promise<ActionResponse<{ token: string }>> => {
      try {
        const { data } = await http.post<{ token: string }>(
          '/api/auth/change-password/verify-otp',
          body,
        )

        return {
          isSuccess: true,
          data,
        }
      } catch (error) {
        return handleHttpError(error)
      }
    },
  })
}

export default useVerifyOtpChangePassword
