import { useQuery } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { http } from '~/lib/http'
import { TSearchLibraryItemSchema } from '~/lib/validations/library-items/search-library-items'
import { LibraryItem } from '~/types/models'

export type TGetLibraryItemsByCategoryData = {
  sources: LibraryItem[]
  pageIndex: number
  pageSize: number
  totalPage: number
  totalActualItem: number
}

function useGetLibraryItemByCategory(categoryId: number, searchParams: TSearchLibraryItemSchema) {
  const { accessToken } = useAuth()
  return useQuery({
    queryKey: [`library-items/category/${categoryId}`, accessToken],
    queryFn: async (): Promise<TGetLibraryItemsByCategoryData> => {
      try {
        const { data } = await http.get<TGetLibraryItemsByCategoryData>(
          `/api/library-items/category/${categoryId}`,
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

export default useGetLibraryItemByCategory
