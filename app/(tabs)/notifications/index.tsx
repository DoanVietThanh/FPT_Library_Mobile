import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Badge } from '~/components/ui/badge'
import { Text } from '~/components/ui/text'
import { useNotifications } from '~/contexts/notifications-provider'
import useInfiniteNotifications from '~/hooks/notifications/use-infinite-notifications'
import { getTypeColor } from '~/lib/constants'
import { Loader } from '~/lib/icons/loader'
import {
  offReceiveNotification,
  onReceiveNotification,
  SocketNotification,
} from '~/lib/signalR/receive-notification-signalR'
import { cn } from '~/lib/utils'
import { Notification } from '~/types/models'
import { format } from 'date-fns'
import { Link, Stack, useFocusEffect } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Notifications() {
  const { t } = useTranslation('NotificationsScreen')
  const { t: tNotificationType } = useTranslation('NotificationType')

  const { handleInNotificationsScreen, connection } = useNotifications()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteNotifications()

  const [newNotifications, setNewNotifications] = useState<Notification[]>([])

  const notifications = data?.pages.flat() ?? []

  useFocusEffect(
    useCallback(() => {
      handleInNotificationsScreen()
    }, []),
  )

  useEffect(() => {
    if (!connection) return

    const callback = (notification: SocketNotification) => {
      setNewNotifications((prev) => [
        {
          createDate: new Date(notification.timestamp),
          createdBy: '',
          isPublic: false,
          message: notification.message,
          notificationId: notification.notificationId,
          notificationRecipients: [],
          title: notification.title,
          notificationType: notification.notificationType,
        },
        ...prev,
      ])
    }

    onReceiveNotification(connection, callback)

    return () => {
      offReceiveNotification(connection, callback)
    }
  }, [connection])
  return (
    <>
      <Stack.Screen options={{ title: t('Title') }} />
      <SafeAreaView className="flex-1 px-4 pb-8">
        <FlatList
          data={[...newNotifications, ...notifications]}
          renderItem={(notification) => (
            <Link
              href={`/notifications/${notification.item.notificationId}`}
              key={notification.item.notificationId}
              className="flex flex-col items-start p-2"
            >
              <View className="flex w-full flex-row items-start justify-between">
                <Text className="line-clamp-2 font-semibold">{notification.item.title}</Text>
                <Badge
                  className={cn(
                    `rounded-md text-xs ${getTypeColor(notification.item.notificationType)}`,
                  )}
                >
                  <Text>{tNotificationType(notification.item.notificationType)}</Text>
                </Badge>
              </View>
              <Text className="line-clamp-3 text-sm text-card-foreground">
                {notification.item.message}
              </Text>
              <Text className="mt-1 text-xs text-muted-foreground">
                {format(new Date(notification.item.createDate), 'MMM d, yyyy h:mm a')}
              </Text>
            </Link>
          )}
          ListHeaderComponent={() => (
            <>
              {status === 'pending' ? (
                <View>
                  <Loader className="mr-2 animate-spin" />
                  <Text>Loading notifications...</Text>
                </View>
              ) : status === 'error' ? (
                <Text>Error loading notifications</Text>
              ) : notifications.length === 0 ? (
                <Text>No notifications</Text>
              ) : null}
            </>
          )}
          ListFooterComponent={() => (
            <>
              {status === 'success' &&
                (hasNextPage ? (
                  <View className="text-center">
                    {isFetchingNextPage ? (
                      <Loader className="mx-auto animate-spin" />
                    ) : (
                      <Text>Load more</Text>
                    )}
                  </View>
                ) : (
                  <View className="mt-4 text-center">
                    <Text>That is all your notifications</Text>
                  </View>
                ))}
            </>
          )}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage()
            }
          }}
        />
      </SafeAreaView>
    </>
  )
}
