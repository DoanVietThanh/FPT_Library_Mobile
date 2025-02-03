import { useQuery } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { http } from '~/lib/http'
import { TSearchLibraryItemSchema } from '~/lib/validations/library-items/search-library-items'
import { LibraryItem } from '~/types/models'

export type TGetEditionsLibraryItemsData = {
  sources: LibraryItem[]
  pageIndex: number
  pageSize: number
  totalPage: number
  totalActualItem: number
}

function useGetEditionsLibraryItem(libraryItemId: string, searchParams: TSearchLibraryItemSchema) {
  const { accessToken } = useAuth()
  return useQuery({
    queryKey: [`library-items/${libraryItemId}/editions`, accessToken],
    queryFn: async (): Promise<TGetEditionsLibraryItemsData> => {
      try {
        const { data } = await http.get<TGetEditionsLibraryItemsData>(
          `/api/library-items/${libraryItemId}/editions`,
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

export default useGetEditionsLibraryItem
