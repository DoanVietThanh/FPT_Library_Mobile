import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { Href, useRouter } from 'expo-router'
import { Star } from 'lucide-react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { dummyBooks } from './dummy-books'

type Props = {
  title: string
  totalBooks: number
}

const HomeBookList = ({ title, totalBooks }: Props) => {
  const router = useRouter()

  return (
    <View className="flex w-full items-center justify-start gap-4 rounded-lg bg-primary-foreground p-4">
      <View className="flex w-full flex-row justify-between">
        <Text className="font-semibold text-primary">
          {title} ({totalBooks})
        </Text>
        <Text className="text-sm font-semibold underline">Show all</Text>
      </View>

      <ScrollView horizontal>
        <View className="flex flex-row gap-4">
          {dummyBooks.map((item) => (
            <Pressable onPress={() => router.push(`/home/books/${item.id}` as Href)} key={item.id}>
              <View key={item.id} className="flex h-80 w-40 flex-col">
                <Image
                  source={{ uri: item.image }}
                  className="w-full flex-1 rounded-lg object-cover"
                />
                <Text className="line-clamp-1 text-lg font-semibold text-primary">
                  {item.title}
                </Text>
                <Text className="line-clamp-1 text-sm font-semibold italic">by {item.author}</Text>
                <View className="flex flex-row items-center gap-1">
                  <Star size={16} color={'orange'} fill={'orange'} />
                  <Text>4.5 / 5</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeBookList
