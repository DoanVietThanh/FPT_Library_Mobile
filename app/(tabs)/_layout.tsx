import React from 'react'
import { Image } from 'react-native'
import fptLogo from '~/assets/images/fpt-logo.png'
import SignOutButton from '~/components/sign-out-button'
import { NotificationBell } from '~/components/ui/notifications-bell'
import { ThemeToggle } from '~/components/ui/theme-toggle'
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
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <>
              <ThemeToggle />
              <SignOutButton />
            </>
          ),
        }}
      />

      {/* QR Code tab */}
      <Tabs.Screen
        name="qr-code"
        options={{
          title: t('QR'),
          tabBarIcon: ({ color }) => <TabBarIcon name="qrcode" color={color} />,
          headerRight: () => <ThemeToggle />,
        }}
      />

      {/* Các tab còn lại */}
      <Tabs.Screen
        name="search"
        options={{
          title: t('Search'),
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Tabs.Screen
        name="notifications/index"
        options={{
          title: t('Notifications'),
          tabBarIcon: ({ color }) => <NotificationBell color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifications/[id]"
        options={{
          title: t('Notifications'),
          tabBarIcon: ({ color }) => <NotificationBell color={color} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          headerTitle: () => (
            <Image source={fptLogo} style={{ height: 32, width: 100 }} resizeMode="contain" />
          ),
          tabBarIcon: ({ color }) => <TabBarIcon name="ellipsis-h" color={color} />,
          headerRight: () => <ThemeToggle />,
        }}
      />
    </Tabs>
  )
}
