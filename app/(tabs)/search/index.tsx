import React from 'react'
import { View } from 'react-native'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { Href, Stack, useRouter } from 'expo-router'
import { Search } from 'lucide-react-native'
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false} overScrollMode="never">
          <View className="flex flex-1 flex-col gap-6 p-6">
            <Button
              variant={'outline'}
              className="flex w-full flex-row items-center justify-start gap-2"
              onPress={() => {
                router.push('/search/search-page' as Href)
              }}
            >
              <Search size={16} color={'gray'} />
              <Text>Search page</Text>
            </Button>
            <Button
              variant={'outline'}
              className="flex w-full flex-row items-center justify-start gap-2"
              onPress={() => {
                router.push('/search/ai-prediction' as Href)
              }}
            >
              <Search size={16} color={'gray'} />
              <Text>Ai prediction</Text>
            </Button>
            <Button
              variant={'outline'}
              className="flex w-full flex-row items-center justify-start gap-2"
              onPress={() => {
                router.push('/search/ai-recommendation' as Href)
              }}
            >
              <Search size={16} color={'gray'} />
              <Text>Ai recommendation</Text>
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
