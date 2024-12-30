'use client'

import React from 'react'
import { View } from 'react-native'
import { useNotifications } from '~/contexts/notifications-provider'
import { Bell } from '~/lib/icons/bell'

import { Badge } from './badge'
import { Text } from './text'

type Props = {
  color?: string
}

export function NotificationBell({ color }: Props) {
  const { unreadAmount } = useNotifications()

  return (
    <>
      <View className="relative">
        <Bell color={color} />
        {unreadAmount > 0 && (
          <Badge
            variant="destructive"
            className="0 absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-md px-1"
          >
            <Text>{unreadAmount >= 10 ? '9+' : unreadAmount}</Text>
          </Badge>
        )}
      </View>
    </>
  )
}
