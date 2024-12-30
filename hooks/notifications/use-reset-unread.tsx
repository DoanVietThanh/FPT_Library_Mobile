import { useMutation } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { http } from '~/lib/http'

function useResetUnread() {
  const { accessToken } = useAuth()

  return useMutation({
    mutationFn: async () => {
      await http.put(
        `/api/privacy/notifications`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
    },
  })
}

export default useResetUnread
