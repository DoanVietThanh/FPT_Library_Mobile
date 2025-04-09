import { useMutation } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { handleHttpError, http } from '~/lib/http'
import { ActionResponse } from '~/types/action-response'

type PaymentData = {
  description: string
  orderCode: string
  qrCode: string
  expiredAt: Date | null
  paymentLinkId: string
}

function useCreateLibraryCardTransaction() {
  const { accessToken } = useAuth()

  return useMutation({
    mutationFn: async (body: {
      libraryCardPackageId: number
      resourceId: null
      description: null
      paymentMethodId: number
      transactionType: number
    }): Promise<ActionResponse<{ message: string; paymentData: PaymentData | null }>> => {
      try {
        const { data, message } = await http.post<{
          payOsResponse: { data: PaymentData }
          expiredAtOffsetUnixSeconds: number
        }>('/api/payment/transactions', body, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        return {
          isSuccess: true,
          data: {
            message,
            paymentData: {
              description: data.payOsResponse.data.description,
              orderCode: data.payOsResponse.data.orderCode,
              paymentLinkId: data.payOsResponse.data.paymentLinkId,
              qrCode: data.payOsResponse.data.qrCode,
              expiredAt: data.expiredAtOffsetUnixSeconds
                ? new Date(data.expiredAtOffsetUnixSeconds * 1000)
                : null,
            },
          },
        }
      } catch (error) {
        return handleHttpError(error)
      }
    },
  })
}

export default useCreateLibraryCardTransaction
