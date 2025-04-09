import { useQuery } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { http } from '~/lib/http'
import { BorrowRequest, LibraryCard } from '~/types/models'
import { Pagination } from '~/types/pagination'

export type BorrowRequests = (BorrowRequest & {
  libraryCard: LibraryCard
})[]

function useBorrowRequestsPatron() {
  const { accessToken } = useAuth()
  return useQuery({
    queryKey: [`/api/users/borrows/requests`, accessToken],
    queryFn: async (): Promise<Pagination<BorrowRequests>> => {
      try {
        const { data } = await http.get<Pagination<BorrowRequests>>(`/api/users/borrows/requests`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        return (
          data || {
            sources: [],
            pageIndex: 0,
            pageSize: 0,
            totalActualItem: 0,
            totalPage: 0,
          }
        )
      } catch {
        return {
          sources: [],
          pageIndex: 0,
          pageSize: 0,
          totalActualItem: 0,
          totalPage: 0,
        }
      }
    },
  })
}

export default useBorrowRequestsPatron
