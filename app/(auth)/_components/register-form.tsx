import React, { useState } from 'react'
import { Image, View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import googleIcon from '~/assets/icons/google.png'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Separator } from '~/components/ui/separator'
import { Text } from '~/components/ui/text'
import useRegister from '~/hooks/mutations/auth/use-sign-up'
import handleActionError from '~/lib/handle-action-error'
import { registerSchema, TRegisterSchema } from '~/lib/validations/auth/register'
import { Link, useRouter } from 'expo-router'
import { Eye, EyeClosed } from 'lucide-react-native'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

function RegisterForm() {
  const router = useRouter()

  const {
    t,
    i18n: { language },
  } = useTranslation('RegisterPage')
  const { t: tZod } = useTranslation('Zod')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { mutate: signUp, isPending } = useRegister()

  const {
    control,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (body: TRegisterSchema) => {
    signUp(body, {
      onSuccess: (res) => {
        if (res.isSuccess) {
          router.push(`/verify-email/${body.email}`)
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
        <View className="w-full">
          <Label className="mb-1 text-sm font-semibold">{t('FirstName')}</Label>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input onBlur={onBlur} onChangeText={onChange} value={value} />
            )}
          />
          {errors.email?.message && (
            <Text className="text-sm text-destructive">{tZod(errors.email.message)}</Text>
          )}
        </View>
        <View className="w-full">
          <Label className="mb-1 text-sm font-semibold">{t('LastName')}</Label>
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input onBlur={onBlur} onChangeText={onChange} value={value} />
            )}
          />
          {errors.email?.message && (
            <Text className="text-sm text-destructive">{tZod(errors.email.message)}</Text>
          )}
        </View>
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

        <View className="flex flex-col gap-y-2">
          <Label className="text-sm font-semibold">{t('Password')}</Label>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="flex flex-row items-center rounded-[8px] border pr-1">
                <Input
                  className="flex-1 border-none border-transparent outline-none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={!showPassword}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onPress={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeClosed className="size-6" /> : <Eye className="size-6" />}
                </Button>
              </View>
            )}
          />
          {errors.password?.message && (
            <Text className="text-sm text-destructive">{tZod(errors.password.message)}</Text>
          )}
        </View>
        <View className="flex flex-col gap-y-2">
          <Label className="text-sm font-semibold">{t('ConfirmedPassword')}</Label>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="flex flex-row items-center rounded-[8px] border pr-1">
                <Input
                  className="flex-1 border-none border-transparent outline-none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={!showConfirmPassword}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onPress={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <EyeClosed className="size-6" />
                  ) : (
                    <Eye className="size-6" />
                  )}
                </Button>
              </View>
            )}
          />
          {errors.confirmPassword?.message && (
            <Text className="text-sm text-destructive">{tZod(errors.confirmPassword.message)}</Text>
          )}
        </View>

        <Button disabled={isPending} onPress={handleSubmit(onSubmit)} className="w-full">
          <Text>{t('Register')}</Text>
        </Button>
        <View className="flex flex-row flex-wrap justify-between gap-2 text-sm">
          <View className="flex flex-row items-center gap-1 text-muted-foreground">
            <Text className="text-sm"> {t('Already have an account?')}</Text>
            <Link href="/sign-in" className="text-foreground hover:underline">
              <Text className="text-sm font-semibold">{t('Sign in')}</Text>
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

export default RegisterForm
