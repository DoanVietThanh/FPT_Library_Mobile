import React, { useState } from 'react'
import { Image, View } from 'react-native'
import googleIcon from '~/assets/icons/google.png'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Separator } from '~/components/ui/separator'
import { Text } from '~/components/ui/text'
import { Link } from 'expo-router'
import { useTranslation } from 'react-i18next'

const SignInForm = () => {
  const { t } = useTranslation('LoginPage')
  const [pending, setPending] = useState(false)

  console.log(setPending)

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
      <View className="flex flex-col gap-y-4">
        <View className="flex flex-col gap-y-2">
          <Label className="text-sm font-semibold">{t('Email')}</Label>
          <Input />
        </View>

        <Button disabled={pending} className="w-full">
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
