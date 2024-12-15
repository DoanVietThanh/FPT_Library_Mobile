import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { handleHttpError, http } from '~/lib/http'
import { TLoginByOtpSchema } from '~/lib/validations/auth/login-otp'
import { ActionResponse } from '~/types/action-response'

type TLoginByOtpData = {
  accessToken: string
  refreshToken: string
}

function useLoginOtp() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: TLoginByOtpSchema): Promise<ActionResponse<TLoginByOtpData>> => {
      try {
        const { data } = await http.post<TLoginByOtpData>('/api/auth/sign-in/otp-method', body)

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

export default useLoginOtp
