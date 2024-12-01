import React, { useTransition } from 'react'
import { Alert, View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { Link } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import OTPInput from './otp-input'

const otpSchema = z.object({
  pin: z.array(z.string()).refine((value) => {
    let count = 0
    value.forEach((i) => {
      if (i !== '') count++
    })
    return count === 6
  }, 'length6'),
})

type TOtpSchema = z.infer<typeof otpSchema>

const ResetPasswordForm = () => {
  const { t } = useTranslation('ResetPasswordPage')
  const { t: tZod } = useTranslation('Zod')
  const [pending, startTransition] = useTransition()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TOtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      pin: new Array(6).fill(''),
    },
  })

  const onSubmit = (data: TOtpSchema) => {
    startTransition(() => {
      Alert.alert('Form Submitted', JSON.stringify(data))
    })
  }

  return (
    <View className="flex flex-col items-center gap-y-6">
      <View className="flex w-full flex-col items-center gap-y-2">
        <Controller
          control={control}
          name="pin"
          render={({ field: { onChange, value } }) => <OTPInput otp={value} setOtp={onChange} />}
        />
        {errors.pin?.message && (
          <Text className="text-sm text-destructive">{tZod(errors.pin.message)}</Text>
        )}
      </View>

      <Button disabled={pending} className="w-full" onPress={handleSubmit(onSubmit)}>
        <Text>{t('Continue')}</Text>
      </Button>

      <Link
        href="/sign-in"
        className="block cursor-pointer text-center text-sm font-bold text-foreground hover:underline"
      >
        {t('Back to login')}
      </Link>
    </View>
  )
}

export default ResetPasswordForm
