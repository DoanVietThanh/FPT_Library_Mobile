import React from 'react'
import { Image, View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
//GOOGLE SIGN IN
// import {
//   GoogleSignin,
//   isErrorWithCode,
//   isSuccessResponse,
//   statusCodes,
// } from '@react-native-google-signin/google-signin'
import googleIcon from '~/assets/icons/google.png'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Separator } from '~/components/ui/separator'
import { Text } from '~/components/ui/text'
import useLogin from '~/hooks/auth/use-login'
import useLoginGoogle from '~/hooks/auth/use-login-google'
import handleActionError from '~/lib/handle-action-error'
import { loginSchema, TLoginSchema } from '~/lib/validations/auth/login'
import { Link, useRouter } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Toast from 'react-native-toast-message'

// Configuration for Google OAuth2

//GOOGLE SIGN IN
// GoogleSignin.configure({
//   webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
//   scopes: ['https://www.googleapis.com/auth/drive.readonly'],
//   offlineAccess: true,
//   forceCodeForRefreshToken: true,
// })

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
  const { mutate: loginGoogle, isPending: isPendingGoogle } = useLoginGoogle()

  const onSubmit = async (body: TLoginSchema) => {
    login(body, {
      onSuccess: (res) => {
        console.log({ res })

        if (res.isSuccess) {
          if (res.data.resultCode === 'Auth.Success0003') {
            router.push(
              `/sign-in/password-method/${res.data.userType.toLocaleLowerCase()}/${body.email}`,
            )
            return
          }

          if (res.data.resultCode === 'Auth.Success0005') {
            if (res.data.userType === 'Employee') {
              router.push(`/reset-password/employee/${body.email}`)
              return
            }
            router.push(`/sign-in/otp-method/${body.email}`)
            return
          }

          console.log('Something went wrong')
          return
        }

        if (res.typeError === 'warning') {
          if (res.resultCode === 'Auth.Warning0008') {
            router.push(`/verify-email/${body.email}`)
            return
          }

          if (res.resultCode === 'Auth.Warning0011') {
            router.push(`/mfa/${body.email}/enable`)
            return
          }
        }

        handleActionError(res, control, setFocus)
      },
    })
  }

  const handleGoogleLogin = async () => {
    console.log(loginGoogle, language, Toast)

    //GOOGLE SIGN IN
    // try {
    //   await GoogleSignin.hasPlayServices()

    //   const response = await GoogleSignin.signIn()
    //   if (isSuccessResponse(response)) {
    //     if (!response.data.serverAuthCode) {
    //       Toast.show({
    //         type: 'error', // Define your custom type
    //         text1: language === 'vi' ? 'Lỗi' : 'Error',
    //         text2:
    //           language === 'vi'
    //             ? 'Đã xảy ra lỗi không xác định. Vui lòng thử lại sau.'
    //             : 'An unknown error occurred. Please try again later.',
    //       })
    //       return
    //     }
    //     loginGoogle(response.data.serverAuthCode, {
    //       onSuccess: (res) => {
    //         if (res.isSuccess) {
    //           router.push(`/`)
    //           return
    //         }

    //         handleActionError(res, control, setFocus)
    //       },
    //     })
    //   } else {
    //     //cancelled
    //   }
    // } catch (error) {
    //   if (isErrorWithCode(error)) {
    //     switch (error.code) {
    //       case statusCodes.IN_PROGRESS:
    //         break
    //       case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
    //         break
    //       default:
    //     }
    //   } else {
    //     // an error that's not related to google sign in occurred
    //   }
    // }
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

        <Button
          disabled={isPending || isPendingGoogle}
          className="w-full"
          onPress={handleSubmit(onSubmit)}
        >
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
