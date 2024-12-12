import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { handleHttpError, http } from '~/lib/http'
import { ActionResponse } from '~/types/action-response'
import { useTranslation } from 'react-i18next'

type TLoginGoogleData = {
  accessToken: string
  refreshToken: string
}

function useLoginGoogle() {
  const {
    i18n: { language: lang },
  } = useTranslation()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (code: string): Promise<ActionResponse> => {
      try {
        const { data } = await http.post<TLoginGoogleData>(
          '/api/auth/sign-in-google',
          {
            code,
          },
          { lang },
        )

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
