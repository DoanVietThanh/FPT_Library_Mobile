import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { http } from '~/lib/http'

export type TGetUserPendingActivity = {
  totalRequesting: number
  totalBorrowing: number
  totalAssignedReserving: number
  totalPendingReserving: number
  totalBorrowOnce: number
  remainTotal: number
  isAtLimit: boolean
}

function useUserPendingActivity() {
  const { accessToken } = useAuth()

  return useQuery({
    queryKey: ['/user-pending-activity', accessToken],
    queryFn: async () => {
      try {
        if (!accessToken) return 0

        const res = await http.get<TGetUserPendingActivity>(
          `/api/users/borrows/records/user-pending-activity`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )

        return res.data
      } catch {
        return 0
      }
    },
    placeholderData: keepPreviousData,
  })
}

export default useUserPendingActivity
