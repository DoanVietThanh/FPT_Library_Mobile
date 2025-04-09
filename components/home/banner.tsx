import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { Card, CardContent } from '~/components/ui/card'
import { quotes } from '~/constants/quotes'
import useGetNewArrivals from '~/hooks/library-items/use-get-new-arrivals'
import { LibraryItem } from '~/types/models'
import { useRouter } from 'expo-router'
import { DotIcon, Loader } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler'
import Swiper from 'react-native-swiper'

export default function HomeBanner() {
  const { t } = useTranslation('HomeScreen')
  const router = useRouter()
  const { data: libraryItems, isLoading } = useGetNewArrivals()

  if (isLoading || !libraryItems) {
    return (
      <View className="flex flex-row justify-center">
        <Loader className="size-9 animate-spin" />
      </View>
    )
  }

  return (
    <View className="flex flex-col gap-y-4">
      {/* Swiper */}
      <View className="h-[180px]">
        <Swiper
          autoplay
          renderPagination={(index, total) => (
            <View className="absolute bottom-4 left-8 flex flex-row gap-1">
              {Array.from({ length: total }).map((_, i) => (
                <DotIcon
                  key={i}
                  size={24}
                  color={i === index ? 'white' : 'gray'}
                  style={{ marginHorizontal: -8 }}
                />
              ))}
            </View>
          )}
        >
          {quotes.map(({ id, quote, author }) => (
            <View key={id}>
              <Card className="h-full bg-primary">
                <CardContent className="flex h-full flex-col justify-between p-4">
                  <Text className="mb-2 px-4 text-left font-serif text-lg font-semibold text-accent">
                    Today&apos;s quote
                  </Text>
                  <Text className="mb-2 px-4 text-center font-serif text-lg font-semibold text-accent">
                    {`"${quote}"`}
                  </Text>
                  <Text className="text-right text-sm font-medium italic text-accent">
                    - {author} -
                  </Text>
                </CardContent>
              </Card>
            </View>
          ))}
        </Swiper>
      </View>

      <Text className="text-center text-xl font-semibold text-primary">{t('welcome')}</Text>

      <View className="flex flex-row items-center overflow-hidden rounded-lg">
        <View className="flex min-h-[120px] flex-col items-center justify-center text-nowrap bg-primary ">
          <Text className="-rotate-90 font-semibold text-primary-foreground">New Arrival</Text>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          className="h-full w-full"
          bounces={false}
          overScrollMode="never"
        >
          <View className="flex-1 flex-row gap-4 overflow-x-auto bg-background p-2 px-4">
            {libraryItems.map((item: LibraryItem) => (
              <Pressable
                onPress={() => router.push(`/home/books/${item.libraryItemId}`)}
                key={item.libraryItemId}
                className="flex flex-col items-center justify-center gap-2"
              >
                <Image
                  source={{ uri: item.coverImage as string }}
                  className="h-24 w-16 rounded-lg object-cover"
                />
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  )
}
