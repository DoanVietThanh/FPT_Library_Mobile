import React from 'react'
import { View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Text } from '~/components/ui/text'
import useValidateBackupCode from '~/hooks/auth/use-validate-backup-code'
import handleActionError from '~/lib/handle-action-error'
import { recoveryMfaSchema, TRecoveryMfaSchema } from '~/lib/validations/auth/recovery-mfa'
import { Link, useRouter } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type Props = {
  email: string
}

const RecoveryMfaForm = ({ email }: Props) => {
  const { t } = useTranslation('RecoveryMfaPage')
  const { t: tZod } = useTranslation('Zod')
  const router = useRouter()
  const queryClient = useQueryClient()
  const { isPending, mutate: validateBackupCode } = useValidateBackupCode()

  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<TRecoveryMfaSchema>({
    resolver: zodResolver(recoveryMfaSchema),
  })

  const onSubmit = async (body: TRecoveryMfaSchema) => {
    validateBackupCode(
      {
        email,
        backupCode: body.backupCode,
      },
      {
        onSuccess: (res) => {
          if (res.isSuccess) {
            queryClient.invalidateQueries({
              queryKey: ['token'],
            })
            router.push('/')
            return
          }
          handleActionError(res, control, setFocus)
        },
      },
    )
  }

  return (
    <>
      <View className="flex flex-col gap-y-6">
        <View className="flex flex-col gap-y-2">
          <Label className="text-sm font-semibold">{t('BackupCode')}</Label>
          <Controller
            control={control}
            name="backupCode"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input onBlur={onBlur} onChangeText={onChange} value={value} />
            )}
          />
          {errors.backupCode?.message && (
            <Text className="text-sm text-destructive">{tZod(errors.backupCode.message)}</Text>
          )}
        </View>

        <Button disabled={isPending} className="w-full" onPress={handleSubmit(onSubmit)}>
          <Text>{t('Continue')}</Text>
        </Button>

        <Link
          href="/sign-in"
          className="block cursor-pointer text-center text-sm font-bold hover:underline"
        >
          {t('Back to login')}
        </Link>
      </View>
    </>
  )
}

export default RecoveryMfaForm
