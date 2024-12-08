import { useMutation } from '@tanstack/react-query'
import { handleHttpError, http } from '~/lib/http'
import { TLoginSchema } from '~/lib/validations/auth/login'
import { ActionResponse } from '~/types/action-response'
import { useTranslation } from 'react-i18next'

function useLogin() {
  const {
    i18n: { language: lang },
  } = useTranslation()

  return useMutation({
    mutationFn: async (body: TLoginSchema): Promise<ActionResponse<string>> => {
      try {
        const { resultCode } = await http.post('/api/auth/sign-in', body, { lang })

        return {
          isSuccess: true,
          data: resultCode,
        }
      } catch (error) {
        const resError = handleHttpError(error)

        if (resError.typeError === 'warning' && resError.resultCode === 'Auth.Warning0008') {
          await http.post(
            '/api/auth/resend-otp',
            { email: body.email },
            {
              lang,
            },
          )
        }

        return resError
      }
    },
  })
}

export default useLogin
