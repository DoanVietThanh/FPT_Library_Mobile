import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { handleHttpError, http } from '~/lib/http'
import { TLoginByPasswordSchema } from '~/lib/validations/auth/login-password'
import { ActionResponse } from '~/types/action-response'

type TLoginByPasswordData = {
  accessToken: string
  refreshToken: string
}

function useLoginPassword() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (
      body: TLoginByPasswordSchema & { type: 'user' | 'employee' | 'admin' },
    ): Promise<ActionResponse<TLoginByPasswordData>> => {
      let url = ''

      if (body.type === 'user') {
        url = `/api/auth/sign-in/password-method`
      } else {
        url = `/api/auth${body.type === 'employee' ? '/employee' : '/admin'}/sign-in`
      }

      try {
        const { data } = await http.post<TLoginByPasswordData>(url, body)

        await AsyncStorage.setItem('accessToken', data.accessToken)
        await AsyncStorage.setItem('refreshToken', data.refreshToken)

        queryClient.invalidateQueries({
          queryKey: ['token'],
        })

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

export default useLoginPassword
