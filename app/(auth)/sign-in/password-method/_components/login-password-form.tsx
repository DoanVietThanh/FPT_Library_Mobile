import React from 'react'
import { Image, View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import googleIcon from '~/assets/icons/google.png'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Separator } from '~/components/ui/separator'
import { Text } from '~/components/ui/text'
import useLoginPassword from '~/hooks/mutations/auth/use-login-password'
import handleActionError from '~/lib/handle-action-error'
import {
  loginByPasswordSchema,
  TLoginByPasswordSchema,
} from '~/lib/validations/auth/login-password'
import { Link, useRouter } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type Props = {
  email: string
}

const { mutate: loginByPassword, isPending } = useLoginPassword()

const LoginPasswordForm = ({ email }: Props) => {
  const {
    t,
    i18n: { language },
  } = useTranslation('LoginPage')
  const { t: tZod } = useTranslation('Zod')
  const router = useRouter()
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<TLoginByPasswordSchema>({
    resolver: zodResolver(loginByPasswordSchema),
  })

  const onSubmit = (body: TLoginByPasswordSchema) => {
    loginByPassword(body, {
      onSuccess: (res) => {
        if (res.isSuccess) {
          router.push('/')
          return
        }

        handleActionError(res, language, control, setFocus)
      },
    })
  }

  return (
    <>
      <Button
        // onClick={handleGoogleLogin}
        variant="outline"
        className="flex w-full flex-row border-none outline-none"
      >
        <Image resizeMode="contain" className="mr-2 size-6" source={googleIcon} />
        <Text>{t('Continue with Google')}</Text>
      </Button>
      <View className="flex flex-row items-center gap-x-2">
        <Separator className="flex-1" />
        <Text className="text-sm">{t('or')}</Text>
        <Separator className="flex-1" />
      </View>
      <View className="flex flex-col gap-y-6">
        <View className="flex flex-col gap-y-2">
          <View className="flex flex-row flex-wrap items-center justify-between gap-1">
            <Label className="text-sm font-semibold">{t('PasswordMethodPage.Password')}</Label>
            <Link href={`/reset-password/${email}`} className="text-xs hover:underline">
              {t('PasswordMethodPage.Forgot password?')}
            </Link>
          </View>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input onBlur={onBlur} onChangeText={onChange} value={value} />
            )}
          />
          {errors.password?.message && (
            <Text className="text-sm text-destructive">{tZod(errors.password.message)}</Text>
          )}
        </View>

        <Button disabled={isPending} className="w-full" onPress={handleSubmit(onSubmit)}>
          <Text>{t('PasswordMethodPage.Login')}</Text>
        </Button>

        <Link
          href="/sign-in"
          className="block cursor-pointer text-center text-sm font-bold text-foreground hover:underline"
        >
          {t('PasswordMethodPage.Back to login')}
        </Link>
      </View>
    </>
  )
}

export default LoginPasswordForm
