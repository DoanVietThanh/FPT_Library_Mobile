import { useQuery } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { http } from '~/lib/http'
import { LibraryItem } from '~/types/models'

type TData = {
  alreadyRequestedItems: LibraryItem[] | []
  alreadyBorrowedItems: LibraryItem[] | []
  alreadyReservedItems: LibraryItem[] | []
  allowToReserveItems: LibraryItem[] | []
  allowToBorrowItems: LibraryItem[] | []
}

function useCheckAvailableBorrowRequest(libraryItemIds: number[]) {
  const { accessToken } = useAuth()
  return useQuery({
    queryKey: [`check-available-borrow-request`, libraryItemIds, accessToken],
    queryFn: async (): Promise<TData | null> => {
      try {
        const { data } = await http.get<TData | null>(`/api/library-items/unavailable`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          searchParams: {
            ids: libraryItemIds,
          },
        })
        return data
      } catch {
        return null
      }
    },
  })
}

export default useCheckAvailableBorrowRequest
