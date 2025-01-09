import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { http } from '~/lib/http'
import { Notification } from '~/types/models'

const PAGE_SIZE = 30

export type ApiNotificationsResponse = {
  sources: Notification[]
  pageIndex: number
  pageSize: number
  totalPage: number
}

export const fetchNotifications = async (page: number, token: string | null) => {
  try {
    if (!token) return []
    const { data } = await http.get<ApiNotificationsResponse>(
      `/api/privacy/notifications?PageIndex=${page}&PageSize=${PAGE_SIZE}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return data.sources
  } catch {
    return []
  }
}

function useInfiniteNotifications() {
  const { accessToken } = useAuth()

  return useInfiniteQuery({
    queryKey: ['infinite-notifications', accessToken],
    queryFn: ({ pageParam }) => fetchNotifications(pageParam, accessToken),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === PAGE_SIZE ? allPages.length + 1 : undefined
    },
    placeholderData: keepPreviousData,
  })
}

export default useInfiniteNotifications
