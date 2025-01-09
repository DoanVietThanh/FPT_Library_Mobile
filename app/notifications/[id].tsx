import React from 'react'
import { Pressable, useWindowDimensions, View } from 'react-native'
import NotificationTypeBadge from '~/components/ui/notification-type-badge'
import { Text } from '~/components/ui/text'
import useNotification from '~/hooks/notifications/use-notification'
import { ChevronLeft } from '~/lib/icons/chevron-left'
import { Loader } from '~/lib/icons/loader'
import { ENotificationType } from '~/types/enum'
import { format } from 'date-fns'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler'
import RenderHtml from 'react-native-render-html'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function NotificationDetail() {
  const router = useRouter()
  const { id } = useLocalSearchParams()
  const { isLoading, data } = useNotification(+id)

  const { width } = useWindowDimensions()

  if (!isLoading && !data) {
    router.push('/notifications')
    return
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <SafeAreaView className="flex flex-1 flex-col px-4 pb-8">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Pressable className="mb-4" onPress={() => router.back()} style={{ padding: 10 }}>
            <ChevronLeft size={24} className="text-foreground" />
          </Pressable>

          {isLoading ? (
            <View className="flex flex-row justify-center">
              <Loader className="size-9 animate-spin" />
            </View>
          ) : (
            <View className="flex flex-col ">
              <Text className="text-lg font-bold">{data?.title}</Text>
              <View className="mt-1 flex flex-row flex-wrap justify-between gap-x-4 gap-y-2">
                <NotificationTypeBadge type={data?.notificationType || ENotificationType.NOTICE} />
                <Text className="mt-1 text-xs text-muted-foreground">
                  {data?.createDate && format(new Date(data.createDate), 'MMM d, yyyy h:mm a')}
                </Text>
              </View>
              <RenderHtml contentWidth={width} source={{ html: data?.message || '' }} />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
