import React from 'react'
import { Image, Text, View } from 'react-native'
import { Card, CardContent } from '~/components/ui/card'
import { quotes } from '~/constants/quotes'
import { DotIcon } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler'
import Swiper from 'react-native-swiper'

import { dummyBooks } from './dummy-books'

export default function HomeBanner() {
  const { t } = useTranslation('HomeScreen')

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

      {/* Welcome */}
      <Text className="text-center text-xl font-semibold text-primary">{t('welcome')}</Text>

      {/* Banner */}
      <View className="flex flex-row items-center overflow-hidden rounded-lg">
        <View className="flex min-h-[120px] flex-col items-center justify-center text-nowrap bg-primary ">
          <Text
            className="-rotate-90 font-semibold text-primary-foreground"
            // style={{ transform: [{ rotate: '-90deg ' }] }}
          >
            New Arrival
          </Text>
        </View>
        <ScrollView horizontal className="h-full w-full ">
          <View className="flex-1 flex-row gap-4 overflow-x-auto bg-primary-foreground p-2 px-4">
            {dummyBooks.map(({ id, image }) => (
              <View key={id} className="flex flex-col items-center justify-center gap-2">
                <Image source={{ uri: image }} className="h-24 w-16 rounded-lg object-cover" />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  )
}
