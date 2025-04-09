import { useQuery } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { http } from '~/lib/http'
import { BorrowRequest, BorrowRequestResource } from '~/types/models'

export type BorrowRequestDetail = BorrowRequest & {
  isExistPendingResources: boolean
  borrowRequestResources: BorrowRequestResource[]
}
function useBorrowRequestPatron(borrowRequestId: number) {
  const { accessToken } = useAuth()
  return useQuery({
    queryKey: [`/borrows/requests/${borrowRequestId}`, accessToken],
    queryFn: async () => {
      try {
        const { data } = await http.get<BorrowRequestDetail | null>(
          `/api/users/borrows/requests/${borrowRequestId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        return data
      } catch {
        return null
      }
    },
  })
}

export default useBorrowRequestPatron
