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
      body: TLoginByPasswordSchema,
    ): Promise<ActionResponse<TLoginByPasswordData>> => {
      try {
        const { data } = await http.post<TLoginByPasswordData>(
          '/api/auth/sign-in/password-method',
          body,
        )

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
