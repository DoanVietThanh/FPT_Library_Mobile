import { useMutation } from '@tanstack/react-query'
import { handleHttpError, http } from '~/lib/http'
import { TRegisterSchema } from '~/lib/validations/auth/register'
import { ActionResponse } from '~/types/action-response'

function useRegister() {
  return useMutation({
    mutationFn: async (body: TRegisterSchema): Promise<ActionResponse> => {
      try {
        await http.post('/api/auth/sign-up', body)

        return {
          isSuccess: true,
        }
      } catch (error) {
        return handleHttpError(error)
      }
    },
  })
}

export default useRegister
