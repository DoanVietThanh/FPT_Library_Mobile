import { useQuery } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { http } from '~/lib/http'
import { Category } from '~/types/models'

type Categories = Category[]

function useGetCategories() {
  const { accessToken } = useAuth()
  return useQuery({
    queryKey: ['categories', accessToken],
    queryFn: async () => {
      try {
        const { data } = await http.get<Categories>(`/api/categories?`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        return data || []
      } catch {
        return []
      }
    },
  })
}

export default useGetCategories
