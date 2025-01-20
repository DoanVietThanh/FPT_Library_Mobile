import React, { useState } from 'react'
import { Image, Pressable, View } from 'react-native'
import { dummyBooks } from '~/components/home/dummy-books'
import { Input } from '~/components/ui/input'
import { Text } from '~/components/ui/text'
import VoiceToText from '~/components/voice-to-text'
import { Href, Stack, useRouter } from 'expo-router'
import { Mic, Search, Star } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  const router = useRouter()
  const [openVoiceToText, setOpenVoiceToText] = useState<boolean>(false)
  const { t } = useTranslation('SearchScreen')

  return (
    <>
      <Stack.Screen options={{ title: t('Title') }} />
      <SafeAreaView className="m-0 flex-1 p-0" edges={['left', 'right', 'bottom']}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="min-h-screen-safe flex flex-col gap-y-6 bg-secondary p-6">
            <View className="flex w-full flex-row items-center gap-2">
              <View className="relative flex-1">
                <View className=" absolute left-4 top-1/2 z-10 flex size-5 -translate-y-1/2 items-center justify-center rounded-md px-1">
                  <Search size={20} color="black" />
                </View>
                <Input
                  placeholder={t('Search book')}
                  className="w-full rounded-lg bg-primary-foreground py-2 pl-12"
                />
              </View>
              <Mic size={24} color="black" onPress={() => setOpenVoiceToText(true)} />
            </View>

            <VoiceToText open={openVoiceToText} setOpen={setOpenVoiceToText} />

            <View className="flex w-full flex-row flex-wrap gap-4">
              {dummyBooks.map((item) => (
                <Pressable
                  onPress={() => router.push(`/home/books/${item.id}` as Href)}
                  key={item.id}
                  className="flex h-64 w-[30%] flex-col rounded-lg bg-primary-foreground p-2"
                >
                  <Image
                    source={{ uri: item.image }}
                    className="w-full flex-1 rounded-lg object-cover"
                  />
                  <Text className="line-clamp-1 text-lg font-semibold text-primary">
                    {item.title}
                  </Text>
                  <Text className="line-clamp-1 text-sm font-semibold italic">
                    by {item.author}
                  </Text>
                  <View className="flex flex-row items-center gap-1">
                    <Star size={14} color="orange" />
                    <Text className="text-sm">4.5 / 5</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
