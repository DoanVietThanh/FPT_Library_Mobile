import { useQuery } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { http } from '~/lib/http'
import { TSearchLibraryItemSchema } from '~/lib/validations/library-items/search-library-items'
import { ReviewsLibraryItem } from '~/types/models'

export type TGetReviewsLibraryItemsData = {
  sources: ReviewsLibraryItem[]
  pageIndex: number
  pageSize: number
  totalPage: number
  totalActualItem: number
}

function useGetReviewsLibraryItem(libraryItemId: string, searchParams: TSearchLibraryItemSchema) {
  const { accessToken } = useAuth()
  return useQuery({
    queryKey: [`library-items/${libraryItemId}/reviews`, accessToken],
    queryFn: async (): Promise<TGetReviewsLibraryItemsData> => {
      try {
        const { data } = await http.get<TGetReviewsLibraryItemsData>(
          `/api/library-items/${libraryItemId}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            searchParams,
          },
        )
        return data
      } catch {
        return {
          sources: [],
          pageIndex: 0,
          pageSize: 0,
          totalPage: 0,
          totalActualItem: 0,
        }
      }
    },
  })
}

export default useGetReviewsLibraryItem
