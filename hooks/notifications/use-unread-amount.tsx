import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { http } from '~/lib/http'

function useUnreadAmount() {
  const { accessToken } = useAuth()

  return useQuery({
    queryKey: ['unread-notifications-amount', accessToken],
    queryFn: async () => {
      try {
        if (!accessToken) return 0

        return await http
          .get<number>(`/api/privacy/unread-noti`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => res.data)
      } catch {
        return 0
      }
    },
    placeholderData: keepPreviousData,
  })
}

export default useUnreadAmount
