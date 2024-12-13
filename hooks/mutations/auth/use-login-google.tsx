import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { handleHttpError, http } from '~/lib/http'
import { ActionResponse } from '~/types/action-response'

type TLoginGoogleData = {
  accessToken: string
  refreshToken: string
}

function useLoginGoogle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (code: string): Promise<ActionResponse> => {
      try {
        const { data } = await http.post<TLoginGoogleData>('/api/auth/sign-in-google', {
          code,
        })

        await AsyncStorage.setItem('accessToken', data.accessToken)
        await AsyncStorage.setItem('refreshToken', data.refreshToken)

        queryClient.invalidateQueries({
          queryKey: ['token'],
        })

        return {
          isSuccess: true,
        }
      } catch (error) {
        return handleHttpError(error)
      }
    },
  })
}

export default useLoginGoogle
