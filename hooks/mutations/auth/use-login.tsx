import { useMutation } from '@tanstack/react-query'
import { handleHttpError, http } from '~/lib/http'
import { TLoginSchema } from '~/lib/validations/auth/login'
import { ActionResponse } from '~/types/action-response'

function useLogin() {
  return useMutation({
    mutationFn: async (body: TLoginSchema): Promise<ActionResponse<string>> => {
      try {
        const { resultCode } = await http.post('/api/auth/sign-in', body)

        return {
          isSuccess: true,
          data: resultCode,
        }
      } catch (error) {
        const resError = handleHttpError(error)

        if (resError.typeError === 'warning' && resError.resultCode === 'Auth.Warning0008') {
          await http.post('/api/auth/resend-otp', { email: body.email })
        }

        return resError
      }
    },
  })
}

export default useLogin
