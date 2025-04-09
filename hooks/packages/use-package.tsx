import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { http } from '~/lib/http'
import { Package } from '~/types/models'

function usePackage(packageId: number) {
  const { accessToken } = useAuth()

  return useQuery({
    queryKey: [`/packages/${packageId}`, accessToken],
    queryFn: async () => {
      try {
        const res = await http.get<Package>(`/api/packages/${packageId}`, {
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

export default usePackage
