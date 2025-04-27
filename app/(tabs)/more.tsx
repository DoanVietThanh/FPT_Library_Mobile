import React from 'react'
import { Pressable, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Button } from '~/components/ui/button'
import Loading from '~/components/ui/loading'
import { Text } from '~/components/ui/text'
import { useAuth } from '~/contexts/auth-provider'
import { IdCard } from '~/lib/icons/card-icon'
import { Management } from '~/lib/icons/management'
import { ERoleType } from '~/types/enum'
import { Href, Stack, useRouter } from 'expo-router'
import {
  ChevronRight,
  FileQuestion,
  LogOut,
  MapPinHouse,
  NotepadText,
  Phone,
  QrCode,
  Settings,
} from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  const router = useRouter()
  const { t } = useTranslation('MoreScreen')
  const { t: tMe } = useTranslation('Me')
  const { signOut, user, isLoadingAuth } = useAuth()

  if (isLoadingAuth) {
    return <Loading />
  }

  if (!user) {
    return (
      <View className="flex flex-1 items-center justify-center gap-4">
        <Text className="text-info-100">{tMe('you have not logined')}</Text>
        <Button onPress={() => router.push('/(auth)/sign-in')}>
          <Text>{tMe('login')}</Text>
        </Button>
      </View>
    )
  }

  return (
    <>
      <Stack.Screen options={{ title: t('Title') }} />
      <SafeAreaView className="m-0 flex-1 p-0" edges={['left', 'right']}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="min-h-screen-safe flex flex-col gap-y-6 bg-secondary p-6"
        >
          {/* Personal info */}
          <Pressable onPress={() => router.push('/me/account/profile')}>
            <View className="flex w-full flex-row items-center justify-start gap-4 rounded-lg bg-background p-4">
              <View className="flex items-center justify-center rounded-full border-2 border-primary p-2">
                <AntDesign name="user" size={32} color={'green'} />
              </View>
              <View>
                <Text className="text-xl font-semibold text-primary">{`${user.firstName} ${user.lastName}`}</Text>
                <Text>{t('ChangeInfo')}</Text>
              </View>
            </View>
          </Pressable>

          <View className="my-2 flex flex-col gap-4 rounded-lg bg-background p-4">
            <Pressable
              onPress={() => router.push('/me/account/library-card' as Href)}
              className="flex w-full flex-row justify-between gap-4"
            >
              <View className="flex flex-row items-center gap-2">
                <IdCard color={'green'} />
                <Text className="text-lg">{tMe('library card')}</Text>
              </View>
              <ChevronRight color={'green'} />
            </Pressable>
            <Pressable
              onPress={() => router.push('/me/account/borrow' as Href)}
              className="flex w-full flex-row justify-between gap-4"
            >
              <View className="flex flex-row items-center gap-2">
                <IdCard color={'green'} />
                <Text className="text-lg">{tMe('borrow')}</Text>
              </View>
              <ChevronRight color={'green'} />
            </Pressable>
            <Pressable
              onPress={() => router.push('/')}
              className="flex w-full flex-row justify-between gap-4"
            >
              <View className="flex flex-row items-center gap-2">
                <IdCard color={'green'} />
                <Text className="text-lg">{tMe('reservation')}</Text>
              </View>
              <ChevronRight color={'green'} />
            </Pressable>
            <Pressable
              onPress={() => router.push('/')}
              className="flex w-full flex-row justify-between gap-4"
            >
              <View className="flex flex-row items-center gap-2">
                <MapPinHouse color={'green'} />
                <Text className="text-lg">{tMe('transaction')}</Text>
              </View>
              <ChevronRight color={'green'} />
            </Pressable>
          </View>

          <View className="my-2 flex flex-col gap-4 rounded-lg bg-background p-4">
            {/* Management */}

            {user?.role?.roleType === ERoleType.EMPLOYEE && (
              <Pressable
                onPress={() => router.push('/management-tools')}
                className="flex w-full flex-row justify-between gap-4"
              >
                <View className="flex flex-row items-center gap-2">
                  <Management color={'green'} />
                  <Text className="text-lg ">{t('Management tools')}</Text>
                </View>
                <ChevronRight color={'green'} />
              </Pressable>
            )}
            {/* Setting */}
            <View className="flex w-full flex-row justify-between gap-4">
              <View className="flex flex-row items-center gap-2">
                <Settings color={'green'} />
                <Text className="text-lg ">{t('Setting')}</Text>
              </View>
              <ChevronRight color={'green'} />
            </View>

            {/* My QR code */}
            <View className="flex w-full flex-row justify-between gap-4">
              <View className="flex flex-row items-center gap-2">
                <QrCode color={'green'} />
                <Text className="text-lg">{t('MyQR')}</Text>
              </View>
              <ChevronRight color={'green'} />
            </View>
          </View>

          <View className="my-2 flex flex-col gap-4 rounded-lg bg-background p-4">
            {/* Policy */}
            <View className="flex w-full flex-row justify-between gap-4">
              <View className="flex flex-row items-center gap-2">
                <NotepadText color={'green'} />
                <Text className="text-lg">{t('Policy')}</Text>
              </View>
              <ChevronRight color={'green'} />
            </View>
            {/* Question */}
            <View className="flex w-full flex-row justify-between gap-4">
              <View className="flex flex-row items-center gap-2">
                <FileQuestion color={'green'} />
                <Text className="text-lg">{t('Question')}</Text>
              </View>
              <ChevronRight color={'green'} />
            </View>
            {/* Contact */}
            <View className="flex w-full flex-row justify-between gap-4">
              <View className="flex flex-row items-center gap-2">
                <Phone color={'green'} />
                <Text className="text-lg">{t('Contact')}</Text>
              </View>
              <ChevronRight color={'green'} />
            </View>
          </View>
          <Button onPress={signOut} className="flex flex-row items-center gap-4">
            <Text className="text-3xl">{t('Logout')}</Text>
            <LogOut color={'white'} size={20} />
          </Button>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
