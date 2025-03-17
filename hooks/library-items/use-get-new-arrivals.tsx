import { useQuery } from '@tanstack/react-query'
import { http } from '~/lib/http'
import { LibraryItem } from '~/types/models'

export type NewArrivalsResponse = {
  sources: LibraryItem[]
  pageIndex: number
  pageSize: number
  totalPage: number
}

function useGetNewArrivals() {
  return useQuery({
    queryKey: ['new-arrivals'],
    queryFn: async () => {
      try {
        const { data } = await http.get<NewArrivalsResponse>(`/api/library-items/new-arrivals`, {})
        return data.sources
      } catch {
        return []
      }
    },
  })
}

export default useGetNewArrivals
