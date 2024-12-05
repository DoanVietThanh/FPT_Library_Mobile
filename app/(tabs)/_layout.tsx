import { ThemeToggle } from '~/components/ui/theme-toggle'
import { Tabs } from 'expo-router'

import { HeaderButton } from '../../components/HeaderButton'
import { TabBarIcon } from '../../components/TabBarIcon'

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,

          headerRight: () => <ThemeToggle />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => <HeaderButton />,
        }}
      />
    </Tabs>
  )
}
