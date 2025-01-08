import { useState } from 'react'
import { View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Text } from '~/components/ui/text'
import useChangePassword from '~/hooks/auth/use-change-password'
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
  type: 'user' | 'employee'
}

function NewPassForm({ changePasswordToken, email, type }: Props) {
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
        type,
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

          handleActionError(res, control, setFocus)
        },
      },
    )
  }

  return (
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
              <Button variant="ghost" size="icon" onPress={() => setShowPassword((prev) => !prev)}>
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

export default NewPassForm
