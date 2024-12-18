import React from 'react'
import { Pressable, View } from 'react-native'
import BackupCodes from '~/components/backup-codes'
import { Label } from '~/components/ui/label'
import { useAuth } from '~/contexts/auth-provider'
import useBackupCodes from '~/hooks/auth/use-backup-codes'
import useMfaQr from '~/hooks/auth/use-mfa-qr'
import { ChevronLeft } from '~/lib/icons/chevron-left'
import { Stack, useRouter } from 'expo-router'
import { Loader2 } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'

import ActiveMfaButton from './_components/active-mfa-button'
import GenerateNewCodesButton from './_components/generate-new-codes-button'

export default function SecurityScreen() {
  const { t } = useTranslation('SecurityPage')
  const { user } = useAuth()
  const router = useRouter()
  const { data, isLoading: isLoadingBackupCodes } = useBackupCodes()
  const { data: mfaQr, isLoading: isLoadingMfa } = useMfaQr(
    user?.email || '',
    !isLoadingBackupCodes && !data?.hasActiveMfa,
  )

  if (isLoadingBackupCodes || isLoadingMfa) {
    return (
      <View className="flex justify-center ">
        <Loader2 className="animated-spin size-12" />
      </View>
    )
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: t('Security'),
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ padding: 10 }}>
              <ChevronLeft size={24} className="text-foreground" />
            </Pressable>
          ),
        }}
      />
      <SafeAreaView className="m-0 flex-1 p-4" edges={['left', 'right', 'bottom']}>
        <View className="flex flex-col gap-y-6 md:px-2">
          {!data?.hasActiveMfa && (
            <>
              <View className="flex flex-col gap-y-2">
                <Label>{t('MFA')}</Label>

                <ActiveMfaButton mfaQr={mfaQr!} />
              </View>
            </>
          )}
          {data?.hasActiveMfa && (
            <>
              <View className="flex flex-col gap-y-2">
                <Label>{t('Backup code')}</Label>
                <BackupCodes
                  isLoading={isLoadingBackupCodes}
                  className="my-1 justify-start"
                  codes={data.backupCodes}
                />
                <GenerateNewCodesButton />
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </>
  )
}
