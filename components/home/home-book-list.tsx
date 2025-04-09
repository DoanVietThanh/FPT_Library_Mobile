import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import useGetLibraryItemByCategory from '~/hooks/library-items/use-get-libraryItem-by-category'
import { Href, useRouter } from 'expo-router'
import { Loader, Star } from 'lucide-react-native'
import { ScrollView } from 'react-native-gesture-handler'

type Props = {
  categoryId: number
  title: string
}

const HomeBookList = ({ title, categoryId }: Props) => {
  const router = useRouter()

  const { data: libraryItems, isLoading } = useGetLibraryItemByCategory(categoryId, {
    search: '',
    pageIndex: 1,
    pageSize: '50',
  })

  if (isLoading || !libraryItems) {
    return (
      <View className="flex flex-row justify-center">
        <Loader className="size-9 animate-spin" />
      </View>
    )
  }

  if (!libraryItems || libraryItems.sources.length === 0) return null

  return (
    <View className="flex w-full items-center justify-start gap-4 rounded-lg bg-background p-4">
      <View className="flex w-full flex-row justify-between">
        <Text className="font-semibold text-primary">{title}</Text>
      </View>

      <ScrollView showsHorizontalScrollIndicator={false} horizontal className="w-full">
        <View className="flex w-full flex-row items-start justify-start gap-4">
          {libraryItems.sources.map((item) => (
            <Pressable
              key={item.libraryItemId}
              onPress={() => router.push(`/home/books/${item.libraryItemId}` as Href)}
            >
              <View key={item.libraryItemId} className="flex h-80 w-40 flex-col">
                <Image
                  source={{ uri: item.coverImage || '' }}
                  className="w-full flex-1 rounded-lg object-cover"
                />
                <Text className="line-clamp-1 text-lg font-semibold text-primary">
                  {item.title}
                </Text>
                <Text className="line-clamp-1 flex flex-row items-center text-sm font-semibold italic">
                  by {item.authors.map((a) => a.fullName).join(', ')}
                </Text>
                <Text className="text-sm">{item.pageCount} pages</Text>
                <View className="flex flex-row items-center gap-1">
                  <Star size={16} color={'orange'} fill={'orange'} />
                  <Text>{item.avgReviewedRate || 5} / 5</Text>
                </View>
                <Text className="text-xs">{item.publisher}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeBookList
