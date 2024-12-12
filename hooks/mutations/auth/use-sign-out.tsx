import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ActionResponse } from '~/types/action-response'
import { useRouter } from 'expo-router'

function useSignOut() {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: async (): Promise<ActionResponse> => {
      await AsyncStorage.removeItem('accessToken')
      await AsyncStorage.removeItem('refreshToken')

      queryClient.invalidateQueries({
        queryKey: ['token'],
      })

      router.push('/sign-in')

      return {
        isSuccess: true,
      }
    },
  })
}

export default useSignOut
