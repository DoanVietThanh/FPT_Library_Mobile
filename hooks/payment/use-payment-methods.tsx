import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { http } from '~/lib/http'
import { PaymentMethod } from '~/types/models'

function useGetPaymentMethods() {
  return useQuery({
    queryKey: ['payment-method'],
    queryFn: async () => {
      try {
        const res = await http.get<PaymentMethod[]>(`/api/payment-methods`)

        return res.data
      } catch {
        return []
      }
    },
    placeholderData: keepPreviousData,
  })
}

export default useGetPaymentMethods
