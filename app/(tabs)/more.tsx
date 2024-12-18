import React from 'react'
import { Pressable, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { Link, Stack, useRouter } from 'expo-router'
import {
  ChevronRight,
  ClipboardList,
  FileQuestion,
  LogOut,
  MapPinHouse,
  NotepadText,
  Phone,
  QrCode,
  Settings,
  Shield,
  ShieldCheck,
} from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  const router = useRouter()
  const { t } = useTranslation('MoreScreen')

  return (
    <>
      <Stack.Screen options={{ title: t('Title') }} />
      <SafeAreaView className="m-0 flex-1 p-0" edges={['left', 'right', 'bottom']}>
        <View className="min-h-screen-safe flex flex-col gap-y-6 bg-secondary p-6">
          {/* Personal info */}
          <Pressable onPress={() => router.push('/me/account/profile')}>
            <View className="flex w-full flex-row items-center justify-start gap-4 rounded-lg bg-primary-foreground p-4">
              <View className="flex items-center justify-center rounded-full border-2 border-primary p-2">
                <AntDesign name="user" size={32} className="text-primary" />
              </View>
              <View>
                <Text className="text-xl font-semibold text-primary">Doan Viet Thanh</Text>
                <Text>{t('ChangeInfo')}</Text>
              </View>
            </View>
          </Pressable>

          <View className="flex flex-col gap-4 rounded-lg bg-primary-foreground p-4">
            {/* Setting */}
            <View className="flex w-full flex-row justify-between gap-4">
              <View className="flex flex-row items-center gap-2">
                <Settings className="text-primary" color={'orange'} />
                <Text className="text-lg ">{t('Setting')}</Text>
              </View>
              <ChevronRight className="text-primary" color={'orange'} />
            </View>
            {/* Security */}
            <Link href="/me/account/security">
              <View className="flex w-full flex-row justify-between gap-4">
                <View className="flex flex-row items-center gap-2">
                  <Shield className="text-primary" color={'orange'} />
                  <Text className="text-lg ">{t('Security')}</Text>
                </View>
                <ChevronRight className="text-primary" color={'orange'} />
              </View>
            </Link>
            {/* My QR code */}
            <View className="flex w-full flex-row justify-between gap-4">
              <View className="flex flex-row items-center gap-2">
                <QrCode className="text-primary" color={'orange'} />
                <Text className="text-lg">{t('MyQR')}</Text>
              </View>
              <ChevronRight className="text-primary" color={'orange'} />
            </View>
          </View>

          <View className="flex flex-col gap-4 rounded-lg bg-primary-foreground p-4">
            {/* OTP */}
            <View className="flex w-full flex-row justify-between gap-4">
              <View className="flex flex-row items-center gap-2">
                <ShieldCheck className="text-primary" color={'orange'} />
                <Text className="text-lg">{t('OTP')}</Text>
              </View>
              <ChevronRight className="text-primary" color={'orange'} />
            </View>
            {/* Blog */}
            <View className="flex w-full flex-row justify-between gap-4">
              <View className="flex flex-row items-center gap-2">
                <ClipboardList className="text-primary" color={'orange'} />
                <Text className="text-lg">{t('Blog')}</Text>
              </View>
              <ChevronRight className="text-primary" color={'orange'} />
            </View>
            {/* Location */}
            <View className="flex w-full flex-row justify-between gap-4">
              <View className="flex flex-row items-center gap-2">
                <MapPinHouse className="text-primary" color={'orange'} />
                <Text className="text-lg">{t('Location')}</Text>
              </View>
              <ChevronRight className="text-primary" color={'orange'} />
            </View>
          </View>

          <View className="flex flex-col gap-4 rounded-lg bg-primary-foreground p-4">
            {/* Policy */}
            <View className="flex w-full flex-row justify-between gap-4">
              <View className="flex flex-row items-center gap-2">
                <NotepadText className="text-primary" color={'orange'} />
                <Text className="text-lg">{t('Policy')}</Text>
              </View>
              <ChevronRight className="text-primary" color={'orange'} />
            </View>
            {/* Question */}
            <View className="flex w-full flex-row justify-between gap-4">
              <View className="flex flex-row items-center gap-2">
                <FileQuestion className="text-primary" color={'orange'} />
                <Text className="text-lg">{t('Question')}</Text>
              </View>
              <ChevronRight className="text-primary" color={'orange'} />
            </View>
            {/* Contact */}
            <View className="flex w-full flex-row justify-between gap-4">
              <View className="flex flex-row items-center gap-2">
                <Phone className="text-primary" color={'orange'} />
                <Text className="text-lg">{t('Contact')}</Text>
              </View>
              <ChevronRight className="text-primary" color={'orange'} />
            </View>
          </View>

          <Button className="flex flex-row items-center gap-4">
            <Text className="text-3xl">{t('Logout')}</Text>
            <LogOut color={'white'} size={20} />
          </Button>
        </View>
      </SafeAreaView>
    </>
  )
}
