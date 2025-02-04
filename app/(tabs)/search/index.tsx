import React from 'react'
import { View } from 'react-native'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { Href, Stack, useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SearchBook() {
  const { t } = useTranslation('SearchScreen')
  const router = useRouter()

  return (
    <>
      <Stack.Screen options={{ title: t('Title') }} />
      <SafeAreaView className="m-0 flex-1 p-0" edges={['left', 'right', 'bottom']}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="min-h-screen-safe flex flex-col gap-6 bg-secondary p-6">
            <Button
              onPress={() => {
                router.push('/search/search-page' as Href)
              }}
            >
              <Text>Search page</Text>
            </Button>
            <Button
              onPress={() => {
                router.push('/search/ai-prediction' as Href)
              }}
            >
              <Text>Ai prediction</Text>
            </Button>
            <Button
              onPress={() => {
                router.push('/search/ai-recommendation' as Href)
              }}
            >
              <Text>Ai recommendation</Text>
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
