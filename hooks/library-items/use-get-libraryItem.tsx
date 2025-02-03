import { useQuery } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { http } from '~/lib/http'
import { LibraryItem } from '~/types/models'

function useGetLibraryItem(libraryItemId: string) {
  const { accessToken } = useAuth()
  return useQuery({
    queryKey: [`library-items/${libraryItemId}`, accessToken],
    queryFn: async (): Promise<LibraryItem | null> => {
      try {
        const { data } = await http.get<LibraryItem>(`/api/library-items/${libraryItemId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        return data
      } catch {
        return null
      }
    },
  })
}

export default useGetLibraryItem
