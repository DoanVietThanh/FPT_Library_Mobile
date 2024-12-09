import { useState } from 'react'
import { View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Text } from '~/components/ui/text'
import useChangePassword from '~/hooks/mutations/auth/use-change-password'
import handleActionError from '~/lib/handle-action-error'
import { newPassSchema, TNewPassSchema } from '~/lib/validations/auth/new-pass'
import { Link, useRouter } from 'expo-router'
import { Eye, EyeClosed } from 'lucide-react-native'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Toast from 'react-native-toast-message'

type Props = {
  changePasswordToken: string
  email: string
}

function NewPassForm({ changePasswordToken, email }: Props) {
  const router = useRouter()

  const {
    t,
    i18n: { language },
  } = useTranslation('ResetPasswordPage')
  const { t: tZod } = useTranslation('Zod')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { mutate: changePassword, isPending } = useChangePassword()

  const {
    control,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm<TNewPassSchema>({
    resolver: zodResolver(newPassSchema),
  })

  const onSubmit = async (body: TNewPassSchema) => {
    changePassword(
      {
        email,
        password: body.password,
        token: changePasswordToken,
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

  return (
    <>
      <View className="flex flex-col gap-y-6">
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
          <Text>{t('NewPass')}</Text>
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

export default NewPassForm
