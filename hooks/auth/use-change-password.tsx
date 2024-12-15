import { useMutation } from '@tanstack/react-query'
import { handleHttpError, http } from '~/lib/http'
import { ActionResponse } from '~/types/action-response'

type TChangePassword = {
  email: string
  password: string
  token: string
}

function useChangePassword() {
  return useMutation({
    mutationFn: async (body: TChangePassword): Promise<ActionResponse<string>> => {
      try {
        const { message } = await http.patch('/api/auth/change-password', body)

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

export default useChangePassword
