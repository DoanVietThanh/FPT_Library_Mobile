import { useMutation } from '@tanstack/react-query'
import { handleHttpError, http } from '~/lib/http'
import { TRegisterSchema } from '~/lib/validations/auth/register'
import { ActionResponse } from '~/types/action-response'
import { useTranslation } from 'react-i18next'

function useRegister() {
  const {
    i18n: { language: lang },
  } = useTranslation()

  return useMutation({
    mutationFn: async (body: TRegisterSchema): Promise<ActionResponse> => {
      try {
        console.log(process.env.EXPO_PUBLIC_API_ENDPOINT)

        await http.post('/api/auth/sign-up', body, { lang })

        return {
          isSuccess: true,
        }
      } catch (error) {
        console.log(error)

        return handleHttpError(error)
      }
    },
  })
}

export default useRegister
