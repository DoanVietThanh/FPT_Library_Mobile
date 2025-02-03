import { useQuery } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { http } from '~/lib/http'
import { TSearchLibraryItemSchema } from '~/lib/validations/library-items/search-library-items'
import { LibraryItem } from '~/types/models'

export type TGetRelatedLibraryItemsData = {
  sources: LibraryItem[]
  pageIndex: number
  pageSize: number
  totalPage: number
  totalActualItem: number
}

function useGetRelatedLibraryItem(libraryItemId: string, searchParams: TSearchLibraryItemSchema) {
  const { accessToken } = useAuth()
  return useQuery({
    queryKey: [`library-items/${libraryItemId}/related-items`, accessToken],
    queryFn: async (): Promise<TGetRelatedLibraryItemsData> => {
      try {
        const { data } = await http.get<TGetRelatedLibraryItemsData>(
          `/api/library-items/${libraryItemId}/related-items`,
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

export default useGetRelatedLibraryItem
