import { View } from 'react-native'
import { Text } from '~/components/ui/text'
import { Stack } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  const { t } = useTranslation('SearchScreen')
  return (
    <>
      <Stack.Screen options={{ title: t('Title') }} />
      <SafeAreaView className="m-0 flex-1 p-0" edges={['left', 'right', 'bottom']}>
        <View className="min-h-screen-safe flex flex-col gap-y-6 bg-secondary p-6">
          <View className="flex w-full flex-row items-center justify-start gap-4 rounded-lg bg-primary-foreground p-4">
            <Text>{t('Title')}</Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}
