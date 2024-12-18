import React, { useState } from 'react'
import { Image, View } from 'react-native'
import MfaForm from '~/app/(auth)/_components/mfa-form'
import BackupCodes from '~/components/backup-codes'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Text } from '~/components/ui/text'
import { useAuth } from '~/contexts/auth-provider'
import { TMfaQr } from '~/hooks/auth/use-mfa-qr'
import { useTranslation } from 'react-i18next'

type Props = {
  mfaQr: TMfaQr
}

export default function ActiveMfaButton({ mfaQr }: Props) {
  const { t } = useTranslation('MfaPage')
  const { user } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <>
      <View>
        <Button className="w-60" onPress={() => setOpen(true)}>
          <Text>{t('Active MFA')}</Text>
        </Button>
      </View>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[420px]">
          <DialogHeader>
            <DialogTitle className="mb-1"> {t('Active MFA')}</DialogTitle>
            <DialogDescription>
              <View className="flex flex-col">
                <View className="flex flex-row gap-x-4">
                  <View className="flex aspect-square size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Text className="text-primary-foreground">1</Text>
                  </View>
                  <Text className="w-[90%] text-left text-sm text-muted-foreground">
                    {t('Message enable')}
                  </Text>
                </View>
                <View className="mt-3 flex flex-col">
                  <View className="flex flex-row gap-x-4">
                    <View className="flex aspect-square size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Text className="text-primary-foreground">2</Text>
                    </View>
                    <Text className="w-[90%] text-left text-sm text-muted-foreground">
                      {t('Message enable 2')}
                    </Text>
                  </View>
                  <View className="mt-3 flex w-full flex-row justify-center">
                    <Image
                      resizeMode="contain"
                      source={{
                        uri: mfaQr.qrCodeImage,
                      }}
                      alt="qr-code"
                      className="h-[180px] w-[180px]"
                    />
                  </View>
                </View>
                <View className="mt-3 flex flex-col">
                  <View className="flex flex-row gap-x-4">
                    <View className="flex aspect-square size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Text className="text-primary-foreground">3</Text>
                    </View>
                    <Text className="w-[90%] text-left text-sm text-muted-foreground">
                      {t('Message enable 3')}
                    </Text>
                  </View>
                  <BackupCodes isLoading={false} codes={mfaQr.backupCodes} />
                </View>
                <View className="mt-3 flex flex-col">
                  <View className="flex flex-row items-center gap-x-4">
                    <View className="flex aspect-square size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Text className="text-primary-foreground">4</Text>
                    </View>
                    <Text className="text-left text-sm text-muted-foreground">
                      {t('Message enable 4')}
                    </Text>
                  </View>
                  <MfaForm
                    callback={() => setOpen(false)}
                    hideBackToLogin
                    email={user?.email || ''}
                  />
                </View>
              </View>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
