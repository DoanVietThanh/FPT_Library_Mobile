import { useQuery } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { http } from '~/lib/http'
import { Floor, Section, Shelf, Zone } from '~/types/models'

type Response = {
  floor: Floor
  zone: Zone
  section: Section
  libraryShelf: Shelf
}

function useShelfDetail(shelfId: number | null) {
  const { accessToken } = useAuth()
  return useQuery({
    queryKey: ['location', 'shelves', shelfId, accessToken],
    queryFn: async (): Promise<Response | null> => {
      if (!shelfId) return null
      try {
        const { data } = await http.get<Response>(`/api/location/shelves/${shelfId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        return data || null
      } catch {
        return null
      }
    },
    enabled: !!shelfId,
  })
}

export default useShelfDetail
