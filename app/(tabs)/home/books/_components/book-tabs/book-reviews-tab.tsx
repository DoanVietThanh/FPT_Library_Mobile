import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import useGetReviewsLibraryItem from '~/hooks/library-items/use-get-reviews-libraryItem'
import { Loader, Star } from 'lucide-react-native'

type Props = {
  libraryItemId: string
}

const BookReviewsTab = ({ libraryItemId }: Props) => {
  const { data: reviews, isLoading } = useGetReviewsLibraryItem(libraryItemId, {
    search: '',
    pageIndex: 1,
    pageSize: '5',
  })

  if (isLoading) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <Loader className="size-9 animate-spin" />
      </View>
    )
  }

  if (!reviews || reviews.sources.length === 0) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <Text>No Reviews found</Text>
      </View>
    )
  }

  return (
    <View>
      <ScrollView>
        {reviews.sources.map((item, index) => (
          <View key={index} className="flex flex-col gap-2 border-b border-card pb-4">
            <View className="flex flex-row gap-3">
              <Image
                source={{ uri: item.user.avatar || 'https://via.placeholder.com/40' }}
                className="h-10 w-10 rounded-full bg-card"
              />

              <View className="flex-1">
                <View className="flex flex-row items-center justify-between">
                  <Text className="font-semibold">
                    {`${item.user.lastName} ${item.user.firstName}`}
                  </Text>
                  <Text className="text-xs">
                    {item.createDate && new Date(item.createDate).toDateString()}
                  </Text>
                </View>

                <Text className="flex flex-row items-center gap-4">
                  <Star size={12} color="orange" fill={'orange'} />
                  <Text>{item.ratingValue} / 5</Text>
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default BookReviewsTab
