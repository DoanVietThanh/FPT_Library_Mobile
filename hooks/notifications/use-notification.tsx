import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { http } from '~/lib/http'
import { Notification } from '~/types/models'

function useNotification(notificationId: number) {
  const { accessToken } = useAuth()
  return useQuery({
    queryKey: ['notifications', notificationId, accessToken],
    queryFn: async () => {
      try {
        return await http
          .get<Notification>(`/api/privacy/notifications/${notificationId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => res.data)
      } catch {
        return null
      }
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  })
}

export default useNotification
