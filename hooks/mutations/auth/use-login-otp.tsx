import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { handleHttpError, http } from '~/lib/http'
import { TLoginByOtpSchema } from '~/lib/validations/auth/login-otp'
import { ActionResponse } from '~/types/action-response'
import { useTranslation } from 'react-i18next'

type TLoginByOtpData = {
  accessToken: string
  refreshToken: string
}

function useLoginOtp() {
  const {
    i18n: { language: lang },
  } = useTranslation()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: TLoginByOtpSchema): Promise<ActionResponse<TLoginByOtpData>> => {
      try {
        const { data } = await http.post<TLoginByOtpData>('/api/auth/sign-in/otp-method', body, {
          lang,
        })

        await AsyncStorage.setItem('accessToken', data.accessToken)
        await AsyncStorage.setItem('refreshToken', data.refreshToken)

        queryClient.invalidateQueries({
          queryKey: ['who-am-i'],
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

export default useLoginOtp
