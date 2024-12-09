import React, { useEffect, useState } from 'react'
import { GestureResponderEvent, View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import useResendOtp from '~/hooks/mutations/auth/use-resend-otp'
import useVerifyEmail from '~/hooks/mutations/auth/use-verify-email'
import handleActionError from '~/lib/handle-action-error'
import { otpSchema, TOtpSchema } from '~/lib/validations/auth/otp'
import { Link, useRouter } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Toast from 'react-native-toast-message'

import OTPInput from './otp-input'

type Props = {
  email: string
}

const VerifyEmailForm = ({ email }: Props) => {
  const {
    t,
    i18n: { language },
  } = useTranslation('VerifyOtpPage')
  const { t: tZod } = useTranslation('Zod')

  const [timeDisableResend, setTimeDisableResend] = useState(0)
  const router = useRouter()

  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<TOtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      pin: new Array(6).fill(''),
    },
  })

  const { mutate: verifyEmail, isPending } = useVerifyEmail()
  const { mutate: resendOtp, isPending: pendingResendOtp } = useResendOtp()

  const onSubmit = (data: TOtpSchema) => {
    verifyEmail(
      {
        email,
        emailVerificationCode: data.pin.join(''),
      },
      {
        onSuccess: (res) => {
          if (res.isSuccess) {
            router.push(`/sign-in`)
            Toast.show({
              text1: language === 'vi' ? 'Thành công' : 'Success',
              text2: res.data,
              type: 'success',
            })
            return
          }

          handleActionError(res, language, control, setFocus)
        },
      },
    )
  }

  function handleResendCode(e: GestureResponderEvent) {
    e.preventDefault()
    e.stopPropagation()
    setTimeDisableResend(30)

    resendOtp(email, {
      onSuccess: (res) => {
        if (res.isSuccess) {
          Toast.show({
            text1: language === 'vi' ? 'Thành công' : 'Success',
            text2: res.data,
            type: 'success',
          })
          return
        }
      },
    })
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeDisableResend > 0) {
        setTimeDisableResend((prev) => prev - 1)
      }
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [timeDisableResend])

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

        <Button
          onPress={handleResendCode}
          disabled={timeDisableResend > 0 || pendingResendOtp}
          className="min-h-0 min-w-0 p-0 hover:bg-transparent hover:underline"
          variant="ghost"
        >
          <Text className="text-sm">
            {t('No code')} {timeDisableResend > 0 ? `(${timeDisableResend})` : null}
          </Text>
        </Button>
      </View>

      <Button disabled={isPending} className="w-full" onPress={handleSubmit(onSubmit)}>
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

export default VerifyEmailForm
