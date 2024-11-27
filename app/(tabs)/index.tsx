import { View } from 'react-native'
import { ScreenContent } from '~/components/ScreenContent'
import { Text } from '~/components/ui/text'
import { Stack } from 'expo-router'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()
  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <View className="flex-1 border-2 border-purple-500 bg-blue-500 p-6">
        <Text>{t('Welcome to React')}</Text>
        <ScreenContent path="app/(tabs)/index.tsx" title="Tab One" />
      </View>
    </>
  )
}
