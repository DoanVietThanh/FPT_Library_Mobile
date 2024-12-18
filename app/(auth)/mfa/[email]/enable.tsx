import React from 'react'
import { Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import fptLogo from '~/assets/images/fpt-logo.png'
import BackupCodes from '~/components/backup-codes'
import { Skeleton } from '~/components/ui/skeleton'
import { Text } from '~/components/ui/text'
import useMfaQr from '~/hooks/auth/use-mfa-qr'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'

import MfaForm from '../../_components/mfa-form'

function EnableMfaScreen() {
  const { t } = useTranslation('MfaPage')
  const { email } = useLocalSearchParams()
  const { data, isLoading } = useMfaQr(email as string)
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView>
        <ScrollView>
          <View className="min-h-screen-safe flex flex-col items-center justify-center gap-y-6 px-6 py-8">
            <View className="flex w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-lg">
              <View className="container flex gap-y-4">
                <View className="flex flex-row justify-center">
                  <Image source={fptLogo} className="h-12 w-32" resizeMode="contain" />
                </View>
                <View className="flex flex-col gap-y-1">
                  <Text className="text-center text-lg font-semibold">{t('Active MFA')}</Text>
                  <View className="flex gap-x-4">
                    <View className="flex aspect-square size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      1
                    </View>
                    <p className="text-left text-sm text-muted-foreground">{t('Message enable')}</p>
                  </View>
                  <View className="mt-3 flex flex-col">
                    <View className="flex gap-x-4">
                      <View className="flex aspect-square size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        2
                      </View>
                      <p className="text-left text-sm text-muted-foreground">
                        {t('Message enable 2')}
                      </p>
                    </View>
                    <View className="mt-3 flex justify-center">
                      {isLoading ? (
                        <Skeleton className="size-[180px] rounded-md" />
                      ) : (
                        <Image src={data?.qrCodeImage} alt="qr-code" width={180} height={180} />
                      )}
                    </View>
                  </View>
                  <View className="mt-3 flex flex-col">
                    <View className="flex gap-x-4">
                      <View className="flex aspect-square size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        3
                      </View>
                      <p className="text-left text-sm text-muted-foreground">
                        {t('Message enable 3')}
                      </p>
                    </View>
                    <BackupCodes isLoading={isLoading} codes={data?.backupCodes || []} />
                  </View>
                  <View className="mt-3 flex flex-col">
                    <View className="flex items-center gap-x-4">
                      <View className="flex aspect-square size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        4
                      </View>
                      <p className="text-left text-sm text-muted-foreground">
                        {t('Message enable 4')}
                      </p>
                    </View>
                    <MfaForm email={email as string} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default EnableMfaScreen
