import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { handleHttpError, http } from '~/lib/http'
import { ActionResponse } from '~/types/action-response'

type TValidateBackupCode = {
  email: string
  backupCode: string
}

type TValidateBackupCodeResponse = {
  accessToken: string
  refreshToken: string
}

function useValidateBackupCode() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (
      body: TValidateBackupCode,
    ): Promise<ActionResponse<TValidateBackupCodeResponse>> => {
      try {
        const { data } = await http.post<TValidateBackupCodeResponse>(
          '/api/auth/validate-mfa-backup',
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

export default useValidateBackupCode
