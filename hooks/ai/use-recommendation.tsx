import { useQuery } from '@tanstack/react-query'
import { handleHttpError } from '~/lib/http'
import { ActionResponse } from '~/types/action-response'
import { LibraryItemsRecommendation } from '~/types/models'
import axios from 'axios'

export function useLibraryItemRecommendation(libraryItemId: string) {
  return useQuery({
    queryKey: ['ocr-recommendation', libraryItemId],
    queryFn: async (): Promise<ActionResponse<LibraryItemsRecommendation[]>> => {
      try {
        const { data } = await axios
          .post(
            `${process.env.EXPO_PUBLIC_API_ENDPOINT}/api/library-items/ai/recommendation/${libraryItemId}`,
          )
          .then((res) => res.data)
          .catch((error) => {
            console.log('🚀 ~ queryFn: ~ error:', error)
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
