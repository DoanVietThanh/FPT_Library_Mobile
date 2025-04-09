import { useMutation } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { handleHttpError, http } from '~/lib/http'
import { ActionResponse } from '~/types/action-response'

type TRegisterLibraryCardData = {
  avatar: string
  fullName: string
}

function useRegisterLibraryCard() {
  const { accessToken } = useAuth()

  return useMutation({
    mutationFn: async (body: TRegisterLibraryCardData): Promise<ActionResponse<string>> => {
      try {
        const res = await http.post<string>(`/api/library-cards/register`, body, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        return {
          isSuccess: true,
          data: res.data,
        }
      } catch (error) {
        return handleHttpError(error)
      }
    },
  })
}

export default useRegisterLibraryCard
