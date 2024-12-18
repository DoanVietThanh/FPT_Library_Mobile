import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { http } from '~/lib/http'
import { EAccessLevel, EFeature } from '~/types/enum'

function useHasPermission(feature: EFeature, accessLevel: EAccessLevel) {
  const { accessToken } = useAuth()
  const { data, isLoading } = useQuery({
    queryKey: ['accessible-features', accessToken],
    queryFn: async () => {
      try {
        const { data } = await http.get<{ permissionLevel: EAccessLevel }>(
          `/api/features/${feature}/authorized-permission`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )

        return data.permissionLevel || EAccessLevel.ACCESS_DENIED
      } catch {
        return EAccessLevel.ACCESS_DENIED
      }
    },
    placeholderData: keepPreviousData,
  })

  const hasPermission = isLoading ? false : data! >= accessLevel

  return { isLoading, hasPermission }
}

export default useHasPermission
