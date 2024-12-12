import { useMutation } from '@tanstack/react-query'
import { handleHttpError, http } from '~/lib/http'
import { ActionResponse } from '~/types/action-response'
import { useTranslation } from 'react-i18next'

type TVerifyEmail = {
  email: string
  emailVerificationCode: string
}

function useVerifyEmail() {
  const {
    i18n: { language: lang },
  } = useTranslation()

  return useMutation({
    mutationFn: async (body: TVerifyEmail): Promise<ActionResponse<string>> => {
      try {
        const { message } = await http.patch('/api/auth/sign-up/confirm', body, { lang })

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
