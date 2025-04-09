import { useQuery } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { http } from '~/lib/http'
import { BookResource } from '~/types/models'

function useGetResource(resourceId: string) {
  const { accessToken } = useAuth()
  return useQuery({
    queryKey: [`library-items/resources/${resourceId}`, accessToken],
    queryFn: async (): Promise<BookResource | null> => {
      try {
        const { data } = await http.get<BookResource>(
          `/api/library-items/resources/${resourceId}`,
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

export default useGetResource
