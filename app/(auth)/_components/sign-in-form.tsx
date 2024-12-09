import React from 'react'
import { Image, View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import googleIcon from '~/assets/icons/google.png'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Separator } from '~/components/ui/separator'
import { Text } from '~/components/ui/text'
import useLogin from '~/hooks/mutations/auth/use-login'
import { googleConfig } from '~/lib/constants'
import handleActionError from '~/lib/handle-action-error'
import { loginSchema, TLoginSchema } from '~/lib/validations/auth/login'
import { Link, useRouter } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { authorize } from 'react-native-app-auth'

// Configuration for Google OAuth2

const SignInForm = () => {
  const router = useRouter()
  const {
    t,
    i18n: { language },
  } = useTranslation('LoginPage')
  const { t: tZod } = useTranslation('Zod')

  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const { mutate: login, isPending } = useLogin()

  const onSubmit = async (body: TLoginSchema) => {
    login(body, {
      onSuccess: (res) => {
        if (res.isSuccess) {
          router.push(`/verify-email/${body.email}`)
          return
        }

        handleActionError(res, language, control, setFocus)
      },
    })
  }

  const handleGoogleLogin = async () => {
    console.log(authorize)
    console.log(googleConfig)

    try {
      const result = await authorize(googleConfig)
      console.log('Authorization Code:', { result })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Button
        onPress={handleGoogleLogin}
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
          <Label className="text-sm font-semibold">{t('Email')}</Label>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input onBlur={onBlur} onChangeText={onChange} value={value} />
            )}
          />
          {errors.email?.message && (
            <Text className="text-sm text-destructive">{tZod(errors.email.message)}</Text>
          )}
        </View>

        <Button disabled={isPending} className="w-full" onPress={handleSubmit(onSubmit)}>
          <Text>{t('Login')}</Text>
        </Button>

        <View className="flex flex-row flex-wrap justify-between gap-2 text-sm">
          <View className="flex flex-row items-center gap-1 text-muted-foreground">
            <Text className="text-sm">{t('Don’t have an account?')}</Text>
            <Link href="/sign-up" className="text-foreground hover:underline">
              <Text className="text-sm font-semibold">{t('Register')}</Text>
            </Link>
          </View>
          <Link href="/" className="hover:underline">
            <Text className="text-sm">{t('Homepage')}</Text>
          </Link>
        </View>
      </View>
    </>
  )
}

export default SignInForm
