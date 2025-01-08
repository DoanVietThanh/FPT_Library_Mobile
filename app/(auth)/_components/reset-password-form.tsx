import React, { useEffect, useState } from 'react'
import { GestureResponderEvent, View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import useVerifyOtpChangePassword from '~/hooks/auth/use-verify-otp-change-password'
import handleActionError from '~/lib/handle-action-error'
import { http } from '~/lib/http'
import { otpSchema, TOtpSchema } from '~/lib/validations/auth/otp'
import { Link } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import NewPassForm from './new-pass-form'
import OTPInput from './otp-input'

type Props = {
  email: string
  type: 'user' | 'employee'
}

const ResetPasswordForm = ({ email, type }: Props) => {
  const { t } = useTranslation('ResetPasswordPage')
  const { t: tZod } = useTranslation('Zod')
  const queryClient = useQueryClient()

  const [timeDisableResend, setTimeDisableResend] = useState(0)
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false)
  const [changePasswordToken, setChangePasswordToken] = useState<string>('')

  useQuery({
    queryKey: ['forgot-password', email],
    queryFn: async () => await http.get(`/api/auth/forgot-password?Email=${email}`),
    refetchOnWindowFocus: false,
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<TOtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      pin: new Array(6).fill(''),
    },
  })

  const { mutate: verifyOtpChangePassword, isPending } = useVerifyOtpChangePassword()

  const onSubmit = (body: TOtpSchema) => {
    verifyOtpChangePassword(
      {
        email,
        otp: body.pin.join(''),
      },
      {
        onSuccess: (res) => {
          if (res.isSuccess) {
            setShowNewPasswordForm(true)
            setChangePasswordToken(res.data.token)

            return
          }

          handleActionError(res, control, setFocus)
        },
      },
    )
  }

  function handleResendCode(e: GestureResponderEvent) {
    e.preventDefault()
    e.stopPropagation()
    setTimeDisableResend(30)
    queryClient.invalidateQueries({
      queryKey: ['forgot-password', email],
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
    <>
      {!showNewPasswordForm ? (
        <View className="flex flex-col items-center gap-y-6">
          <View className="flex w-full flex-col items-center gap-y-2">
            <Controller
              control={control}
              name="pin"
              render={({ field: { onChange, value } }) => (
                <OTPInput otp={value} setOtp={onChange} />
              )}
            />
            {errors.pin?.message && (
              <Text className="text-sm text-destructive">{tZod(errors.pin.message)}</Text>
            )}

            <Button
              onPress={handleResendCode}
              disabled={timeDisableResend > 0}
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
      ) : (
        <NewPassForm type={type} email={email} changePasswordToken={changePasswordToken} />
      )}
    </>
  )
}

export default ResetPasswordForm
