import { useMutation } from '@tanstack/react-query'
import { handleHttpError, http } from '~/lib/http'
import { ActionResponse } from '~/types/action-response'
import { useTranslation } from 'react-i18next'

function useResendOtp() {
  const {
    i18n: { language: lang },
  } = useTranslation()

  return useMutation({
    mutationFn: async (email: string): Promise<ActionResponse<string>> => {
      try {
        const { message } = await http.post(
          '/api/auth/resend-otp',
          { email },
          {
            lang,
          },
        )

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
