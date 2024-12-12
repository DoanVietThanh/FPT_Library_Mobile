import { View } from 'react-native'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { ThemeToggle } from '~/components/ui/theme-toggle'
import useSignOut from '~/hooks/mutations/auth/use-sign-out'
import { Tabs } from 'expo-router'

import { HeaderButton } from '../../components/HeaderButton'
import { TabBarIcon } from '../../components/TabBarIcon'

export default function TabLayout() {
  const { mutate: signOut } = useSignOut()
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,

          headerRight: () => (
            <View className="flex flex-row items-center gap-x-4">
              <ThemeToggle />
              <Button onPress={() => signOut()} variant="ghost" size="icon">
                <Text>Out</Text>
              </Button>
            </View>
          ),
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
