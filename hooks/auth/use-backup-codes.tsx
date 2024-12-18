import { useQuery } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { http } from '~/lib/http'

export type TGetBackupCodes = {
  backupCodes: BackupCodes
  hasActiveMfa: boolean
}

type BackupCodes = string[]

function useBackupCodes() {
  const { accessToken } = useAuth()
  return useQuery({
    queryKey: ['backup-codes', accessToken],
    queryFn: async () => {
      try {
        const { data } = await http.get<BackupCodes>(`/api/auth/mfa-backup`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        return { backupCodes: data, hasActiveMfa: true }
      } catch {
        return {
          backupCodes: [],
          hasActiveMfa: false,
        }
      }
    },
  })
}

export default useBackupCodes
