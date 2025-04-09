import React from 'react'
import { Image, View } from 'react-native'
import fptLogo from '~/assets/images/fpt-logo.png'
import { HeaderDropdown } from '~/components/ui/header-dropdown'
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
          title: t('Home'),
          headerTitle: () => (
            <Image source={fptLogo} style={{ height: 32, width: 100 }} resizeMode="contain" />
          ),
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <View className="flex flex-row gap-2 pr-2">
              <ThemeToggle />
              <HeaderDropdown />
            </View>
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
        name="map"
        options={{
          title: t('Map'),
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: t('More'),
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
