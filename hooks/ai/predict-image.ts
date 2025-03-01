import { useMutation } from '@tanstack/react-query'
import { handleHttpError } from '~/lib/http'
import { ActionResponse } from '~/types/action-response'
import { PredictResult } from '~/types/models'
import axios from 'axios'

export function usePredictImage() {
  return useMutation({
    mutationFn: async (
      formData: FormData,
    ): Promise<ActionResponse<{ message: string; data: PredictResult }>> => {
      try {
        const { resultCode, data, message } = await axios
          .post(`${process.env.EXPO_PUBLIC_API_ENDPOINT}/api/library-items/ai/predict`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => res.data)

        console.log({ resultCode, data, message })

        return {
          isSuccess: true,
          data: {
            message,
            data,
          },
        }
      } catch (error) {
        console.log('🚀 ~ usePredictImage ~ error:', error)
        return handleHttpError(error)
      }
    },
  })
}
