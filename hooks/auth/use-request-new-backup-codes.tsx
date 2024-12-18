import { useMutation } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { http } from '~/lib/http'

function useRequestNewBackupCodes() {
  const { accessToken } = useAuth()

  return useMutation({
    mutationFn: async () => {
      const { data } = await http.post<{ token: string }>(
        `/api/auth/regenerate-mfa-backup`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      return data.token
    },
  })
}

export default useRequestNewBackupCodes
