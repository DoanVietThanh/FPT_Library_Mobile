import { useMutation } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { handleHttpError, http } from '~/lib/http'
import { ActionResponse } from '~/types/action-response'

function usePutOnShelf() {
  const { accessToken } = useAuth()
  return useMutation({
    mutationFn: async (barcode: string): Promise<ActionResponse<string>> => {
      try {
        const { message } = await http.patch(
          `/api/management/library-items/instances/${barcode}/update-in-shelf`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )

        return {
          isSuccess: true,
          data: message,
        }
      } catch (error) {
        return handleHttpError(error)
      }
    },
  })
}

export default usePutOnShelf
