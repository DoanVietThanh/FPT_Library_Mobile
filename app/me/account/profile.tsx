import React from 'react'
import { Pressable, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Label } from '~/components/ui/label'
import NoData from '~/components/ui/no-data'
import { Separator } from '~/components/ui/separator'
import { Text } from '~/components/ui/text'
import { useAuth } from '~/contexts/auth-provider'
import { router, Stack } from 'expo-router'
import { ChevronLeft, Loader2, SquarePen } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  // const router = useRouter()
  const { t } = useTranslation('Me')

  const { user, isLoadingAuth } = useAuth()
  console.log('🚀 ~ Home ~ user:', user)

  if (isLoadingAuth) {
    return (
      <View className="flex items-center justify-center">
        <Loader2 />
      </View>
    )
  }

  if (!user) {
    return null
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: t('profile'),
          headerLeft: () => (
            <Pressable onPress={() => router.push('/more')} style={{ padding: 10 }}>
              <ChevronLeft size={24} />
            </Pressable>
          ),
        }}
      />

      <SafeAreaView className="m-0 flex-1 p-0" edges={['left', 'right', 'bottom']}>
        <View className="min-h-screen-safe flex flex-col gap-y-6 p-6">
          <View className="flex w-full items-center justify-start gap-2 rounded-lg bg-background p-4">
            <View className="flex items-center justify-center rounded-full border-2 border-primary p-2">
              <AntDesign name="user" size={32} className="text-primary" />
            </View>
            <Text className="text-xl font-semibold text-primary">{`${user?.firstName} ${user?.lastName}`}</Text>
          </View>

          <View className="flex flex-row justify-between">
            <Text className="text-xl font-semibold text-primary">{t('other info')}</Text>
            <SquarePen />
          </View>
          <View className="flex gap-4 rounded-lg bg-background p-4">
            <View>
              <Label className="font-semibold">{t('gender')}</Label>
              {user?.gender ? (
                <Text className="text-sm">{t(user?.gender?.toLocaleLowerCase())}</Text>
              ) : (
                <NoData />
              )}
            </View>
            <Separator />
            <View>
              <Label className="font-semibold">{t('phoneNumber')}</Label>
              {user?.phone ? <Text className="text-sm">{user?.phone}</Text> : <NoData />}
            </View>
            <Separator />
            <View>
              <Label className="font-semibold">{t('email')}</Label>
              {user?.email ? <Text className="text-sm">{user?.email}</Text> : <NoData />}
            </View>
            <Separator />
            <View>
              <Label className="font-semibold">{t('address')}</Label>
              {user?.address ? <Text className="text-sm">{user?.address}</Text> : <NoData />}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}
