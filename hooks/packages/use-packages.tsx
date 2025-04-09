import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { http } from '~/lib/http'
import { Package } from '~/types/models'

function usePackages() {
  const { accessToken } = useAuth()

  return useQuery({
    queryKey: ['/packages', accessToken],
    queryFn: async () => {
      try {
        const res = await http.get<Package[]>(`/api/packages`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        return res.data
      } catch {
        return 0
      }
    },
    placeholderData: keepPreviousData,
  })
}

export default usePackages
