import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { handleHttpError, http } from '~/lib/http'
import { ActionResponse } from '~/types/action-response'

type TValidateMfaResponse = {
  accessToken: string
  refreshToken: string
}

type TValidateMfa = {
  email: string
  otp: string
}

function useValidateMfa() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: TValidateMfa): Promise<ActionResponse<TValidateMfaResponse>> => {
      try {
        const { data } = await http.post<TValidateMfaResponse>('/api/auth/validate-mfa', body)

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

export default useValidateMfa
