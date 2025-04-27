import React from 'react'
import HeaderRight from '~/components/ui/header-right'
import HeaderTitle from '~/components/ui/header-title'
import { NotificationBell } from '~/components/ui/notifications-bell'
import { Tabs } from 'expo-router'
import { useTranslation } from 'react-i18next'

import { TabBarIcon } from '../../components/TabBarIcon'

export default function TabLayout() {
  const { t } = useTranslation('TabLayout')

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: t('More'),
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: 'transparent',
          },
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      {/* QR Code tab */}
      <Tabs.Screen
        name="qr-code"
        options={{
          title: t('QR'),
          headerRight: () => <HeaderRight />,
          tabBarIcon: ({ color }) => <TabBarIcon name="qrcode" color={color} />,
        }}
      />

      {/* Các tab còn lại */}
      <Tabs.Screen
        name="search"
        options={{
          title: t('Search'),
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifications/index"
        options={{
          title: t('Notifications'),
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
          tabBarIcon: ({ color }) => <NotificationBell color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifications/[id]"
        options={{
          title: t('Notifications'),
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
          tabBarIcon: ({ color }) => <NotificationBell color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: t('Map'),
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: t('More'),
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: 'transparent',
          },
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
          tabBarIcon: ({ color }) => <TabBarIcon name="ellipsis-h" color={color} />,
        }}
      />
    </Tabs>
  )
}
