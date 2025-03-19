import { useMutation } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { handleHttpError, http } from '~/lib/http'
import { ActionResponse } from '~/types/action-response'
import { BookEdition, LibraryItemInstance } from '~/types/models'

export type BookByBarcode = LibraryItemInstance & {
  libraryItem: BookEdition
}

function useGetBookByBarcode() {
  const { accessToken } = useAuth()
  return useMutation({
    mutationFn: async (barcode: string): Promise<ActionResponse<BookByBarcode | null>> => {
      try {
        const { data } = await http.get<BookByBarcode>(
          `/api/management/library-items/instances/${barcode}/shelf-update-confirmation`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )

        return {
          isSuccess: true,
          data: data || null,
        }
      } catch (error) {
        return handleHttpError(error)
      }
    },
  })
}

export default useGetBookByBarcode
