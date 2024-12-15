import { useQuery } from '@tanstack/react-query'
import { http } from '~/lib/http'

export type TMfaQr = {
  qrCodeImage: string
  backupCodes: string[]
}

function useMfaQr(email: string) {
  return useQuery({
    queryKey: ['mfa-qr-code', email],
    queryFn: async () => {
      try {
        const { data } = await http.post<TMfaQr>(`/api/auth/enable-mfa`, { email })
        return data || null
      } catch {
        return null
      }
    },
  })
}

export default useMfaQr
