import { Text } from '~/components/ui/text'
import { ThemeToggle } from '~/components/ui/theme-toggle'
import { Tabs } from 'expo-router'

import { HeaderButton } from '../../components/HeaderButton'
import { TabBarIcon } from '../../components/TabBarIcon'

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerTitle(props) {
            return <Text className="text-xl font-semibold">{toOptions(props.children)}</Text>
          },
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

function toOptions(name: string) {
  const title = name
    .split('-')
    .map(function (str: string) {
      return str.replace(/\b\w/g, function (char) {
        return char.toUpperCase()
      })
    })
    .join(' ')
  return title
}
