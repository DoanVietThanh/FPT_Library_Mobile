import React from 'react'
import { Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import fptLogo from '~/assets/images/fpt-logo.png'
import { Text } from '~/components/ui/text'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'

import LoginOtpForm from './_components/login-otp-form'

function LoginPasswordMethodScreen() {
  const { t } = useTranslation('OtpMethodPage')
  const { email } = useLocalSearchParams()
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView>
        <ScrollView>
          <View className="min-h-screen-safe flex flex-col items-center justify-center gap-y-6 px-6 py-8">
            <View className="flex w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-lg">
              <View className="container flex gap-y-4">
                <View className="flex flex-row justify-center">
                  <Image source={fptLogo} className="h-12 w-32" resizeMode="contain" />
                </View>
                <View className="flex flex-col gap-y-1">
                  <Text className="text-center text-lg font-semibold">{t('Check your email')}</Text>
                  <Text className="text-center text-sm text-muted-foreground">{t('Message')}</Text>
                  <Text className="text-center text-sm text-muted-foreground">{email}</Text>
                </View>
                <LoginOtpForm email={email as string} />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default LoginPasswordMethodScreen
