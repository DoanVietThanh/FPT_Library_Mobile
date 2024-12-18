import React from 'react'
import { View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import useValidateMfa from '~/hooks/auth/use-validate-mfa'
import handleActionError from '~/lib/handle-action-error'
import { otpSchema, TOtpSchema } from '~/lib/validations/auth/otp'
import { Link, useRouter } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import OTPInput from './otp-input'

type Props = {
  email: string
  validatePage?: boolean
  hideBackToLogin?: boolean
  callback?: () => void
}

const MfaForm = ({ email, callback, hideBackToLogin = false, validatePage = false }: Props) => {
  const { t } = useTranslation('ResetPasswordPage')
  const { t: tZod } = useTranslation('Zod')
  const router = useRouter()
  const queryClient = useQueryClient()

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

  const { mutate: validateMfa, isPending } = useValidateMfa()

  const onSubmit = (data: TOtpSchema) => {
    validateMfa(
      {
        email,
        otp: data.pin.join(''),
      },
      {
        onSuccess: (res) => {
          if (res.isSuccess) {
            queryClient.invalidateQueries({
              queryKey: ['token'],
            })
            queryClient.invalidateQueries({
              queryKey: ['backup-codes'],
            })
            if (!hideBackToLogin) {
              router.push('/')
              if (callback) {
                callback()
              }
            }
            return
          }

          handleActionError(res, control, setFocus)
        },
      },
    )
  }

  return (
    <View className="flex flex-col items-center gap-y-6">
      <View className="flex w-full flex-col items-center gap-y-2">
        <Controller
          control={control}
          name="pin"
          render={({ field: { onChange, value } }) => <OTPInput otp={value} setOtp={onChange} />}
        />
        {validatePage && (
          <Link
            href={`/mfa/${email}/recovery`}
            className="min-h-0 min-w-0 p-0 hover:bg-transparent hover:underline"
          >
            {t('Missing mfa')}
          </Link>
        )}
        {errors.pin?.message && (
          <Text className="text-sm text-destructive">{tZod(errors.pin.message)}</Text>
        )}
      </View>

      <Button disabled={isPending} className="w-full" onPress={handleSubmit(onSubmit)}>
        <Text>{t('Continue')}</Text>
      </Button>

      {!hideBackToLogin && (
        <Link
          href="/sign-in"
          className="block cursor-pointer text-center text-sm font-bold text-foreground hover:underline"
        >
          {t('Back to login')}
        </Link>
      )}
    </View>
  )
}

export default MfaForm
