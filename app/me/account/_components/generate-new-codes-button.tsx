'use client'

import React, { useState } from 'react'
import { View } from 'react-native'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Text } from '~/components/ui/text'
import useConfirmNewBackupCodes from '~/hooks/auth/use-confirm-new-backup-codes'
import useRequestNewBackupCodes from '~/hooks/auth/use-request-new-backup-codes'
import handleActionError from '~/lib/handle-action-error'
import { isTokenExpired } from '~/lib/utils'
import { useBackupCodesStore } from '~/store/use-backup-codes-store'
import { useTranslation } from 'react-i18next'
import Toast from 'react-native-toast-message'

function GenerateNewCodesButton() {
  const {
    t,
    i18n: { language },
  } = useTranslation('SecurityPage')
  const [open, setOpen] = useState(false)
  const { mutate: requestNewCodes } = useRequestNewBackupCodes()
  const { isPending, mutate: confirmNewBackupCodes } = useConfirmNewBackupCodes()
  const { otp, setOtp, setToken, token } = useBackupCodesStore()

  const handleOpenChange = (value: boolean) => {
    if (isPending) return
    setOpen(value)
  }

  const handleConfirmNewCodes = () => {
    confirmNewBackupCodes(
      { otp, token },
      {
        onSuccess: (res) => {
          if (res.isSuccess) {
            Toast.show({
              text1: language === 'vi' ? 'Thành công' : 'Success',
              text2: res.data,
              type: 'success',
            })
            setOpen(false)
            return
          }
          handleActionError(res)
        },
      },
    )
  }

  return (
    <>
      <Button
        className="w-fit"
        onPress={() => {
          if (!token || !otp || isTokenExpired(token)) {
            setToken('')
            setOtp('')
            requestNewCodes(undefined, {
              onSuccess: setToken,
            })
            setOpen(true)
            return
          }

          handleConfirmNewCodes()
        }}
      >
        <Text>{t('Generate new codes')}</Text>
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="w-[420px]">
          <DialogHeader>
            <DialogTitle className="mb-1">{t('Need to verify')}</DialogTitle>
            <DialogDescription>
              <View className="flex w-full flex-col">
                <Label>{t('Verify code')}</Label>
                <Input
                  value={otp}
                  onChangeText={(text) => setOtp(text)}
                  className="mt-2 h-12 w-full"
                />
                <Text className="mt-1 text-xs text-muted-foreground">
                  {t('Check your email for verification code')}
                </Text>
              </View>
              <View className="flex flex-row gap-4">
                <Button onPress={handleConfirmNewCodes} className="mt-2 flex-1">
                  <Text>{t('Continue')}</Text>
                </Button>
                <DialogClose asChild>
                  <Button variant="outline" className="mt-2 flex-1">
                    <Text>{t('Cancel')}</Text>
                  </Button>
                </DialogClose>
              </View>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default GenerateNewCodesButton
